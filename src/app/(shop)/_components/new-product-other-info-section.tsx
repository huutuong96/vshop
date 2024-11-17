'use client'

import { CreateProductFormData } from "@/app/(shop)/_components/new-product-form";
import { changeProductSku } from "@/redux/slices/shop-new-product.slice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { useState } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";

export default function NewProductOtherInfoSection({ register, errors }: { register: UseFormRegister<CreateProductFormData>, errors: FieldErrors<CreateProductFormData> }) {
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const isConfirmCategories = useAppSelector(state => state.shopListProduct.category.isConfirmCategories);


  return (
    <div className="px-6 py-6 bg-white shadow rounded">
      <div className={`text-[20px] font-semibold mb-6 ${!isConfirmCategories && 'text-gray-400'}`}>Thông tin khác</div>
      {isConfirmCategories ? (
        <>
          <div className="w-full flex mb-6">
            <div>
              <div className="w-[144px] h-10 mr-6 flex justify-end items-center gap-1">
                <span className="text-[12px] text-blue-700">*</span>
                <div className="text-[14px] h-full font-medium flex items-center">SKU sản phẩm</div>
              </div>
            </div>
            <div className="w-full">
              <div className={`h-10 w-[400px] px-3 border rounded-sm flex ${isFocus ? 'border-black shadow-sm' : ''}`}>
                <input
                  {...register('sku')}
                  className="h-full w-full outline-none text-[14px]" placeholder="-"
                />
              </div>
              {errors.sku && <p className="text-sm text-red-500 mt-1 ">{errors.sku.message}</p>}
            </div>
          </div>

        </>
      ) : (
        <div className={`-mt-2 text-[14px] ${!isConfirmCategories && 'text-gray-400'}`}>Có thể điều chỉnh sau khi chọn ngành hàng</div>
      )}
    </div>
  )
}
