import Link from "@/components/link"
import { Pages, Routes } from "@/constants/enums";
import { Locale } from "@/i18n.config";
import getTrans from "@/lib/translation";
import Form from "./_components/Form";


const SignupPage = async ({ params }: { params: Promise<{ locale: Locale }> }) => {
    const { locale } = await params;
    const translation = await getTrans(locale)

    return (
        <main className="section-gap grow">
            <div className="container flex items-center justify-center">
                <div className="backdrop-blur-sm bg-accent p-5 rounded-4xl w-[400px] flex flex-col gap-4">
                    <h2 className="text-2xl font-bold text-center">{translation.auth.register.title}</h2>
                    <Form translation={translation} />
                    <div className="flex justify-center gap-2">
                        <p>{translation.auth.register.haveAccount}</p>
                        <Link href={`/${locale}/${Routes.AUTH}/${Pages.LOGIN}`} className="text-primary">
                            {translation.auth.register.haveAccountLink}
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default SignupPage