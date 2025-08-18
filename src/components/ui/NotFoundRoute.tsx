'use client';

import { usePathname } from 'next/navigation';
import LottieHandler from './LottieHandler';
import { buttonVariants } from './button';
import Link from '../link';

const NotFoundRoute = () => {
  const pathname = usePathname();

  return (
    <section className='container'>
      <div className='flex flex-col justify-center items-center gap-5 h-screen capitalize'>
        <LottieHandler lottieType='ErrorLottie' />
        <h1 className='text-2xl md:text-3xl text-primary'>this page is not found!</h1>
        <p className='text-accent-foreground/50'>Oops! The page you are looking for does not exist.</p>
        <div className='flex gap-4'>
          <Link href={pathname} className={`${buttonVariants({ variant: 'secondary', size: "lg" })}`} >Refresh</Link>
          <Link href={"/"} className={`${buttonVariants({ size: "lg" })}`} >Home</Link>
        </div>
      </div>
    </section>
  )
}

export default NotFoundRoute