
import Menu from "@/components/menu/Menu";
import Heading from "@/components/ui/Heading";
import { getProductByCategory } from "@/server/db/product"

const MenuPage = async () => {
    const categories = await getProductByCategory();
    return (
        <section className="grow">
            {categories.length > 0
                ? categories.map((category) => (
                    <section key={category.id} className="section-gap">
                        <div className="container">
                            <div className="mb-4">
                                <Heading title={category.name} />
                            </div>
                            <Menu items={category.products} />
                        </div>
                    </section>
                ))
                : <p className="text-center font-semibold text-xl text-red-500">No categories</p>
        }
        </section>
    )
}

export default MenuPage