"use client";

import FormFields from "@/components/form-field/FormFields";
import { Button, buttonVariants } from "@/components/ui/button";
import { Pages, Routes } from "@/constants/enums";
import useFormFields from "@/hooks/useFormFields";
import { IFormField } from "@/types/app";
import { ITranslations } from "@/types/translations";
import { CameraIcon } from "lucide-react";
import Image from "next/image";
import { useActionState, useEffect, useState } from "react";
import SelectCategory from "./SelectCategory";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

import { Category, Extra, Size } from "@prisma/client"
import ItemOptions, { ItemOptionsKeys } from "./ItemOptions";
import Link from "@/components/link";
import { redirect, useParams } from "next/navigation";
import { validationErrors } from "@/validations/auth";
import { addProduct, deleteProduct, updateProduct } from "../_actions/product";
import Loader from "@/components/ui/Loader";
import { toast } from "sonner";
import { ProductWithRelations } from "@/types/product";

const Form = (
  { categories, translation, product }
    : { categories: Category[], translation: ITranslations, product?: ProductWithRelations }
) => {

  const { locale } = useParams()

  const [selectedImage, setSelectedImage] = useState(product ? product.image : "");

  const [categoryId, setCategoryId] = useState(
    product ? product.categoryId : categories[0].id
  );

  const [sizes, setSizes] = useState<Partial<Size>[]>(
    product ? product.sizes : []
  );

  const [extras, setExtras] = useState<Partial<Extra>[]>(
    product ? product.extras : []
  );

  const { getFormFields } = useFormFields({ slug: `${Routes.ADMIN}/${Pages.MENU_ITEMS}`, translation })

  const formData = new FormData();

  Object.entries(product ?? {}).forEach(([key, value]) => {
    if (value !== null && value !== undefined && key !== "image") {
      formData.append(key, value.toString());
    }
  });

  const initialState: {
    message?: string,
    error?: validationErrors,
    status?: number | null,
    formData?: FormData | null
  } = {
    message: "",
    error: {},
    status: null,
    formData: null
  }
  const [state, action, pending] = useActionState(
    product
      ? updateProduct.bind(null, { productId: product.id, options: { sizes, extras } })
      : addProduct.bind(null, { categoryId, options: { sizes, extras } })
    , initialState
  );

  console.log('00000000', state)

  useEffect(() => {
    if (state.status && state.message && !pending) {
      toast(state.message, {
        position: "bottom-center",
        className: state.status === 201 || state.status === 200 ? "!text-primary" : "!text-destructive"
      });

      // reset form
      // setSelectedImage("");
      // setCategoryId(categories[0].id);
      // setSizes([]);
      // setExtras([]);

      // redirect to menuItems page
      redirect(`/${locale}/${Routes.ADMIN}/${Pages.MENU_ITEMS}`)
    }
  }, [state?.status, state?.message, pending])

  return (
    <form action={action} className="flex flex-col sm:flex-row sm:justify-between gap-5">
      <div className="flex flex-col gap-2">
        <UploadImage selectedImage={selectedImage} setSelectedImage={setSelectedImage} />
        {
          state.error?.image
          && <p className="text-destructive mt-2 text-sm text-center font-medium">{state.error.image}</p>
        }
      </div>
      <div className="flex-1 flex flex-col gap-4">
        {
          getFormFields().map((field: IFormField) => {
            const fieldValue =
              state.formData?.get(field.name) ?? formData.get(field.name)
            return (
              <FormFields key={field.name} {...field} error={state?.error} defaultValue={fieldValue as string} />
            )
          })
        }

        <SelectCategory
          categoryId={categoryId}
          setCategoryId={setCategoryId}
          categories={categories}
          translation={translation}
        />

        <AddSizes
          translation={translation}
          sizes={sizes}
          setSizes={setSizes}
        />

        <AddExtras
          translation={translation}
          extras={extras}
          setExtras={setExtras}
        />
        <FormActions pending={pending} translation={translation} product={product} />
      </div>
    </form>
  )
}

export default Form;

