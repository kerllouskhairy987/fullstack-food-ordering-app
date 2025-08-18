import '../app/[locale]/globals.css'
import { Inter } from 'next/font/google'
import type { Metadata } from 'next'
import NotFoundRoute from '@/components/ui/NotFoundRoute'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: '404 - Page Not Found',
    description: 'The page you are looking for does not exist.',
}

export default function GlobalNotFound() {
    return (
        <html lang="en" className={inter.className}>
            <body>
                <NotFoundRoute />
            </body>
        </html>
    )
}