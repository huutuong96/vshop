'use client'

import { CreateProductFormData } from "@/app/(shop)/_components/new-product-form";
import NewProductVariantWithVariantPart from "@/app/(shop)/_components/new-product-variant-with-variant-part";
import NewProductVariantWithVariantPartTest from "@/app/(shop)/_components/new-product-variant-with-variant-part-test";
import NewProductVariantWithVariantPartTestV2 from "@/app/(shop)/_components/new-product-variant-with-variant-part-test-v2";
import NewProductVariantWithoutVariantPart from "@/app/(shop)/_components/new-product-variant-without-variant-part";
import { useAppSelector } from "@/redux/store"
import { Plus } from "lucide-react";
import { useState } from "react";
import { FieldErrors, UseFormRegister, UseFormSetError, UseFormSetValue } from "react-hook-form";

export default function NewProductVariantSection({ handleVariant, register, setError, errors, setValue }: {
  handleVariant: (data: any) => void,
  register: UseFormRegister<CreateProductFormData>
  setError: UseFormSetError<CreateProductFormData>
  errors: FieldErrors<CreateProductFormData>
  setValue: UseFormSetValue<CreateProductFormData>
}) {
  const isConfirmCategories = useAppSelector(state => state.shopListProduct.category.isConfirmCategories);
  // const isConfirmCategories = true;
  const isChangeVariantMode = useAppSelector(state => state.shopListProduct.varriant.isChangeVariantMode);


  return (
    <div className="px-6 py-6 bg-white shadow rounded">
      <div className={`text-[20px] font-semibold mb-6 ${!isConfirmCategories && 'text-gray-400'}`}>Thông tin bán hàng</div>
      {isConfirmCategories && (
        <div>
          {!isChangeVariantMode && (<NewProductVariantWithoutVariantPart setValue={setValue} errors={errors} setError={setError} register={register} />)}
          {isChangeVariantMode && (
            <NewProductVariantWithVariantPartTestV2 setErrorProduct={setError} setValueProduct={setValue} handleVariant={handleVariant} />
          )}
        </div>
      )}
      {!isConfirmCategories && (
        <div className={`-mt-2 text-[14px] ${!isConfirmCategories && 'text-gray-400'}`}>Có thể điều chỉnh sau khi chọn ngành hàng</div>
      )}
      {errors.variant && <p className="text-sm text-red-500 ml-[102px] mt-1">{errors.variant.message?.toString()}</p>}
    </div>
  )
}
