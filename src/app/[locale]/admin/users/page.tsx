import Link from "@/components/link";
import { buttonVariants } from "@/components/ui/button";
import { Pages, Routes } from "@/constants/enums";
import { Locale } from "@/i18n.config";
import { getUsers } from "@/server/db/users"
import { Edit } from "lucide-react";
import DeleteUserButton from "./_components/DeleteUserButton";
import Image from "next/image";
import DeleteCategory from "../categories/_components/DeleteCategory";
import getTrans from "@/lib/translation";

const UsersPage = async ({ params }: { params: Promise<{ locale: Locale }> }) => {
    const { locale } = await params;
    const translations = await getTrans(locale);
    const users = await getUsers();

    return (
        <main className="grow">
            <div className="container mx-auto">
                <div className="w-full backdrop-blur-sm bg-accent p-5 rounded-4xl flex flex-col gap-4 mb-5">
                    <ul className="flex flex-col gap-3">
                        {
                            users.map((user) => (
                                <li key={user.id} className="flex justify-center items-center gap-2 bg-primary/10 p-3 rounded-md">
                                    <div className="flex grow flex-1 items-center gap-2">
                                        <div className="relative w-[60px] h-[60px] rounded-full overflow-hidden">
                                            <Image
                                                fill
                                                alt={user.name}
                                                src={user.image ? user.image : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLMI5YxZE03Vnj-s-sth2_JxlPd30Zy7yEGg&s"}
                                            />
                                        </div>
                                        <div>
                                            <h2 className="text-bold text-lg">{user.name}</h2>
                                            <p className="text-accent-foreground/50 block md:hidden">{user.email}</p>
                                        </div>
                                    </div>
                                    <div className="hidden md:block flex-1">{user.email}</div>

                                    <div className="flex  justify-end gap-4">
                                        <Link
                                            href={`/${locale}/${Routes.ADMIN}/${Pages.USERS}/${user.id}/${Pages.EDIT}`}
                                            className={`${buttonVariants({ variant: "outline" })}`}
                                        >
                                            <Edit />
                                        </Link>
                                        <DeleteUserButton translations={translations} userId={user.id} />
                                    </div>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </main>
    )
}

export default UsersPage