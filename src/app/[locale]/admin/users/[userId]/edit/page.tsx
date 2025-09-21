import EditUserForm from "@/components/dashboard/EditUserForm";
import { Pages, Routes } from "@/constants/enums";
import { Locale } from "@/i18n.config";
import getTrans from "@/lib/translation";
import { getUser, getUsers } from "@/server/db/users"
import { User } from "@prisma/client";
import { redirect } from "next/navigation";

export async function generateStaticParams() {
    const users = await getUsers()

    return users.map((user) => ({ userId: user.id }));
}

const EditUserPage = async ({ params }: { params: Promise<{ userId: string, locale: Locale }> }) => {
    const { userId, locale } = await params
    const translations = await getTrans(locale);
    const user = await getUser(userId);

    if (!user) {
        redirect(`/${locale}/${Routes.ADMIN}/${Pages.USERS}`)
    }
    return (
        <main className="grow">
            <div className="container mx-auto">
                <div className="w-full backdrop-blur-sm bg-accent p-5 rounded-4xl flex flex-col gap-4 mb-5">
                    <EditUserForm translation={translations} user={user as User} />
                </div>
            </div>
        </main>
    )
}

export default EditUserPage