"use client";

import Image from 'next/image';
import { Button } from '../ui/button'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    RadioGroup,
    RadioGroupItem,
} from "@/components/ui/radio-group"
import { Label } from '../ui/label';
import { formatCurrency } from '@/lib/formatter';
import { Checkbox } from '../ui/checkbox';
import { Extra, ExtraIngredients, Product, ProductSizes, Size } from '../../../generated/prisma';
import { ProductWithRelations } from '@/types/product';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { AddCartItem, removeCartItem, removeItemFromCart, selectorCartItems } from '@/redux/features/cart/cartSlice';
import { getItemQuantity } from '@/lib/cart';
import { Minus, Plus } from 'lucide-react';


const AddToCart = ({ item }: { item: ProductWithRelations }) => {
    const cart = useAppSelector(selectorCartItems);
    const dispatch = useAppDispatch();

    const quantity = getItemQuantity(item.id, cart)

    // Default Size
    const defaultSize =
        cart.find((cartItem) => cartItem.id === item.id)?.size ||  // اللي جاي من السله
        item.sizes.find((ele) => ele.name === ProductSizes.SMALL) // ال default اللي هو ال small
    const [selectedSize, setSelectedSize] = useState<Size>(defaultSize!);  // - ! to make sure its not null or undefined 

    // Default Extras
    const defaultExtras = cart.find((cartItem) => cartItem.id === item.id)?.extras;  // اللي جاي من السله
    const [selectedExtras, setSelectedExtras] = useState<Extra[]>(defaultExtras || []);

    // Total Price
    let totalPrice = item.basePrice;
    if (selectedSize) {
        totalPrice += selectedSize.price
    }
    if (selectedExtras.length > 0) {
        for (const extra of selectedExtras) {
            totalPrice += extra.price
        }
    }

    // Handle Add To Cart Function
    const handleAddToCart = () => {
        dispatch(AddCartItem({
            id: item.id,
            name: item.name,
            basePrice: item.basePrice,
            image: item.image,
            size: selectedSize,
            extras: selectedExtras,
        }))
    }

    typeof localStorage !== "undefined" && useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cart));
    }, [cart]);

    return (
        <Dialog>
            <form>
                <DialogTrigger asChild>
                    <Button className='block mx-auto'>Add To Cart</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] h-[calc(100%-200px)] overflow-y-auto text-center">
                    <DialogHeader className='flex flex-col items-center justify-center gap-3'>
                        <Image src={item.image} alt={item.name} width={200} height={200} />
                        <DialogTitle>{item.name}</DialogTitle>
                        <DialogDescription>{item.description}</DialogDescription>
                    </DialogHeader>

                    {/* Pick Size */}
                    <div className="grid gap-4">
                        <Label htmlFor='pick-size' className='mx-auto text-lg my-2'>Pick your size</Label>
                        <PickSize sizes={item.sizes} item={item} selectedSize={selectedSize} setSelectedSize={setSelectedSize} />
                    </div>

                    {/* Extras */}
                    <div className="grid gap-4">
                        <Label htmlFor='any-extras' className='mx-auto text-lg my-2'>Any Extras?</Label>
                        <Extras extras={item.extras} selectedExtras={selectedExtras} setSelectedExtras={setSelectedExtras} />
                    </div>

                    <DialogFooter className='flex items-center'>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        {
                            quantity === 0 ?
                                <Button type="submit" onClick={handleAddToCart}>
                                    <span>Add To Cart</span>
                                    {formatCurrency(totalPrice)}
                                </Button>
                                : <ChooseQuantity quantity={quantity} item={item} selectedSize={selectedSize} selectedExtras={selectedExtras} />
                        }
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    )
}

export default AddToCart

// Pick Size Component
function PickSize(
    {
        sizes,
        item,
        selectedSize,
        setSelectedSize,
    }
        : {
            sizes: Size[],
            item: ProductWithRelations,
            selectedSize: Size,
            setSelectedSize: React.Dispatch<React.SetStateAction<Size>>
        }) {
    return (
        <RadioGroup defaultValue="comfortable">
            {
                sizes?.map((size) => (
                    <div key={size.id} className="flex items-center gap-3 ps-4 border rounded-md hover:bg-primary/20 cursor-pointer">
                        <RadioGroupItem
                            value={selectedSize.name}
                            checked={selectedSize.id === size.id}
                            onClick={() => setSelectedSize(size)}
                            id={size.id}

                        />
                        <Label htmlFor={size.id} className='cursor-pointer uppercase py-3'>
                            {size.name} {formatCurrency(size.price + item.basePrice)}
                        </Label>
                    </div>
                ))
            }
        </RadioGroup>
    )
}

// Pick Extras Component
function Extras(
    { extras, selectedExtras, setSelectedExtras }
        : { extras: Extra[], selectedExtras: Extra[], setSelectedExtras: React.Dispatch<React.SetStateAction<Extra[]>> }
) {
    const handleExtra = (extra: Extra) => {
        if (selectedExtras.find((ele) => ele.id === extra.id)) {
            setSelectedExtras((prev) => prev.filter((ele) => ele.id !== extra.id))
        } else {
            setSelectedExtras((prev) => [...prev, extra])
        }
    }
    return (
        <div className="flex flex-col gap-6">
            {
                extras.map((extra) => (
                    <div key={extra.id} className="flex items-center gap-3 border ps-4 rounded-md hover:bg-primary/20 cursor-pointer">
                        <Checkbox
                            id={extra.id}
                            onClick={() => handleExtra(extra)}
                            checked={Boolean(selectedExtras.find((ele) => ele.id === extra.id))}
                        />
                        <Label htmlFor={extra.id} className='cursor-pointer uppercase py-3'>
                            {extra.name} {formatCurrency(extra.price)}
                        </Label>
                    </div>
                ))
            }
        </div>
    )
}

// Custom Component For Adding Product To Cart
const ChooseQuantity = ({ quantity, item, selectedSize, selectedExtras }: { quantity: number, item: ProductWithRelations, selectedSize: Size, selectedExtras: Extra[] }) => {
    const dispatch = useAppDispatch();
    return (
        <div className='flex gap-3 items-center border border-primary rounded-md '>
            <Button variant={"destructive"} onClick={() => dispatch(removeItemFromCart({ id: item.id }))}>remove</Button>
            <Button size={"icon"}
                onClick={() => dispatch(AddCartItem({
                    id: item.id,
                    name: item.name,
                    basePrice: item.basePrice,
                    image: item.image,
                    size: selectedSize,
                    extras: selectedExtras
                }))}>
                <Plus />
            </Button>
            <span className='font-semibold text-xl border px-3 rounded-md h-full min-w-14 py-1'>{quantity}</span>
            <Button variant={"outline"} size={"icon"} onClick={() => dispatch(removeCartItem({ id: item.id }))}>
                <Minus className='cursor-pointer' />
            </Button>
        </div>
    )
}