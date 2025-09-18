import Link from "@/components/link"
import { buttonVariants } from "@/components/ui/button";
import { Languages, Pages, Routes } from "@/constants/enums"
import { Locale } from "@/i18n.config"
import getTrans from "@/lib/translation";
import { getProducts } from "@/server/db/product";
import { ArrowLeft } from "lucide-react";
import MenuItems from "./_components/MenuItems";

const MenuItemsPage = async ({ params }: { params: Promise<{ locale: Locale }> }) => {
    const { locale } = await params;
    const translation = await getTrans(locale);

    const products = await getProducts();

    return (
        <main className="grow">
            <div className="container mx-auto">
                <div className="w-full backdrop-blur-sm bg-accent p-5 rounded-4xl flex flex-col gap-4 mb-5">
                    <Link
                        href={`/${locale}/${Routes.ADMIN}/${Pages.MENU_ITEMS}/${Pages.NEW}`}
                        className={`${buttonVariants({ size: "lg" })} w-fit mx-auto`}
                    >
                        <ArrowLeft className={`${locale === Languages.ARABIC ? "-rotate-180" : ""}`} />
                        {translation.addProduct.title}
                    </Link>
                    <MenuItems products={products} />
                </div>
            </div>
        </main>
    )
}

export default MenuItemsPage