import { InputTypes } from "@/constants/enums";
import { IFormField } from "@/types/app";
import TextField from "./TextField";
import PasswordField from "./PasswordField";
import Checkbox from "./Checkbox";
import { validationErrors } from "@/validations/auth";

interface Props extends IFormField {
    error: validationErrors;
}

const FormFields = (props: Props) => {
    const { type } = props;

    const renderField = (): React.ReactNode => {
        if (type === InputTypes.EMAIL || type === InputTypes.TEXT) {
            return <TextField {...props} />;
        }

        if (type === InputTypes.PASSWORD) {
            return <PasswordField {...props} />;
        }

        if (type === InputTypes.CHECKBOX) {
            return <Checkbox checked={true} {...props} />;
        }

        return <TextField {...props} />;
    };

    return <>{renderField()}</>;
};

export default FormFields;