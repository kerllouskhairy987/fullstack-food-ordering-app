"use client";

import { ITranslations } from "@/types/translations"
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
import { Button } from "@/components/ui/button"
import { Trash } from "lucide-react"
import { deleteCategory } from "../_actions/category";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import Loader from "@/components/ui/Loader";

type stateType = {
    isLoading: boolean,
    message: string,
    status: number | null
}

const DeleteCategory = ({ id, translations }: { id: string, translations: ITranslations }) => {

    const [state, setState] = useState<stateType>({
        isLoading: false,
        message: "",
        status: null
    });
    // console.log("STATE", state)

    const deleteCategoryHandler = async () => {
        try {
            setState({ ...state, isLoading: true })
            const res = await deleteCategory(id);
            setState((prev) => {
                return {
                    ...prev,
                    message: res.message,
                    status: res.status,
                }
            })
            console.log(res)
        } catch (error) {
            console.error(error)
        } finally {
            setState((prev) => {
                return { ...prev, isLoading: false }
            })
        }
    }

    useEffect(() => {
        if (state.status && state.message) {
            toast(state.message, {
                position: "bottom-center",
                className: state.status === 200 ? "!text-primary" : "!text-destructive"
            })
        }
    }, [state, state.status, state.message])

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
                        state.isLoading
                            ? <Loader translation={translations} className="w-fit" />
                            : <Button type="button" onClick={deleteCategoryHandler} variant={"destructive"}>{translations.category.delete.actions.delete}</Button>
                    }
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog >
    )
}

export default DeleteCategory