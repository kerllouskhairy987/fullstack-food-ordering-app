import { getCurrentLocale } from "@/lib/getCurrentLocale";
import getTrans from "@/lib/translation";

const Footer = async () => {
    const locale = await getCurrentLocale();
    const { footer } = await getTrans(locale);

    return (
        <footer className='text-center py-4 backdrop-blur-sm bg-accent text-accent-foreground'>
            <p>{footer.copyRight}</p>
        </footer>
    )
}

export default Footer