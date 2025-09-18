import { Pages, Routes } from "@/constants/enums";
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

    const profileFields = (): IFormField[] => [
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
            label: translation.auth.phone.label,
            name: "phone",
            type: "number",
            placeholder: translation.auth.phone.placeholder
        },
        {
            label: translation.auth.streetAddress.label,
            name: "streetAddress",
            type: "text",
            placeholder: translation.auth.streetAddress.placeholder
        },
        {
            label: translation.auth.postalCode.label,
            name: "postalCode",
            type: "text",
            placeholder: translation.auth.postalCode.placeholder
        },
        {
            label: translation.auth.city.label,
            name: "city",
            type: "text",
            placeholder: translation.auth.city.placeholder
        },
        {
            label: translation.auth.country.label,
            name: "country",
            type: "text",
            placeholder: translation.auth.country.placeholder
        }
    ];

    const addProductFields = (): IFormField[] => [
        {
            label: translation.addProduct.name.label,
            name: "name",
            type: "text",
            placeholder: translation.addProduct.name.placeholder,
            autoFocus: true
        },
        {
            label: translation.addProduct.description.label,
            name: "description",
            type: "text",
            placeholder: translation.addProduct.description.placeholder
        },
        {
            label: translation.addProduct.price.label,
            name: "basePrice",
            type: "text",
            placeholder: translation.addProduct.price.placeholder
        }
    ];

    const getFormFields = (): IFormField[] => {
        switch (slug) {
            case Pages.LOGIN:
                return loginFields();
            case Pages.Register:
                return signupFields();
            case Routes.PROFILE:
                return profileFields();
            case `${Routes.ADMIN}/${Pages.MENU_ITEMS}`:
                return addProductFields();
            default:
                return [];
        }
    };

    return {
        getFormFields
    };
}

export default useFormFields;