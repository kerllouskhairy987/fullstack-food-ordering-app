// eslint-disable-next-line @typescript-eslint/no-explicit-any

"use client";

import { formatCurrency } from "@/lib/formatter";
import { CartItem, removeItemFromCart, selectorCartItems } from "@/redux/features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import Image from "next/image";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";
import { deliveryFee, getSubTotal } from "@/lib/cart";
import { useEffect, useState } from "react";
import LottieHandler from "../ui/LottieHandler";

const CartItems = () => {
    const [isMounted, setIsMounted] = useState(false);
    const cart = useAppSelector(selectorCartItems) || [];
    const subTotal = getSubTotal(cart);
    const dispatch = useAppDispatch();

    useEffect(() => {
        localStorage.setItem("cartItems", JSON.stringify(cart));
        setIsMounted(true);
    }, [cart]);

    return (
        <div>
            {isMounted && cart && cart.length > 0 ? (
                <>
                    <ul>
                        {cart.map((item: CartItem) => (
                            <li key={item.id} className="mb-4">
                                <div className="flex gap-6 justify-between border p-3 rounded-md hover:bg-primary/10">
                                    <div className="flex flex-col sm:flex-row items-center gap-2">
                                        <div className="relative w-24 h-24 rounded-full overflow-hidden">
                                            <Image
                                                src={item.image}
                                                className="object-cover"
                                                alt={item.name}
                                                fill
                                            />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold md:text-lg">{item.name}</h4>
                                            <div className="flex items-start justify-end grow gap-2">
                                                <div className="flex-1 grow">
                                                    {item.size ? (
                                                        <span className="text-sm text-accent-foreground/50">
                                                            Size: {item.size.name}
                                                        </span>
                                                    ) : (
                                                        <span className="text-sm text-accent-foreground/50">
                                                            Size: SMALL
                                                        </span>
                                                    )}
                                                    {item.extras && item.extras.length > 0 && (
                                                        <div className="flex gap-2">
                                                            <span>Extras:</span>
                                                            <ul>
                                                                {item.extras.map((extra) => (
                                                                    <li key={extra.id}>
                                                                        <span className="text-sm text-accent-foreground/50">
                                                                            {extra.name} {formatCurrency(extra.price)}
                                                                        </span>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    )}
                                                </div>
                                                <span className=" text-sm text-accent-foreground/50">
                                                    x{item.quantity}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex-1 flex items-end justify-end">
                                        <div className="flex items-center gap-3">
                                            <strong className="text-accent-foreground/50 ">
                                                {formatCurrency(item.basePrice + (item.size?.price! || 0))}
                                            </strong>
                                            <Button
                                                onClick={() => {
                                                    dispatch(removeItemFromCart({ id: item.id }))
                                                }}
                                                variant="secondary"
                                                className="border"
                                            >
                                                <Trash2 />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div className="flex flex-col justify-end items-end pt-6">
                        <span className="text-primary font-medium flex gap-2">
                            Subtotal:
                            <strong className="text-accent-foreground/50">
                                {formatCurrency(subTotal)}
                            </strong>
                        </span>
                        <span className="text-primary font-medium flex gap-2">
                            Delivery:
                            <strong className="text-accent-foreground/50">
                                {formatCurrency(deliveryFee)}
                            </strong>
                        </span>
                        <span className="text-primary font-medium flex gap-2">
                            Total:
                            <strong className="text-accent-foreground/50">
                                {formatCurrency(subTotal + deliveryFee)}
                            </strong>
                        </span>
                    </div>
                </>
            ) : (
                <LottieHandler lottieType="NoBestSellers" title="There are no items in your cart. Add some" />
            )}
        </div>
    )
};

export default CartItems;
