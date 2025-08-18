import { formatCurrency } from '@/lib/formatter'
import Image from 'next/image'
import AddToCart from './AddToCart'
import { ProductWithRelations } from '@/types/product'

const MenuItems = ({ item }: { item: ProductWithRelations }) => {
    return (
        <li className='border p-5 flex flex-col gap-4 rounded-md hover:bg-primary/10 hover:-translate-y-1'>
            <div className='relative w-52 h-52 mx-auto rounded-full overflow-hidden'>
                <Image src={item.image} alt={item.name} fill className='object-cover' />
            </div>

            <div className='flex items-center justify-between'>
                <h4 className='text-xl md:text-2xl'>{item.name}</h4>
                <strong className='text-accent-foreground/50'>
                    {formatCurrency(item.basePrice)}
                </strong>
            </div>

            <p className='text-accent-foreground/50 line-clamp-3 text-sm'>{item.description}</p>

            <AddToCart item={item} />
        </li>
    )
}

export default MenuItems
