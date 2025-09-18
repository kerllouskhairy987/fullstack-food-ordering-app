import * as React from "react"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { ITranslations } from "@/types/translations"
import { Category } from "../../../../../../generated/prisma"
import { Label } from "@/components/ui/label"

type TProps = {
    categoryId: string
    setCategoryId: React.Dispatch<React.SetStateAction<string>>
    categories: Category[],
    translation: ITranslations
}
function SelectCategory({ categoryId, setCategoryId, categories, translation }: TProps) {
    const currentValue = categories.find((category) => category.id === categoryId);
    return (
        <div className="flex flex-col gap-2">
            <Label htmlFor="categoryId" className="text-accent-foreground/50">{translation.category.name}</Label>

            <Select
                name="categoryId"
                onValueChange={(value) => {
                    setCategoryId(value)
                }}
                defaultValue={categoryId}
            >
                <SelectTrigger className="w-[180px]">
                    <SelectValue>{currentValue?.name}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        {
                            categories.map((category) => (
                                <SelectItem
                                    key={category.id}
                                    value={category.id}
                                    onClick={() => setCategoryId(category.id)}
                                >
                                    {category.name}
                                </SelectItem>
                            ))
                        }
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    )
}

export default SelectCategory