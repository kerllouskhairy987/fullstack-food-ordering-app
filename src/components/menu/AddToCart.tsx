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

const sizes = [
    { id: crypto.randomUUID(), name: "Small", price: 0 },
    { id: crypto.randomUUID(), name: "Medium", price: 4 },
    { id: crypto.randomUUID(), name: "Large", price: 8 }
]

const extras = [
    { id: crypto.randomUUID(), name: "Tomato", price: 2 },
    { id: crypto.randomUUID(), name: "union", price: 4 },
    { id: crypto.randomUUID(), name: "cheese", price: 8 },
]

const AddToCart = ({ item }: { item: any }) => {
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
                    <div className="grid gap-4">
                        <Label htmlFor='pick-size' className='mx-auto text-lg my-2'>Pick your size</Label>
                        <PickSize sizes={sizes} item={item} />
                    </div>
                    <div className="grid gap-4">
                        <Label htmlFor='any-extras' className='mx-auto text-lg my-2'>Any Extras?</Label>
                        <Extras extras={extras} item={item} />
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button type="submit">Add To Cart</Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    )
}

export default AddToCart

// Pick Size Component
function PickSize({ sizes, item }: { sizes: any, item: any }) {
    return (
        <RadioGroup defaultValue="comfortable">
            {
                sizes?.map((size: any) => (
                    <div key={size.id} className="flex items-center gap-3 border px-4 py-3 rounded-md hover:bg-primary/20 cursor-pointer">
                        <RadioGroupItem value="default" id={size.id} />
                        <Label htmlFor={size.id} className='cursor-pointer uppercase'>
                            {size.name} {formatCurrency(size.price + item.basePrice)}
                        </Label>
                    </div>
                ))
            }
        </RadioGroup>
    )
}

// Pick Extras Component
function Extras({ extras, item }: { extras: any, item: any }) {
    return (
        <div className="flex flex-col gap-6">
            {
                extras.map((extra: any) => (
                    <div key={extra.id} className="flex items-center gap-3 border px-4 py-3 rounded-md hover:bg-primary/20 cursor-pointer">
                        <Checkbox id={extra.id} />
                        <Label htmlFor={extra.id}>Accept terms and conditions</Label>
                    </div>
                ))
            }
        </div>
    )
}
