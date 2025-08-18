import Heading from '@/components/ui/Heading'
import { Routes } from '@/constants/enums'
import { getCurrentLocale } from '@/lib/getCurrentLocale';
import getTrans from '@/lib/translation'

const ContactPage = async () => {
    const locale = await getCurrentLocale();
    const { home } = await getTrans(locale)
    const { contact } = home
    return (
        <section className='section-gap grow' id={Routes.CONTACT}>
            <div className='container text-center'>
                <Heading subTitle={contact.subTitle} title={contact.title} />
                <div className='mt-4 text-center'>
                    <a className='text-2xl underline' href="tel:+201032910697">
                        {contact.phone}
                    </a>
                </div>

            </div>
        </section>
    )
}

export default ContactPage