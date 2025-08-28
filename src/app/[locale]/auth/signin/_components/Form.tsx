"use client";

import FormFields from "@/components/form-field/FormFields";
import { Button } from "@/components/ui/button"
import { Pages, Routes } from "@/constants/enums"
import useFormFields from "@/hooks/useFormFields"
import { IFormField } from "@/types/app";
import { useRef, useState } from "react";
import { signIn } from "next-auth/react"
import { toast } from "sonner"
import { ITranslations } from "@/types/translations";
import Loader from "@/components/ui/Loader";
import { useParams, useRouter } from "next/navigation";

const Form = ({ translation }: { translation: ITranslations }) => {

    const formRef = useRef<HTMLFormElement>(null);
    const [error, setError] = useState({})
    const [loading, setLoading] = useState(false)
    const router = useRouter();
    const locale = useParams().locale;

    const { getFormFields } = useFormFields({ slug: Pages.LOGIN, translation });

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!formRef.current) return;
        const formData = new FormData(formRef.current);
        const data: Record<string, string> = {};
        formData.forEach((value, key) => {
            data[key] = value.toString();
        });
        console.log(data)

        try {
            setLoading(true);
            const res = await signIn("credentials", {
                email: data.email,
                password: data.password,
                redirect: false,
            })

            if (res?.error) {
                const validationError = JSON.parse(res?.error).validationError;
                setError(validationError)
                const responseError = JSON.parse(res?.error).responseError;
                if (responseError) {
                    toast.error(responseError, {
                        position: "top-center",
                        className: "capitalize !text-destructive"
                    })
                }
            }

            if (res?.ok) {
                toast.success(translation.messages.loginSuccessful, {
                    position: "bottom-center",
                    className: "capitalize"
                })
                // redirect to profile or admin dashboard
                router.replace(`/${locale}/${Routes.PROFILE}`)
            }

        } catch (error) {
            setLoading(false)
            console.log(error)
        } finally {
            setLoading(false)
        }


    }
    return (
        <form onSubmit={(onSubmit)} ref={formRef}>
            {
                getFormFields().map((field: IFormField) => (
                    <div key={field.name} className="mb-3">
                        <FormFields {...field} error={error} />
                    </div>
                ))
            }
            {
                loading
                    ? <Loader translation={translation} />
                    : <Button
                        className={`w-full`}
                        type="submit">
                        {translation.auth.login.submit}
                    </Button>
            }
        </form>
    )
}

export default Form