import Heading from '@/components/ui/Heading'
import { Routes } from '@/constants/enums'
import { getCurrentLocale } from '@/lib/getCurrentLocale';
import getTrans from '@/lib/translation';

const AboutPage = async () => {
    const locale = await getCurrentLocale();
    const { home } = await getTrans(locale);
    const { about } = home
    return (
        <section className='section-gap grow' id={Routes.ABOUT}>
            <div className='container text-center'>
                <Heading subTitle={about.subTitle} title={about.title} />
                <div className='text-accent-foreground/50 max-w-md mx-auto mt-4 flex flex-col gap-4'>
                    <p>{about.descOne}</p>
                    <p>{about.descTwo}</p>
                    <p>{about.descThree}</p>
                </div>
            </div>
        </section>
    )
}

export default AboutPage