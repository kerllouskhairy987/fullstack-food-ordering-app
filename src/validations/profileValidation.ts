import { ITranslations } from "@/types/translations";
import z from "zod";

export const updateProfileSchema = (translation: ITranslations) => {
    return z.object({
        name: z.string().trim().min(1, {
            message: translation.validation.nameRequired
        }),
        email: z.string().trim().email({
            message: translation.validation.validEmail
        }),
        phone: z.string().trim().optional().refine((value) => {
            if(!value) return true;
            return /^\+?[0-9]{10,15}$/.test(value);
        }, {
            message: translation.validation.inValidPhoneNumber
        }),

        streetAddress: z.string().trim().optional(),
        postalCode: z.string().trim().optional().refine((value) => {
            if(!value) return true;
            return /^\d{5,10}$/.test(value);
        }
        , {
            message: translation.validation.inValidPostalCode
        }),

        city: z.string().trim().optional(),
        country: z.string().trim().optional(),

        image: z.custom((val) => val instanceof File).optional(),
    })
}