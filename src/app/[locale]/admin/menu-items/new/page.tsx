import { Pages, Routes } from "@/constants/enums";
import { getCurrentLocale } from "@/lib/getCurrentLocale";
import getTrans from "@/lib/translation";
import { authOptions } from "@/server/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { UserRole } from "@prisma/client"
import Form from "../_components/Form";
import { getCategories } from "@/server/db/categories";

const NewProductPage = async () => {
    const session = await getServerSession(authOptions);
    const locale = await getCurrentLocale();
    const translation = await getTrans(locale);
    const categories = await getCategories();

    // You Do Not Have An Account
    if (!session) {
        redirect(`/${locale}/${Routes.AUTH}/${Pages.LOGIN}`)
    }

    // You Are Not An Admin
    if (session && session.user?.role !== UserRole.ADMIN) {
        redirect(`/${locale}/${Routes.PROFILE}`)
    }

    // If Do Not Have Categories Create Category First
    if (!categories || categories.length === 0) {
        redirect(`/${locale}/${Routes.ADMIN}/${Pages.CATEGORIES}`)
    }

    return (
        <main className="grow">
            <div className="container mx-auto">
                <div className="w-full backdrop-blur-sm bg-accent p-5 rounded-4xl flex flex-col gap-4 mb-5">
                    <Form categories={categories} translation={translation} />
                </div>
            </div>
        </main>
    )
}

export default NewProductPage