const UploadImage = ({ selectedImage, setSelectedImage }: { selectedImage: string, setSelectedImage: React.Dispatch<React.SetStateAction<string>> }) => {
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setSelectedImage(url);
    }
  }
  return (
    <div className="group mx-auto relative w-[200px] h-[200px]">
      {
        selectedImage && (
          <Image src={selectedImage} alt="Upload Product Image" fill
            className="rounded-full border object-cover"
          />
        )
      }
      <div className={`${selectedImage
        ? "group:hover:opacity-[1] opacity-0 w-full h-full rounded-full border object-cover"
        : "opacity-[1] w-full h-full rounded-full border object-cover"
        } absolute top-0 left-0 w-full h-full bg-primary/50 rounded-full border object-cover transition-all duration-300 ease-in-out hover:opacity-[1]`
      }>
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
      </div>
    </div>
  )
}

const FormActions = (
  { pending, translation, product }
    : { pending: boolean, translation: ITranslations, product?: ProductWithRelations }
) => {

  const { locale } = useParams()

  const [state, setState] = useState<{
    pending: boolean,
    status: number | null,
    message: string
  }>({
    pending: false,
    status: null,
    message: ""
  })

  // Handle Delete Function
  const handleDelete = async (id: string) => {
    console.log('ID', id)
    try {
      setState((prev) => { return { ...prev, pending: true } })
      const res = await deleteProduct(id)
      setState((prev) => {
        return {
          ...prev,
          status: res.status,
          message: res.message
        }
      })
      console.log(res)
    } catch (error) {
      console.log(error)
    } finally {
      setState((prev) => { return { ...prev, pending: false } })
    }
  }

  useEffect(() => {
    if (state.status && state.message && !state.pending) {
      toast(state.message, {
        position: "bottom-center",
        className: state.status === 200 ? "!text-primary" : "!text-destructive"
      })
    }
  }, [state.status, state.message, state.pending])

  return (
    <div className="flex items-center justify-center gap-5">
      {
        pending
          ? <Loader translation={translation} className="flex-1" />
          : <Button disabled={pending} type="submit" className="flex-1">
            {
              product
                ? translation.addProduct.actions.update
                : translation.addProduct.actions.create
            }
          </Button>
      }
      {
        product && (
          state.pending
            ? <Loader translation={translation} className="flex-1" />
            : <Button
              onClick={() => handleDelete(product.id)}
              disabled={state.pending}
              type="button"
              variant={"destructive"}
              className="flex-1"
            >
              {translation.addProduct.actions.delete}
            </Button>
        )
      }
      <Link
        href={`/${locale}/${Routes.ADMIN}/${Pages.MENU_ITEMS}`}
        className={`${buttonVariants({ variant: "outline" })} w-fit ms-auto flex-1`}
      >
        {translation.addProduct.actions.cancel}
      </Link>
    </div>
  )
}

const AddSizes = (
  { sizes, setSizes, translation }:
    { sizes: Partial<Size>[], setSizes: React.Dispatch<React.SetStateAction<Partial<Size>[]>>, translation: ITranslations }) => {
  return (
    <Accordion
      type="single"
      collapsible
      className="w-[300px] p-3 rounded-md bg-primary/10"
      defaultValue="item-1"
    >
      <AccordionItem value="item-2">
        <AccordionTrigger
          className="text-accent-foreground/50 hover:decoration-0"
        >{translation.addProduct.sizes.name}</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance">
          <ItemOptions translation={translation} state={sizes} setState={setSizes} optionsKey={ItemOptionsKeys.SIZES} />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

const AddExtras = (
  { extras, setExtras, translation }:
    {
      extras: Partial<Extra>[],
      setExtras: React.Dispatch<React.SetStateAction<Partial<Extra>[]>>,
      translation: ITranslations
    }) => {
  return (
    <Accordion
      type="single"
      collapsible
      className="w-[300px] p-3 rounded-md bg-primary/10"
      defaultValue="item-1"
    >
      <AccordionItem value="item-2">
        <AccordionTrigger
          className="text-accent-foreground/50 hover:decoration-0"
        >{translation.addProduct.extras.name}</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance">
          <ItemOptions translation={translation} state={extras} setState={setExtras} optionsKey={ItemOptionsKeys.EXTRAS} />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
