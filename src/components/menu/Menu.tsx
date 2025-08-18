import { ProductWithRelations } from "@/types/product"
import MenuItems from "./MenuItems"
import LottieHandler from "../ui/LottieHandler"
import { getCurrentLocale } from "@/lib/getCurrentLocale";
import getTrans from "@/lib/translation";

const Menu = async ({ items }: { items: ProductWithRelations[] }) => {
    const locale = await getCurrentLocale();
    const {home} = await getTrans(locale);
    const {bestSellers: bestSellersTrans} = home
    return (
        <>
            {
                items.length > 0 ? (
                    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 ">
                        {
                            items.map((item) => (
                                <MenuItems key={item.id} item={item} />
                            ))
                        }
                    </ul>
                )
                    : (
                        <>
                            <LottieHandler lottieType="NoBestSellers" title={bestSellersTrans.noBestSellers} />
                        </>
                    )
            }
        </>
    )
}

export default Menu