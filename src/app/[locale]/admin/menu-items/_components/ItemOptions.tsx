// eslint-disable-next-line @typescript-eslint/no-explicit-any

import { Button } from "@/components/ui/button"
import { ITranslations } from "@/types/translations"
import { Extra, ExtraIngredients, ProductSizes, Size } from "@prisma/client"
import { Plus, Trash } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useParams } from "next/navigation"
import { Languages } from "@/constants/enums"

export enum ItemOptionsKeys {
    SIZES,
    EXTRAS
}

const sizesNames = [
    ProductSizes.SMALL,
    ProductSizes.MEDIUM,
    ProductSizes.LARGE
]

const extrasNames = [
    ExtraIngredients.BACON,
    ExtraIngredients.CHEESE,
    ExtraIngredients.ONION,
    ExtraIngredients.PEPPER,
    ExtraIngredients.TOMATO
]

function handleOptions(
    setState:
        | React.Dispatch<React.SetStateAction<Partial<Size>[]>>
        | React.Dispatch<React.SetStateAction<Partial<Extra>[]>>
) {
    // Add Options
    const addOptions = () => {
        setState((prev: any) => {
            return [...prev, { name: "", price: 0 }]
        })
    }

    // Handle Change Item From Select
    const onChange = (
        e: React.ChangeEvent<HTMLSelectElement>,
        index: number,
        fieldName: string
    ) => {
        const newValue = e.target.value;
        setState((prev: any) => {
            const newSizes = [...prev];
            newSizes[index][fieldName] = newValue;
            return newSizes;
        })
    }

    // Handle Remove Option
    const removeOption = (indexToRemove: number) => {
        setState((prev: any) => {
            return prev.filter((_: any, index: number) => index !== indexToRemove)
        })
    }

    return { addOptions, onChange, removeOption }

}

const ItemOptions = (
    { state, setState, translation, optionsKey }
        : {
            state:
            | Partial<Size>[]
            | Partial<Extra>[],
            setState:
            | React.Dispatch<React.SetStateAction<Partial<Size>[]>>
            | React.Dispatch<React.SetStateAction<Partial<Extra>[]>>,
            translation: ITranslations,
            optionsKey: ItemOptionsKeys
        }) => {

    const { addOptions, onChange, removeOption } = handleOptions(setState)

    const ifThereAvailableOptions = () => {
        switch (optionsKey) {
            case ItemOptionsKeys.SIZES:
                return sizesNames.length > state.length;
            case ItemOptionsKeys.EXTRAS:
                return extrasNames.length > state.length;
        }
    }

    return (
        <>
            {
                state.length > 0 && state.map((option, index) => (
                    <div key={option.id} className="flex items-end gap-3">
                        <div className="flex flex-col gap-2">
                            <Label>Name</Label>
                            <SelectName
                                item={option}
                                index={index}
                                onChange={onChange}
                                currentState={state}
                                optionKey={optionsKey}
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <Label>Extra Price</Label>
                            <Input
                                name="price" type="number" placeholder="0"
                                value={option.price ? option.price : 0}
                                onChange={(e) => onChange(e as any, index, "price")}
                                min={0} />
                        </div>

                        <Button type="button" variant={"destructive"} onClick={removeOption.bind(null, index)}>
                            <Trash />
                        </Button>

                    </div>
                ))
            }
            {
                ifThereAvailableOptions() &&
                <Button type="button" onClick={addOptions}>
                    <Plus />
                    {
                        optionsKey === ItemOptionsKeys.SIZES
                            ? translation.addProduct.sizes.actions.add
                            : translation.addProduct.extras.actions.add
                    }
                </Button>
            }
        </>
    )
}

export default ItemOptions

const SelectName = (
    { index,
        onChange,
        item,
        currentState,
        optionKey
    }:
        {
            index: number;
            onChange: (e: React.ChangeEvent<HTMLSelectElement>, index: number, fieldName: string) => void;
            item: Partial<Size> | Partial<Extra>;
            currentState: Partial<Size>[] | Partial<Extra>[];
            optionKey: ItemOptionsKeys
        }
) => {
    const { locale } = useParams()

    // Remove Selected Names From Current Names && Remove Selected Extra From Current Extras
    const getNames = () => {
        switch (optionKey) {
            case ItemOptionsKeys.SIZES:
                const filteredSizes = sizesNames.filter(
                    (size) => !currentState.some((s) => s.name === size)
                )
                return filteredSizes
            case ItemOptionsKeys.EXTRAS:
                const filteredExtras = extrasNames.filter(
                    (extra) => !currentState.some((e) => e.name === extra)
                )
                return filteredExtras
        }
    }

    const names = getNames()

    return (
        <Select
            defaultValue={item.name ? item.name : "select ..."}
            onValueChange={(value) => {
                onChange({ target: { value } } as React.ChangeEvent<HTMLSelectElement>, index, "name")
            }}
        >
            <SelectTrigger
                className={`focus:ring-0 w-[110px]
                    ${locale === Languages.ARABIC ? "flex-wrap-reverse" : "flex-row"}
                `}
            >
                <SelectValue>{item.name ? item.name : "select ..."}</SelectValue>
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {
                        names.map((name, idx) => (
                            <SelectItem key={idx} value={name}>{name}</SelectItem>
                        ))
                    }
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}