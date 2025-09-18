"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Loader from "@/components/ui/Loader";
import { ITranslations } from "@/types/translations";
import { validationErrors } from "@/validations/auth";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { addCategory } from "../_actions/category";


type InitialState = {
    message?: string,
    error?: validationErrors,
    status?: number | null,
}
const initialState: InitialState = {
    message: "",
    error: {},
    status: null,
}
const Form = ({ translations }: { translations: ITranslations }) => {

    const [state, action, pending] = useActionState(addCategory, initialState);

    useEffect(() => {
        if (state.status && state.message) {
            toast(state.message, {
                position: "bottom-center",
                className: state.status === 201 ? "!text-primary" : "!text-destructive"
            })
        }
    }, [state, state.status, state.message])

    return (
        <form action={action} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
                <Label htmlFor="name">{translations.createCategory.title}</Label>
                <Input type="text" id="name" name="name" placeholder={translations.createCategory.placeholder} />
                {
                    state.error?.name
                    && <p className="text-destructive mt-2 text-sm font-medium">{state.error.name}</p>
                }
            </div>
            {
                pending
                    ? <Loader translation={translations} />
                    : <Button type="submit" disabled={pending}>{translations.createCategory.submit}</Button>
            }

        </form>
    )
}

export default Form