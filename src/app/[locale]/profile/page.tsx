import { getServerSession } from "next-auth";
import { UserRole } from "../../../../generated/prisma";
import { redirect } from "next/navigation";
import { Pages, Routes } from "@/constants/enums";
import { Locale } from "@/i18n.config";
import { authOptions } from "@/server/auth";
import getTrans from "@/lib/translation";
import EditUserForm from "@/components/dashboard/EditUserForm";

const profilePage = async ({ params }: { params: Promise<{ locale: Locale }> }) => {
    const session = await getServerSession(authOptions);
    const locale = (await params).locale;
    const translation = await getTrans(locale);

    if (!session) {
        redirect(`/${locale}/${Routes.AUTH}/${Pages.LOGIN}`)
    }

    if (session && session.user?.role === UserRole.ADMIN) {
        redirect(`/${locale}/${Routes.ADMIN}`)
    }

    return (
        <main className="grow">
            <div className="container flex items-center justify-center">
                <div className="backdrop-blur-sm bg-accent w-full p-5 rounded-4xl flex flex-col gap-4">
                    <h1 className="text-2xl font-bold text-center">{translation.navLinks.profile}</h1>
                    <div className="flex flex-col justify-center gap-2">
                        <EditUserForm translation={translation} user={session?.user} />
                    </div>
                </div>
            </div>
        </main>
    )
}

export default profilePage

/*
بدل م تحط الكلام دا في كل صفخه عايزها تكون محميه عملته في ال middleware file
const locale = (await params).locale;
    const session = await getServerSession();
    if (!session) {
        redirect(`/${locale}/${Routes.AUTH}/${Pages.LOGIN}`)
    }
*/