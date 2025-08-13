import Image from 'next/image'
import HeroCanvas from '../../ui/HeroCanvas'
import Link from '../../link'
import { Routes } from '@/constants/enums'
import { buttonVariants } from '../../ui/button'
import { ArrowRightCircle } from 'lucide-react'

const Hero = () => {
    return (
        <section className=''>
            <div className="relative w-full h-[500px] overflow-hidden">
                <div className="absolute top-0 left-0 !h-full !w-full -z-10">
                    <HeroCanvas />
                </div>
                <div className="container py-10 grid grid-cols-1 md:grid-cols-2 h-full justify-between gap-10">
                    <div className='flex flex-col gap-5 md:gap-10 justify-center'>
                        <h1 className='font-bold text-3xl md:text-4xl whitespace-nowrap'>Slice into Happiness</h1>
                        <p className='text-accent-foreground/50 text-lg'>Caving Pizza? We have got you covered with fresh ingredients, endless flavors, and the fastest delivery. Your perfect slice is just a tap away!</p>

                        <div className='flex gap-3'>
                            <Link
                                href={Routes.MENU}
                                className={`${buttonVariants({ size: "lg" })}`}

                            >
                                Order Now
                                <ArrowRightCircle className='!w-5 !h-5' />
                            </Link>
                            <Link
                                href={Routes.ABOUT}
                                className={`${buttonVariants({ variant: "ghost", size: "lg" })}`}

                            >
                                Learn More
                                <ArrowRightCircle className='!w-5 !h-5' />
                            </Link>
                        </div>
                    </div>
                    <div className='relative hidden md:block'>
                        <Image src={"/heroSecImg.png"} fill alt='pizza' loading="eager" priority className='object-contain' />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero