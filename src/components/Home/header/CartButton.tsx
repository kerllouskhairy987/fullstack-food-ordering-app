"use client";

import Link from '@/components/link'
import { Routes } from '@/constants/enums'
import { getCartQuantity } from '@/lib/cart';
import { selectorCartItems } from '@/redux/features/cart/cartSlice';
import { useAppSelector } from '@/redux/hooks';
import { ShoppingCartIcon } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react';

const CartButton = () => {
    const [qty, setQty] = useState(0)
    const pathname = usePathname()
    const cart = useAppSelector(selectorCartItems) || [];
    const cartQuantity = getCartQuantity(cart)

    useEffect(() => {
        setQty(cartQuantity)
    }, [cartQuantity])

    return (
        <Link href={`/${Routes.CART}`} className={`relative group ${pathname === `/${Routes.CART}` ? "text-primary" : "text-accent-foreground/50"}`}>
            <span className='absolute -top-5 start-3 w-5 h-5 flex items-center justify-center rounded-full bg-primary text-white text-[12px]'>
                {qty}
            </span>
            <ShoppingCartIcon className='!w-6 !h-6 group-hover:text-primary' />
        </Link>
    )
}

export default CartButton