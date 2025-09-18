import Link from "next/link"
import { Product } from "../../../../../../generated/prisma"
import { getCurrentLocale } from "@/lib/getCurrentLocale";
import getTrans from "@/lib/translation";
import Image from "next/image";
import { Pages, Routes } from "@/constants/enums";
import LottieHandler from "@/components/ui/LottieHandler";

const MenuItems = async ({ products }: { products: Product[] }) => {
    const locale = await getCurrentLocale();
    const translations = await getTrans(locale);

    return (
        products && products.length > 0
            ? <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
                {products.map((product) => (
                    <li key={product.id} >
                        <Link
                            className="flex flex-col gap-2 bg-primary/10 p-4"
                            href={`/${locale}/${Routes.ADMIN}/${Pages.MENU_ITEMS}/${product.id}/${Pages.EDIT}`}
                        >
                            <div className="relative max-w-full h-[200px] rounded-md overflow-hidden">
                                <Image
                                    src={product.image}
                                    alt={product.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <h3 title={product.name} className="text-center line-clamp-1">
                                {product.name}
                            </h3>
                        </Link>
                    </li>
                ))}
            </ul>
            : (
                <>
                    <LottieHandler lottieType="NoBestSellers" title={translations.home.bestSellers.noBestSellers} />
                </>
            )
    )
}

export default MenuItems