"use client";

import { useState } from 'react';
import { Pages, Routes } from '@/constants/enums'
import Link from '../../link'
import { Button, buttonVariants } from '../../ui/button'
import { Menu, XIcon } from 'lucide-react';

const Navbar = () => {
    const [openMenu, setOpenMenu] = useState<boolean>(false)

    const links = [
        { id: crypto.randomUUID(), title: "Menu", href: Routes.MENU },
        { id: crypto.randomUUID(), title: "About", href: Routes.ABOUT },
        { id: crypto.randomUUID(), title: "Contact", href: Routes.CONTACT },
        { id: crypto.randomUUID(), title: "Login", href: `${Routes.AUTH}/${Pages.LOGIN}` }
    ]

    return (
        <nav >
            <Button variant={"outline"} size={"icon"} className='lg:hidden' onClick={() => setOpenMenu(true)}>
                <Menu className='!w-6 !h-6' />
            </Button>
            <ul className={`
        transition-all duration-300 backdrop-blur-sm bg-accent-foreground px-3 flex
        fixed top-0 ${openMenu ? "left-0 z-[100]" : "-left-full"} w-full flex-col items-start py-5
        lg:static lg:w-fit lg:py-2 lg:rounded-full lg:flex-row lg:items-center gap-5
        `}>
                <Button variant={"destructive"} size={"icon"} className='lg:hidden ms-auto' onClick={() => setOpenMenu(false)}>
                    <XIcon className='!w-6 !h-6' />
                </Button>
                {links.map((link) => (
                    <li key={link.id}>
                        <Link
                            href={link.href}
                            className={
                                `${link.href === `${Routes.AUTH}/${Pages.LOGIN}`
                                    ? `${buttonVariants({ size: "lg" })} !rounded-full`
                                    : "text-accent hover:text-primary"
                                } px-3 py-2`
                            }
                        >
                            {link.title}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export default Navbar