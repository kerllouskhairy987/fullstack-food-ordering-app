import MenuItems from "./MenuItems"

const Menu = ({ items }: { items: any }) => {
    return (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 ">
            {
                items.map((item: {id: string, image: string, name: string, description: string}) => (
                    <MenuItems key={item.id} item={item} />
                ))
            }
        </ul>
    )
}

export default Menu