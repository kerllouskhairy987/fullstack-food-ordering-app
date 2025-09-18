"use server";

import { Pages, Routes } from "@/constants/enums";
import { getCurrentLocale } from "@/lib/getCurrentLocale";
import { db } from "@/lib/prisma";
import getTrans from "@/lib/translation";
import { addProductSchema, updateProductSchema } from "@/validations/product";
import { revalidatePath } from "next/cache";
import { Extra, ExtraIngredients, ProductSizes, Size } from "../../../../../../generated/prisma";

export const addProduct = async (
    args: {
        categoryId: string,
        options: {
            sizes: Partial<Size>[],
            extras: Partial<Extra>[]
        }
    },
    prevState: unknown,
    formData: FormData
) => {
    const locale = await getCurrentLocale();
    const translations = await getTrans(locale);
    const result = addProductSchema(translations).safeParse(
        Object.fromEntries(formData.entries())
    )

    if (result.success === false) {
        return {
            error: result.error.flatten()?.fieldErrors,
            status: 400,
            formData
        }
    };

    const data = result.data;
    const basePrice = Number(data.basePrice);
    const imageFile = data.image as File;
    const imageUrl = Boolean(imageFile.size) ? await getImageUrl(imageFile) : undefined;

    try {
        if (imageUrl) {
            await db.product.create({
                data: {
                    ...data,
                    image: imageUrl,
                    basePrice,
                    categoryId: args.categoryId,

                    sizes: {
                        createMany: {
                            data: args.options.sizes.map((size) => ({
                                name: size.name as ProductSizes,
                                price: Number(size.price)
                            }))
                        }
                    },

                    extras: {
                        createMany: {
                            data: args.options.extras.map((extra) => ({
                                name: extra.name as ExtraIngredients,
                                price: Number(extra.price),
                            }))
                        }
                    }
                }
            });

            revalidatePath(`/${locale}`)
            revalidatePath(`/${locale}/${Routes.ADMIN}`)
            revalidatePath(`/${locale}/${Routes.MENU}`)
            revalidatePath(`/${locale}/${Routes.ADMIN}/${Pages.MENU_ITEMS}`)

            return {
                status: 201,
                message: translations.messages.productAdded
            }
        }
        return {}
    } catch (error) {
        console.log(error)
        return {
            message: translations.messages.unexpectedError,
            status: 500
        }
    }
}

export const updateProduct = async (
    args: {
        productId: string
        options: {
            sizes: Partial<Size>[],
            extras: Partial<Extra>[]
        }
    },
    prevState: unknown,
    formData: FormData
) => {
    const locale = await getCurrentLocale();
    const translations = await getTrans(locale);
    const result = updateProductSchema(translations).safeParse(
        Object.fromEntries(formData.entries())
    )

    if (result.success === false) {
        return {
            error: result.error.flatten()?.fieldErrors,
            status: 400,
            formData
        }
    };

    const product = await db.product.findUnique({
        where: {
            id: args.productId
        }
    })

    const data = result.data;
    const basePrice = Number(data.basePrice);
    const imageFile = data.image as File;
    const imageUrl = Boolean(imageFile.size) ? await getImageUrl(imageFile) : product?.image;
    console.log('image url', imageUrl)

    if (!product) {
        return {
            message: translations.messages.unexpectedError,
            status: 400
        }
    }

    try {
        if (imageUrl) {
            const updatedProduct = await db.product.update({
                where: {
                    id: args.productId,
                },
                data: {
                    ...data,
                    basePrice,
                    image: imageUrl ?? product.image,
                },
            });


            // Delete All Sizes And Create New
            await db.size.deleteMany({
                where: { productId: args.productId },
            });
            await db.size.createMany({
                data: args.options.sizes.map((size) => ({
                    productId: args.productId,
                    name: size.name as ProductSizes,
                    price: Number(size.price),
                })),
            });

            // Delete All Extras And Create New
            await db.extra.deleteMany({
                where: { productId: args.productId },
            });

            await db.extra.createMany({
                data: args.options.extras.map((extra) => ({
                    productId: args.productId,
                    name: extra.name as ExtraIngredients,
                    price: Number(extra.price),
                })),
            });

            revalidatePath(`/${locale}`)
            revalidatePath(`/${locale}/${Routes.MENU}`)
            revalidatePath(`/${locale}/${Routes.ADMIN}/${Pages.MENU_ITEMS}`)
            revalidatePath(`/${locale}/${Routes.ADMIN}/${Pages.MENU_ITEMS}/${updatedProduct.id}/${Pages.EDIT}`)

            return {
                status: 200,
                message: translations.messages.updateProductSucess
            }
        }
        return {}
    } catch (error) {
        console.log(error)
        return {
            message: translations.messages.unexpectedError,
            status: 500
        }
    }
}

const getImageUrl = async (imageFile: File) => {
    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("pathName", "product_images");

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
        console.log(error)
    }
}


export const deleteProduct = async (id: string) => {
    const locale = await getCurrentLocale();
    const translations = await getTrans(locale);

    try {
        await db.product.delete({
            where: { id },
        });

        revalidatePath(`/${locale}`);
        revalidatePath(`/${locale}/${Routes.MENU}`);
        revalidatePath(`/${locale}/${Routes.ADMIN}/${Pages.MENU_ITEMS}`);
        revalidatePath(
            `/${locale}/${Routes.ADMIN}/${Pages.MENU_ITEMS}/${id}/${Pages.EDIT}`
        );

        return {
            status: 200,
            message: translations.messages.deleteProductSucess,
        };
    } catch (error) {
        console.error(error);
        return {
            status: 500,
            message: translations.messages.unexpectedError,
        };
    }
};