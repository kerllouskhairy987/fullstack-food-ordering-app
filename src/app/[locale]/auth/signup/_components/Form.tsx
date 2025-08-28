"use client";

import FormFields from "@/components/form-field/FormFields";
import { Button } from "@/components/ui/button";
import Loader from "@/components/ui/Loader";
import { Pages, Routes } from "@/constants/enums";
import useFormFields from "@/hooks/useFormFields";
import { signup } from "@/server/_actions/auth";
import { ITranslations } from "@/types/translations";
import { validationErrors } from "@/validations/auth";
import { useParams, useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";


const initialState: {
    message?: string,
    error?: validationErrors,
    status?: number | null,
    formData?: FormData | null
} = {
    message: "",
    error: {},
    status: null,
    formData: null
}
const Form = ({ translation }: { translation: ITranslations }) => {

    const locale = useParams().locale;

    const router = useRouter();

    const [state, action, pending] = useActionState(signup, initialState);

    const { getFormFields } = useFormFields({ slug: Pages.Register, translation });

    useEffect(() => {
        if (state.status && state.message) {
            toast(state.message, {
                position: "top-center",
                className: state.status === 201 ? "!text-primary" : "!text-destructive"
            })
        }

        // redirect to login after signup
        if (state.status === 201) {
            router.replace(`/${locale}/${Routes.AUTH}/${Pages.LOGIN}`)
        }
    }, [state, state.status, state.message])

    return (
        <form action={action}>
            {
                getFormFields().map((field) => {
                    const valueField = state.formData?.get(field.name) as string;
                    return (
                        <div key={field.name} className="mb-3">
                            <FormFields {...field} error={state.error} defaultValue={valueField} />
                        </div>
                    )
                })
            }
            {
                pending
                    ? <Loader translation={translation} />
                    : <Button
                        className={`w-full`}
                        type="submit">
                        {translation.auth.register.submit}
                    </Button>
            }
        </form>
    )
}

export default Form