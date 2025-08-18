import Image from 'next/image'
import HeroCanvas from '../../ui/HeroCanvas'
import Link from '../../link'
import { Languages, Routes } from '@/constants/enums'
import { buttonVariants } from '../../ui/button'
import { ArrowRightCircle } from 'lucide-react'
import { getCurrentLocale } from '@/lib/getCurrentLocale'
import getTrans from '@/lib/translation'

const Hero = async () => {
    const locale = await getCurrentLocale();
    const { home } = await getTrans(locale);
    const { hero } = home;
    return (
        <section className=''>
            <div className="relative w-full h-[500px] overflow-hidden">
                <div className="absolute top-0 left-0 !h-full !w-full -z-10">
                    <HeroCanvas />
                </div>
                <div className="container py-10 grid grid-cols-1 md:grid-cols-2 h-full justify-between gap-10">
                    <div className='flex flex-col gap-5 md:gap-10 justify-center'>
                        <h1 className='font-bold text-3xl md:text-4xl whitespace-nowrap'>{hero.heroTitle}</h1>
                        <p className='text-accent-foreground/50 text-lg'>{hero.heroDes}</p>

                        <div className='flex gap-3'>
                            <Link
                                href={Routes.MENU}
                                className={`${buttonVariants({ size: "lg" })}`}

                            >
                                {hero.buttons.orderNow}
                                <ArrowRightCircle className={`!w-5 !h-5  ${locale === Languages.ARABIC ? "-rotate-180" : ""}`} />
                            </Link>
                            <Link
                                href={Routes.ABOUT}
                                className={`${buttonVariants({ variant: "ghost", size: "lg" })}`}

                            >
                                {hero.buttons.learnMore}
                                <ArrowRightCircle className={`!w-5 !h-5  ${locale === Languages.ARABIC ? "-rotate-180" : ""}`} />
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