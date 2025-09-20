import EditUserForm from "@/components/dashboard/EditUserForm"
import { Locale } from "@/i18n.config";
import getTrans from "@/lib/translation";
import { authOptions } from "@/server/auth";
import { getServerSession } from "next-auth";
import { UserRole } from "@prisma/client";
import { redirect } from "next/navigation";
import { Pages, Routes } from "@/constants/enums";

const AdminPage = async ({ params }: { params: Promise<{ locale: Locale }> }) => {
    const { locale } = await params;
    const translation = await getTrans(locale);
    const session = await getServerSession(authOptions);

    if(!session) {
        redirect(`/${locale}/${Routes.AUTH}/${Pages.LOGIN}`)
    }

    if (session && session.user?.role !== UserRole.ADMIN) {
        redirect(`/${locale}/${Routes.PROFILE}`)
    }

    return (
        <main className="grow">
            <div className="container flex items-center justify-center">
            <div className="w-full backdrop-blur-sm bg-accent p-5 rounded-4xl flex flex-col gap-4 mb-5">
                <EditUserForm user={session?.user} translation={translation} />
            </div>
            </div>
        </main>
    )
}

export default AdminPage