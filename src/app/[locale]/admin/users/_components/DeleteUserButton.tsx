"use client";

import { Button } from "@/components/ui/button"
import { Trash } from "lucide-react"
import { useEffect, useState } from "react";
import { deleteUser } from "../_actions/user";
import { toast } from "sonner";
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useParams } from "next/navigation";
import { ITranslations } from "@/types/translations";
import Loader from "@/components/ui/Loader";

const DeleteUserButton = ({ translations, userId }: { translations: ITranslations, userId: string }) => {

    const [state, setState] = useState<{
        pending: boolean,
        message: string
        status: number | null
    }>({
        pending: false,
        message: "",
        status: null
    })

    const handleDelete = async (userId: string) => {
        try {
            setState((prev) => {
                return { ...prev, pending: true }
            })

            const res = await deleteUser(userId)

            setState((prev) => {
                return {
                    ...prev,
                    status: res.status,
                    message: res.message
                }
            })
        } catch (error) {
            console.log(error)
        } finally {
            setState((prev) => {
                return {
                    ...prev,
                    pending: false
                }
            })
        }
    }

    useEffect(() => {
        if (state.status && state.message && !state.pending) {
            toast(state.message, {
                position: "bottom-center",
                className: state.status === 200 ? "!text-primary" : "!text-destructive"
            })
        }
    }, [state.status, state.message, state.pending])

    return (
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button variant={"destructive"}>
                        <Trash className="h-4 w-4" />
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>{translations.category.delete.title}</AlertDialogTitle>
                        <AlertDialogDescription>
                            {translations.category.delete.description}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>{translations.category.delete.actions.cancel}</AlertDialogCancel>
                        {
                            state.pending
                                ? <Loader translation={translations} className="w-fit" />
                                : <Button
                                    type="button"
                                    onClick={() => handleDelete(userId)}
                                    variant={"destructive"}
                                >
                                    {translations.category.delete.actions.delete}
                                </Button>
                        }
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog >
    )
}

export default DeleteUserButton