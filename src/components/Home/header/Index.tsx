import React from 'react'
import Link from '../../link'
import { Routes } from '@/constants/enums'
import Image from 'next/image'
import Navbar from './Navbar'
import { ModeToggle } from '../../ui/ModeToggle'

const Header = () => {
    return (
        <header className='sticky top-0 z-50 backdrop-blur-sm'>
            <div className='container py-4 md:py-6 flex items-center justify-between'>
                <Link href={Routes.ROOT} className='flex items-center w-fit text-primary font-bold uppercase text-xl'>
                    <Image
                        src={"/logo.png"}
                        alt='logo'
                        width={40}
                        height={10}
                    />
                    pizza
                </Link>

                    <Navbar />
                <div className='flex space-x-2 items-center'>
                    <ModeToggle />
                </div>

            </div>
        </header>
    )
}

export default Header