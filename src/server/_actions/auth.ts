"use server";

import { Pages, Routes } from "@/constants/enums";
import { Locale } from "@/i18n.config";
import { getCurrentLocale } from "@/lib/getCurrentLocale";
import { db } from "@/lib/prisma";
import getTrans from "@/lib/translation";
import { loginSchema, signUpSchema } from "@/validations/auth";
import bcrypt from "bcrypt";
import { revalidatePath } from "next/cache";

export const login = async (credentials: Record<"email" | "password", string> | undefined, locale: Locale) => {
    const translations = await getTrans(locale);
    const result = loginSchema(translations).safeParse(credentials);

    // credentials are not correct
    if (result.success === false) {
        return {
            // error: result.error?.formError.fieldErrors,
            error: result.error.flatten()?.fieldErrors,
            status: 400
        }
    }

    // credentials are correct
    try {
        const user = await db.user.findUnique({
            where: {
                email: result.data.email
            }
        });

        if (!user) {
            return { message: translations.messages.userNotFound, status: 401 }
        }

        const hashedPassword = user.password;
        const isValidPassword = await bcrypt.compare(
            result.data.password,
            hashedPassword
        )

        if (!isValidPassword) {
            return { message: translations.messages.incorrectPassword, status: 401 }
        }

        const { password, ...userWithoutPassword } = user;
        console.log(password)
        return { user: userWithoutPassword, message: translations.messages.loginSuccessful, status: 200 }

    } catch (error) {
        console.log(error)
        return { message: translations.messages.unexpectedError, status: 500 }
    }
}

export const signup = async (prevState: unknown, formData: FormData) => {
    const locale = await getCurrentLocale();
    const translations = await getTrans(locale);
    const result = signUpSchema(translations).safeParse(
        Object.fromEntries(formData.entries())
    );

    // credentials are not correct
    if (result.success === false) {
        return { error: result.error.flatten()?.fieldErrors, formData, status: 400 }
    }

    // credentials are correct
    try {
        const user = await db.user.findUnique({
            where: {
                email: result.data.email
            }
        });

        if (user) {
            return {
                message: translations.messages.userAlreadyExists,
                formData,
                status: 409
            }
        }

        const hashedPassword = await bcrypt.hash(result.data.password, 10);
        const createdUser = await db.user.create({
            data: {
                name: result.data.name,
                email: result.data.email,
                password: hashedPassword
            }
        })

        revalidatePath(`/${locale}/${Routes.ADMIN}/${Pages.USERS}`);
        revalidatePath(`/${locale}/${Routes.ADMIN}/${Pages.USERS}/${createdUser.id}/${Pages.EDIT}`);

        return {
            // user: createdUser,
            user: {
                id: createdUser.id,
                name: createdUser.name,
                email: createdUser.email
            },
            message: translations.messages.accountCreated,
            status: 201
        }

    } catch (error) {
        console.log(error)
        return { message: translations.messages.unexpectedError, status: 500 }
    }
}