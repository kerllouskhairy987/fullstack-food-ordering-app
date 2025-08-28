import { getServerSession } from "next-auth";
import { UserRole } from "../../../../generated/prisma";
import { redirect } from "next/navigation";
import { Routes } from "@/constants/enums";
import { Locale } from "@/i18n.config";
import { authOptions } from "@/server/auth";

const profilePage = async ({ params }: { params: Promise<{ locale: Locale }> }) => {
    const session = await getServerSession(authOptions);
    const locale = (await params).locale;

    if (session && session.user?.role === UserRole.ADMIN) {
        redirect(`/${locale}/${Routes.ADMIN}`)
    }

    return (
        <main className="grow">
            profile page
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