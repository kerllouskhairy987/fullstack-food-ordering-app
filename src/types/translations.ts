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
        descriptionRequired: string;
        basePriceRequired: string;
        categoryRequired: string;
        imageRequired: string;
        validEmail: string;
        validPassword: string;
        confirmPasswordRequired: string;
        passwordMismatch: string;
        inValidPhoneNumber: string;
        inValidPostalCode: string;
    };
    adminTabs: {
        profile: string;
        categories: string;
        menuItems: string;
        orders: string;
        users: string;
    },
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
        noCategoriesFound: string;
    };
    category: {
        name: string
        table: {
            title: string
            head: {
                name: string
                actions: string
            }
        }
        total: string
        edit: {
            title: string
            description: string
            actions: {
                update: string
                cancel: string
            }
        },
        delete: {
            title: string
            description: string
            actions: {
                delete: string
                cancel: string
            }
        }
    },
    addProduct: {
        title: string,
        name: {
            label: string
            placeholder: string
        },
        description: {
            label: string
            placeholder: string
        },
        price: {
            label: string
            placeholder: string
        },
        sizes: {
            name: string
            actions: {
                add: string
            }
        },
        extras: {
            name: string,
            actions: {
                add: string
            }
        },


        actions: {
            create: string;
            cancel: string;
            update: string;
            delete: string;
        }
    },
    createCategory: {
        title: string;
        placeholder: string;
        submit: string;
    },
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
        },
        phone: {
            label: string;
            placeholder: string;
        },
        streetAddress: {
            label: string;
            placeholder: string;
        },
        postalCode: {
            label: string;
            placeholder: string;
        },
        city: {
            label: string;
            placeholder: string;
        },
        country: {
            label: string;
            placeholder: string;
        },
        profile: {
            submitTxt: string
        }
    },
    footer: {
        copyRight: string;
    };
}
