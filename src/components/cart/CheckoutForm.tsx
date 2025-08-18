"use client";

import { selectorCartItems } from "@/redux/features/cart/cartSlice";
import { Label } from "../ui/label";
import { useAppSelector } from "@/redux/hooks";
import { Button } from "../ui/button";
import { formatCurrency } from "@/lib/formatter";
import { getTotalAmount } from "@/lib/cart";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { useEffect, useState } from "react";

const CheckoutForm = () => {
    const [total, setTotal] = useState(0);
    const cart = useAppSelector(selectorCartItems) || [];
    const totalAmount = getTotalAmount(cart)

    useEffect(() => {
        setTotal(totalAmount)
    }, [totalAmount])

    return (
        total && cart && cart.length > 0 ? (
            <div className='grid gap-6 border rounded-md p-4'>
                <h2 className='text-2xl font-semibold'>Checkout</h2>
                <form>
                    <div className='grid gap-4'>
                        <div className='grid gap-1'>
                            <Label htmlFor='phone' className='text-accent-foreground/50'>
                                Phone
                            </Label>
                            <Input
                                id='phone'
                                placeholder='Enter your phone'
                                type='text'
                                name='phone'
                            />
                        </div>
                        <div className='grid gap-1'>
                            <Label htmlFor='address' className='text-accent-foreground/50'>
                                Street address
                            </Label>
                            <Textarea
                                id='address'
                                placeholder='Enter your address'
                                name='address'
                                className='resize-none'
                            />
                        </div>
                        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                            <div className='grid gap-1'>
                                <Label htmlFor='postal-code' className='text-accent-foreground/50'>
                                    Postal code
                                </Label>
                                <Input
                                    type='text'
                                    id='postal-code'
                                    placeholder='Enter postal code'
                                    name='postal-code'
                                />
                            </div>
                            <div className='grid gap-1'>
                                <Label htmlFor='city' className='text-accent-foreground/50'>
                                    City
                                </Label>
                                <Input
                                    type='text'
                                    id='city'
                                    placeholder='Enter your City'
                                    name='city'
                                />
                            </div>
                            <div className='grid gap-1'>
                                <Label htmlFor='country' className='text-accent-foreground/50'>
                                    Country
                                </Label>
                                <Input
                                    type='text'
                                    id='country'
                                    placeholder='Enter your country'
                                    name='country'
                                />
                            </div>
                        </div>
                        <Button className='h-10'>Pay {formatCurrency(total)}</Button>
                    </div>
                </form>
            </div>
        ) : null
    );
}

export default CheckoutForm