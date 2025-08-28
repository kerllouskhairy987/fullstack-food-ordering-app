import Link from "@/components/link"
import { Pages, Routes } from "@/constants/enums";
import { getCurrentLocale } from "@/lib/getCurrentLocale";
import Form from "./_components/Form";
import getTrans from "@/lib/translation";

const SigninPage = async () => {
    const locale = await getCurrentLocale();
    const translation = await getTrans(locale);
    // const { auth } = translation;

    return (
        <main className="section-gap grow">
            <div className="container flex items-center justify-center">
                <div className="backdrop-blur-sm bg-accent p-5 rounded-4xl w-[400px] flex flex-col gap-4">
                    <h2 className="text-2xl font-bold text-center">{translation.auth.login.title}</h2>
                    <Form translation={translation} />
                    <div className="flex justify-center gap-2">
                        <p>{translation.auth.login.noHaveAccount}</p>
                        <Link href={`/${locale}/${Routes.AUTH}/${Pages.Register}`} className="text-primary">
                            {translation.auth.login.noHaveAccountLink}
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default SigninPage