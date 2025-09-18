"use server";

import { Pages, Routes } from "@/constants/enums";
import { getCurrentLocale } from "@/lib/getCurrentLocale"
import { db } from "@/lib/prisma";
import getTrans from "@/lib/translation";
import { updateProfileSchema } from "@/validations/profileValidation";
import { revalidatePath } from "next/cache";
import { UserRole } from "../../../../generated/prisma";

export const updateProfile = async (isAdmin: boolean, prevState: unknown, formData: FormData) => {
    const locale = await getCurrentLocale();
    const translation = await getTrans(locale);
    // Validations
    const result = updateProfileSchema(translation).safeParse(
        Object.fromEntries(formData.entries())
    )

    if (result.success === false) {
        return {
            error: result.error.flatten()?.fieldErrors,
            formData,
        }
    }
    const data = result.data;
    const imageFile = data.image as File;
    const imageUrl = Boolean(imageFile.size) ? await getImageUrl(imageFile) : undefined;

    // Call DataBase
    try {
        const user = await db.user.findUnique({
            where: {
                email: data.email
            }
        });
        if (!user) {
            return {
                message: translation.messages.userNotFound,
                status: 401,
                formData,
            }
        }
        await db.user.update({
            where: {
                email: data.email
            },
            data: {
                ...data,
                image: imageUrl ?? user.image,
                role: isAdmin ? UserRole.ADMIN : UserRole.USER
            }
        })
        // revalidate cash 
        revalidatePath(`/${locale}/${Routes.PROFILE}`)
        revalidatePath(`/${locale}/${Routes.ADMIN}`)
        revalidatePath(`/${locale}/${Routes.ADMIN}/${Pages.USERS}`)
        revalidatePath(`/${locale}/${Routes.ADMIN}/${Pages.USERS}/${user.id}/${Pages.EDIT}`)

        // if update complete successfully
        return {
            status: 200,
            message: translation.messages.updateProfileSucess
        }
    } catch (error) {
        console.log(error)
        return {
            message: translation.messages.unexpectedError,
            status: 500
        }
    }
}

// create a file in lib folder with name (cloudinary.ts)
const getImageUrl = async (imageFile: File) => {
    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("pathName", "profile-images");

    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/upload`,
            {
                method: "POST",
                body: formData,
            }
        )
        const image = (await response.json()) as { url: string }
        return image.url
    } catch (error) {
        console.log("Error Upload File To Cloudinary", error);
    }
}