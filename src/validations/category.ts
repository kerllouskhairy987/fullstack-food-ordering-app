import { ITranslations } from "@/types/translations"
import z from "zod"

export const addCategorySchema = (translations: ITranslations) => {
    return z.object(
        {
            name: z.string().trim().min(1,
                { message: translations.validation.nameRequired }
            )
        }
    )
}

export const updateCategorySchema = (translations: ITranslations) => {
    return z.object(
        {
            categoryName: z.string().trim().min(1,
                { message: translations.validation.nameRequired }
            )
        }
    )
}