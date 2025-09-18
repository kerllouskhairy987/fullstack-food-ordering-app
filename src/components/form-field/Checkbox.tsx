import { IFormField } from "@/types/app";
import { Label } from "../ui/label";
import { Checkbox as ShadCnCheckbox } from "../ui/checkbox";
import { validationErrors } from "@/validations/auth";

interface Props  {
    onClick?: () => void
    checked: boolean
    label: IFormField["label"]
    name: IFormField["name"]
}

const Checkbox = ({ label, name, checked, onClick }: Props) => {
    return (
        <div className="text-accent flex items-center gap-2 cursor-pointer">
            <ShadCnCheckbox
                type="button"
                id={name}
                name={name}
                onClick={onClick}
                checked={checked}
            />
            <Label htmlFor={name} className="text-sm font-normal text-accent-foreground">
                {label}
            </Label>
        </div>
    );
};

export default Checkbox;