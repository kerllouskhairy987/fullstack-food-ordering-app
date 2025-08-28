import Link from '../../link'
import Image from 'next/image'
import Navbar from './Navbar'
import { ModeToggle } from '../../ui/ModeToggle'
import CartButton from './CartButton'
import { getCurrentLocale } from '@/lib/getCurrentLocale'
import getTrans from '@/lib/translation'
import LanguageSwitcher from './LanguageSwitcher'
import { getServerSession } from 'next-auth'

const Header = async () => {
    const locale = await getCurrentLocale();
    const translations = await getTrans(locale);
    const initialSession = await getServerSession();

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
                    {translations.logo}
                </Link>

                <Navbar translations={translations} initialSession={initialSession} />
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