export interface ITranslations {
    logo: string;
    home: {
        hero: {
            heroTitle: string;
            heroDes: string;
            buttons: {
                orderNow: string;
                learnMore: string;
            };
        };
        bestSellers: {
            subTitle: string;
            title: string;
            noBestSellers: string;
        };
        about: {
            subTitle: string;
            title: string;
            descOne: string;
            descTwo: string;
            descThree: string;
        };
        contact: {
            subTitle: string;
            title: string;
            phone: string;
        };
    };
    navLinks: {
        home: string;
        menu: string;
        about: string;
        contact: string;
        login: string;
        profile: string;
        admin: string;
    };
    validation: {
        nameRequired: string;
        validEmail: string;
        validPassword: string;
        confirmPasswordRequired: string;
        passwordMismatch: string;
    };
    messages: {
        userNotFound: string;
        incorrectPassword: string;
        loginSuccessful: string;
        unexpectedError: string;
        userAlreadyExists: string;
        accountCreated: string;
        updateProfileSucess: string;
        categoryAdded: string;
        updatecategorySucess: string;
        deleteCategorySucess: string;
        productAdded: string;
        updateProductSucess: string;
        deleteProductSucess: string;
        updateUserSucess: string;
        deleteUserSucess: string;
    };
    auth: {
        loading: string,
        login: {
            title: string,
            submit: string,
            noHaveAccount: string,
            noHaveAccountLink: string,
        },
        register: {
            title: string,
            submit: string,
            haveAccount: string,
            haveAccountLink: string,
        },
        logout: {
            submit: string,
        },
        name: {
            label: string,
            placeholder: string,
        },
        email: {
            label: string,
            placeholder: string,
        },
        password: {
            label: string,
            placeholder: string,
        },
        confirmPassword: {
            label: string,
            placeholder: string,
        }
    },
    footer: {
        copyRight: string;
    };
}
