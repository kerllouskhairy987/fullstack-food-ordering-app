import { ITranslations } from "@/types/translations";
import * as z from "zod";

export const loginSchema = (translations: ITranslations) => {
    return z.object({
        email: z.string().trim().email({
            message: translations.validation.validEmail
        }),

        password: z.string().trim().regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/, {
            message: translations.validation.validPassword
        })
    });
};

export const signUpSchema = (translations: ITranslations) => {
    return z.object({
        name: z.string().trim().min(1, {
            message: translations.validation.nameRequired
        }),

        email: z.string().trim().email({
            message: translations.validation.validEmail
        }),

        password: z.string().trim().regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/, {
            message: translations.validation.validPassword
        }),

        confirmPassword: z.string().trim().regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/, {
            message: translations.validation.validPassword
        })
    }).refine((data) => data.password === data.confirmPassword, {
        message: translations.validation.passwordMismatch,
        path: ["confirmPassword"]
    });
};

export type validationErrors =
    | {
        [key: string]: string[];
    }
    | undefined;