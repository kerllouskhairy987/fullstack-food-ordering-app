import Link from '../../link'
import { Routes } from '@/constants/enums'
import Image from 'next/image'
import Navbar from './Navbar'
import { ModeToggle } from '../../ui/ModeToggle'
import CartButton from './CartButton'
import { getCurrentLocale } from '@/lib/getCurrentLocale'
import getTrans from '@/lib/translation'
import LanguageSwitcher from './LanguageSwitcher'

const Header = async () => {
    const locale = await getCurrentLocale();
    const { logo, navLinks } = await getTrans(locale);

    return (
        <header className='sticky top-0 z-50 backdrop-blur-sm'>
            <div className='container py-4  flex items-center lg:justify-between'>
                <Link href={`/${locale}`} className='flex items-center w-fit text-primary font-bold uppercase text-xl'>
                    <Image
                        src={"/logo.png"}
                        alt='logo'
                        width={40}
                        height={10}
                    />
                    {logo}
                </Link>

                <Navbar navLinks={navLinks} />
                <div className='flex gap-2 items-center  justify-end'>
                    <LanguageSwitcher />
                    <ModeToggle />
                    <CartButton />
                </div>

            </div>
        </header>
    )
}

export default Header