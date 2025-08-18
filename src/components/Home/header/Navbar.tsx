"use client";

import { useState } from 'react';
import { Pages, Routes } from '@/constants/enums'
import Link from '../../link'
import { Button, buttonVariants } from '../../ui/button'
import { Menu, XIcon } from 'lucide-react';
import { usePathname } from 'next/navigation';

const Navbar = ({ navLinks }: { navLinks: { [key: string]: string } }) => {
    const pathname = usePathname()
    const [openMenu, setOpenMenu] = useState<boolean>(false)
    const locale = pathname.split("/")[1]

    const links = [
        { id: crypto.randomUUID(), title: navLinks.menu, href: Routes.MENU },
        { id: crypto.randomUUID(), title: navLinks.about, href: Routes.ABOUT },
        { id: crypto.randomUUID(), title: navLinks.contact, href: Routes.CONTACT },
        { id: crypto.randomUUID(), title: navLinks.login, href: `${Routes.AUTH}/${Pages.LOGIN}` }
    ]

    return (
        <nav className='flex grow justify-end lg:block lg:justify-center lg:grow-0'>
            <Button variant={"outline"} size={"icon"} className='lg:hidden me-2' onClick={() => setOpenMenu(true)}>
                <Menu className='!w-6 !h-6' />
            </Button>
            <ul className={`
        transition-all duration-300 backdrop-blur-sm bg-accent px-3 flex
        fixed top-0 ${openMenu ? "left-0 z-[100]" : "-left-full"} w-full flex-col items-start py-5
        lg:static lg:w-fit lg:py-2 lg:rounded-full lg:flex-row lg:items-center gap-5
        `}>
                <Button variant={"destructive"} size={"icon"} className='lg:hidden ms-auto' onClick={() => setOpenMenu(false)}>
                    <XIcon className='!w-6 !h-6' />
                </Button>
                {links.map((link) => (
                    <li key={link.id}>
                        <Link
                            href={`/${locale}/${link.href}`}
                            onNavigate={() => setOpenMenu(false)}
                            className={
                                `${link.href === `${Routes.AUTH}/${Pages.LOGIN}`
                                    ? `${buttonVariants({ size: "lg" })} !rounded-full`
                                    : "text-accent-foreground/50 hover:text-primary"
                                } 
                                ${pathname === `/${locale}/${link.href}` ? "text-primary" : ""}
                                px-3 py-2`
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