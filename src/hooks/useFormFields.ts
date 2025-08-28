import { Pages } from "@/constants/enums";
import { IFormField, IFormFieldsVariables } from "@/types/app";
import { ITranslations } from "@/types/translations";

interface IProps extends IFormFieldsVariables {
    translation: ITranslations;
}

const useFormFields = ({ slug, translation }: IProps) => {
    const loginFields = (): IFormField[] => [
        {
            label: translation.auth.email.label,
            name: "email",
            type: "email",
            placeholder: translation.auth.email.placeholder,
            autoFocus: true,
        },
        {
            label: translation.auth.password.label,
            name: "password",
            type: "password",
            placeholder: translation.auth.password.placeholder,
        },
    ];

    const signupFields = (): IFormField[] => [
        {
            label: translation.auth.name.label,
            name: "name",
            type: "text",
            placeholder: translation.auth.name.placeholder,
            autoFocus: true
        },
        {
            label: translation.auth.email.label,
            name: "email",
            type: "email",
            placeholder: translation.auth.email.placeholder,
        },
        {
            label: translation.auth.password.label,
            name: "password",
            type: "password",
            placeholder: translation.auth.password.placeholder,
        },
        {
            label: translation.auth.confirmPassword.label,
            name: "confirmPassword",
            type: "password",
            placeholder: translation.auth.confirmPassword.placeholder,
        }
    ];

    const getFormFields = (): IFormField[] => {
        switch (slug) {
            case Pages.LOGIN:
                return loginFields();
            case Pages.Register:
                return signupFields();
            default:
                return [];
        }
    };

    return {
        getFormFields
    };
}

export default useFormFields;