"use client";

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Languages } from "@/constants/enums";
import { ITranslations } from "@/types/translations"
import { Edit } from "lucide-react"
import { useParams } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import { updateCategory } from "../_actions/category";
import { Category } from "@prisma/client"
import Loader from "@/components/ui/Loader";
import { validationErrors } from "@/validations/auth";
import { toast } from "sonner";

type InitialStateType = {
    message?: string;
    error?: validationErrors;
    status?: number | null;
};
const initialState: InitialStateType = {
    message: "",
    error: {},
    status: null,
};


function EditCategory({ category, translations }: { category: Category, translations: ITranslations }) {
    const { locale } = useParams();
    const [open, setOpen] = useState(false);
    const [state, action, pending] = useActionState(updateCategory.bind(null, category.id), initialState);

    useEffect(() => {
        if (state.status && state.message) {
            toast(state.message, {
                position: "bottom-center",
                className: state.status === 200 ? "!text-primary" : "!text-destructive"
            })
        }
    }, [state, state.status, state.message])

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant={"outline"}>
                    <Edit className="h-4 w-4" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <form action={action} className="flex flex-col gap-4">
                    <DialogHeader
                        className={
                            locale === Languages.ARABIC ? "!text-right" : "!text-left"
                        }
                    >
                        <DialogTitle>{translations.category.edit.title}</DialogTitle>
                        <DialogDescription>{translations.category.edit.description}</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4">
                        <div className="grid gap-3">
                            <Label htmlFor="categoryName">{translations.category.table.head.name}</Label>
                            <div>
                                <Input id="categoryName" name="categoryName" defaultValue={category.name}
                                    placeholder={translations.category.edit.title}
                                />
                                {
                                    state.error?.categoryName
                                    && <p className="text-destructive mt-2 text-sm font-medium">{state.error.categoryName}</p>
                                }
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">{translations.category.edit.actions.cancel}</Button>
                        </DialogClose>
                        {
                            pending
                                ? <Loader translation={translations} className="w-fit" />
                                : <Button onClick={() => {
                                    if (pending) return
                                    setTimeout(() => {
                                        setOpen(false)
                                    }, 2000)
                                }} type="submit" disabled={pending}>{translations.category.edit.actions.update}</Button>

                        }
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default EditCategory