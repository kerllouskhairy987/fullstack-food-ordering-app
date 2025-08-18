
import Menu from "@/components/menu/Menu";
import Heading from "@/components/ui/Heading";
import { getProductByCategory } from "@/server/db/product"

const MenuPage = async () => {
    const categories = await getProductByCategory();
    return (
        <section className="grow">
            {categories.map((category) => (
                <section key={category.id} className="section-gap">
                    <div className="container">
                        <div className="mb-4">
                            <Heading title={category.name} />
                        </div>
                        <Menu items={category.products} />
                    </div>
                </section>
            ))}
        </section>
    )
}

export default MenuPage