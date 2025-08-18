"use client";

import CartItems from "@/components/cart/CartItems"
import CheckoutForm from "@/components/cart/CheckoutForm"
import Heading from "@/components/ui/Heading"

const CartPage = () => {
    return (
        <main className="grow section-gap">
            <div className="container">
                <Heading title="Cart" />
                <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 section-gap">
                    <CartItems />
                    <CheckoutForm />
                </section>
            </div>
        </main>
    )
}

export default CartPage