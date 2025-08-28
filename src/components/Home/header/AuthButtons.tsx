"use client";

import Link from "@/components/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { Pages, Routes } from "@/constants/enums";
import { useClientSession } from "@/hooks/useClientSession";
import { ITranslations } from "@/types/translations";
import { Session } from "next-auth";
import { signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

const AuthButtons = ({ translations, initialSession }: { translations: ITranslations, initialSession: Session | null }) => {
    const pathname = usePathname()
    console.log(pathname)
    const locale = pathname.split("/")[1];
    // const session = useSession();
    const session = useClientSession(initialSession)
    console.log("Session", session)
    return (
        <div>
            {
                session.data?.user ? (
                    <div>
                        <Button variant={"destructive"} size={"lg"} className="rounded-full" onClick={() => signOut()}>
                            {translations.auth.logout.submit}
                        </Button>
                    </div>
                )
                    : (
                        <div className="flex flex-col lg:flex-row gap-5">
                            <Link href={`/${locale}/${Routes.AUTH}/${Pages.Register}`}
                                className={`
                                    ${buttonVariants({ variant: "outline", size: "lg" })}
                                    ${pathname === `/${locale}/${Routes.AUTH}/${Pages.Register}` ? "text-primary" : ""}
                                    !rounded-full
                                `}
                            >
                                {translations.auth.register.submit}
                            </Link>

                            <Link href={`/${locale}/${Routes.AUTH}/${Pages.LOGIN}`}
                                className={`${buttonVariants({ size: "lg" })} !rounded-full`}
                            >
                                {translations.auth.login.submit}
                            </Link>
                        </div>
                    )
            }
        </div>
    )
}

export default AuthButtons