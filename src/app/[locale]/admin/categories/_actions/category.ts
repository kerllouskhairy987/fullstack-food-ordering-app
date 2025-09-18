"use server"

import { Pages, Routes } from "@/constants/enums";
import { getCurrentLocale } from "@/lib/getCurrentLocale";
import { db } from "@/lib/prisma";
import getTrans from "@/lib/translation";
import { addCategorySchema, updateCategorySchema } from "@/validations/category";
import { revalidatePath } from "next/cache";

// ------------------------------------------Add Category
export const addCategory = async (prevState: unknown, formData: FormData) => {
    const locale = await getCurrentLocale();
    const translations = await getTrans(locale);
    // Validations
    const result = addCategorySchema(translations).safeParse(
        Object.fromEntries(formData.entries())
    )

    if (result.success === false) {
        return {
            error: result.error.flatten()?.fieldErrors,
            status: 400
        }
    }
    const data = result.data;

    try {
        await db.category.create({
            data,
        })
        // Revalidate the cache
        revalidatePath(`/${locale}/${Routes.ADMIN}/${Pages.CATEGORIES}`)
        revalidatePath(`/${locale}/${Routes.MENU}`)

        return {
            status: 201,
            message: translations.messages.categoryAdded
        }
    } catch (error) {
        console.log(error)
        return {
            status: 500,
            message: translations.messages.unexpectedError
        }
    }

}

// ------------------------------------------Update Category
export const updateCategory = async (id: string, prevState: unknown, formData: FormData) => {
    const locale = await getCurrentLocale();
    const translations = await getTrans(locale);
    // Validations
    const result = updateCategorySchema(translations).safeParse(
        Object.fromEntries(formData.entries())
    )

    if (result.success === false) {
        return {
            error: result.error.flatten()?.fieldErrors,
            status: 400
        }
    }
    const data = result.data;

    try {
        await db.category.update({
            where: {
                id: id
            },
            data: {
                name: data.categoryName
            }
        })
        // Revalidate the cache
        revalidatePath(`/${locale}/${Routes.ADMIN}/${Pages.CATEGORIES}`)
        revalidatePath(`/${locale}/${Routes.MENU}`)

        return {
            status: 200,
            message: translations.messages.updatecategorySucess
        }
    } catch (error) {
        console.log(error)
        return {
            status: 500,
            message: translations.messages.unexpectedError
        }
    }
}

// -----------------------------------------------Delete Category
export const deleteCategory = async (id: string) => {
    const locale = await getCurrentLocale();
    const translations = await getTrans(locale);

    try {
        await db.category.delete({
            where: {
                id: id,
            }
        })
        // Revalidate the cache
        revalidatePath(`/${locale}/${Routes.ADMIN}/${Pages.CATEGORIES}`)
        revalidatePath(`/${locale}/${Routes.MENU}`)

        return {
            status: 200,
            message: translations.messages.deleteCategorySucess
        }
    } catch (error) {
        console.log(error)
        return {
            status: 500,
            message: translations.messages.unexpectedError
        }
    }
}