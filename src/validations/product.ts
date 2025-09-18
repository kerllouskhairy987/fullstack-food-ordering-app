import { ITranslations } from "@/types/translations";
import z from "zod";

const imageValidation = (translation: ITranslations, isRequired: boolean) => {
    return !isRequired
        ? z.custom((val) => val instanceof File)
        : z.custom(
            (val) => {
                if (typeof val !== "object" || !val) {
                    return false
                }
                // if uploaded file is not file يعني لو اللي رافعه مش فايل اصلا 
                if (!(val instanceof File)) {
                    return false
                }

                const validMineTypes = ["image/jpeg", "image/png", "image/gif"];
                return validMineTypes.includes(val.type);
            },
            {
                message: translation.validation.imageRequired
            }
        )
}

const getCommonValidation = (translation: ITranslations) => {
    return {
        name: z.string().trim().min(1, {
            message: translation.validation.nameRequired
        }),
        description: z.string().trim().min(1, {
            message: translation.validation.descriptionRequired
        }),
        basePrice: z.string().trim().min(1, {
            message: translation.validation.basePriceRequired
        }),
        categoryId: z.string().min(1, {
            message: translation.validation.categoryRequired
        }),
    }
}

export const addProductSchema = (translation: ITranslations) => {
    return z.object({
        ...getCommonValidation(translation),
        image: imageValidation(translation, true),
    })
}

export const updateProductSchema = (translation: ITranslations) => {
    return z.object({
        ...getCommonValidation(translation),
        image: imageValidation(translation, false),
    })
}