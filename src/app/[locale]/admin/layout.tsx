import getTrans from "@/lib/translation";
import AdminTabs from "./_components/AdminTabs"
import { Locale } from "@/i18n.config";

const AdminLayout = async ({ params, children }: { params: Promise<{ locale: Locale }>, children: React.ReactNode }) => {
    const { locale } = await params;
    const translations = await getTrans(locale);

    return (
        <>
            <AdminTabs translations={translations} />
            {children}
        </>
    )
}

export default AdminLayout