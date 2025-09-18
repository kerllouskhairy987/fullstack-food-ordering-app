"use client";

import { InputTypes, Routes } from "@/constants/enums"
import useFormFields from "@/hooks/useFormFields"
import { ITranslations } from "@/types/translations"
import FormFields from "../form-field/FormFields";
import Image from "next/image";
import { User, UserRole } from "../../../generated/prisma";
import { IFormField } from "@/types/app";
import { Button } from "../ui/button";
import Checkbox from "../form-field/Checkbox";
import { useActionState, useEffect, useState } from "react";
import Loader from "../ui/Loader";
import { validationErrors } from "@/validations/auth";
import { updateProfile } from "./actions/profile";
import { CameraIcon } from "lucide-react";
import { toast } from "sonner";
import { useSession } from "next-auth/react";

const EditUserForm = ({ translation, user }: { translation: ITranslations, user: User }) => {

    const formData = new FormData();
    Object.entries(user).forEach(([key, value]) => {
        if (value !== null && value !== undefined && key !== "image") {
            formData.append(key, value.toString());
        }
    })
    const initialState: {
        message?: string;
        error?: validationErrors;
        status?: number | null;
        formData?: FormData | null;
    } = {
        message: "",
        error: {},
        status: null,
        formData
    }

    const [selectedImage, setSelectedImage] = useState(user.image ?? "");

    const session = useSession();

    const [isAdmin, setIsAdmin] = useState(user.role === UserRole.ADMIN);

    const [state, action, pending] = useActionState(updateProfile.bind(null, isAdmin), initialState)

    const { getFormFields } = useFormFields({ slug: Routes.PROFILE, translation })

    useEffect(() => {
        if (state.message && state.status && !pending) {
            toast(state.message, {
                className: state.status === 200 ? "text-green-500" : "text-red-500"
            })
        }
    }, [state.message, state.status, pending])

    // revalidate image 
    useEffect(() => {
        setSelectedImage(user.image as string)
    }, [user.image])

    return (
        <form action={action} className="flex flex-col sm:flex-row gap-5">
            <div className="group mx-auto relative w-[200px] h-[200px]">
                {
                    selectedImage &&
                    <Image src={selectedImage} alt={user.name} fill
                        className="rounded-full border object-cover"
                    />
                }
                <div className={`${selectedImage
                    ? "group:hover:opacity-[1] w-full h-full rounded-full border object-cover"
                    : "opacity-[1] w-full h-full rounded-full border object-cover"
                    }
                    absolute top-0 left-0 w-full h-full bg-primary/50 rounded-full border object-cover opacity-0 transition-all duration-300 ease-in-out hover:opacity-[1]`
                }>
                    <UploadImage setSelectedImage={setSelectedImage} />
                </div>
            </div>
            <div className="grow">
                <div className="flex flex-col gap-5">
                    {
                        getFormFields().map((field: IFormField) => {
                            const fieldValue =
                                state?.formData?.get(field.name) ?? formData.get(field.name);
                            return (
                                <FormFields key={field.name} {...field} error={state?.error}
                                    defaultValue={fieldValue as string}
                                    readOnly={field.name === InputTypes.EMAIL}
                                />
                            )
                        })
                    }

                    {
                        session.data?.user.role === UserRole.ADMIN && (
                            <div className="flex items-center gap-2">
                                <Checkbox
                                    onClick={() => setIsAdmin(!isAdmin)}
                                    checked={isAdmin}
                                    name="admin"
                                    label="Admin"
                                />
                            </div>
                        )
                    }

                    {
                        pending
                            ? <Loader translation={translation} />
                            : <Button type="submit"> {translation.auth.profile.submitTxt}</Button>
                    }
                </div>

            </div>
        </form>
    )
}

export default EditUserForm;

const UploadImage = ({ setSelectedImage }: { setSelectedImage: React.Dispatch<React.SetStateAction<string>> }) => {
    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setSelectedImage(url);
        }
    }
    return (
        <>
            <input
                type="file"
                onChange={onChangeHandler}
                accept="image/*"
                className="hidden"
                id="image-upload"
                name="image"
            />
            <label
                htmlFor="image-upload"
                className="rounded-full border w-[200px] h-[200px] flex items-center justify-center text-accent-foreground/50 hover:text-primary cursor-pointer"
            > <CameraIcon /> </label>
        </>
    )
}