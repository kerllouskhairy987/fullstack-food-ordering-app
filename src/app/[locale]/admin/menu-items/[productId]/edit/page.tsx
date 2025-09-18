import { Pages, Routes } from "@/constants/enums";
import { Locale } from "@/i18n.config";
import { getProduct, getProducts } from "@/server/db/product"
import { redirect } from "next/navigation";
import Form from "../../_components/Form";
import getTrans from "@/lib/translation";
import { getCategories } from "@/server/db/categories";

export async function generateStaticParams() {
    const products = await getProducts();

    return products.map((product) => ({ productId: product.id }))
}

const EditProductPage = async ({ params }: { params: Promise<{ locale: Locale, productId: string }> }) => {
    const { locale, productId } = await params;
    const translation = await getTrans(locale);
    const product = await getProduct(productId);

    // Get All Categories
    const categories = await getCategories();

    if (!product) {
        redirect(`/${locale}/${Routes.ADMIN}/${Pages.MENU_ITEMS}`)
    }
    return (
        <main className="grow">
            <div className="container mx-auto">
                <div className="w-full backdrop-blur-sm bg-accent p-5 rounded-4xl flex flex-col gap-4 mb-5">
                    <Form translation={translation} categories={categories} product={product} />
                </div>
            </div>
        </main>
    )
}

export default EditProductPage