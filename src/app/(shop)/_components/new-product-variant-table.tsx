'use client'

import { FormData } from "@/app/(shop)/_components/new-product-variant-with-variant-part-test-v2";
import { changeInputInStockVariantProduct, changeInputPriceVariantProduct, changeInputSkuVariantProduct, VariantItem } from "@/redux/slices/shop-new-product.slice";
import { useAppDispatch, useAppSelector } from "@/redux/store"
import { Image } from "lucide-react";
import { FormEvent, useEffect } from "react";
import { Control, Controller, FieldErrors, UseFormRegister } from "react-hook-form";

export default function NewProductVariantTable({ variantProducts, variantItems, control, errros, register }: { variantProducts: FormData['variantProducts'], variantItems: FormData['variantItems'], control: Control<FormData, any>, errros: FieldErrors<FormData>, register: UseFormRegister<FormData> }) {

  useEffect(() => {

  }, [variantProducts])

  return (
    <div className="w-full">
      <div className='w-full flex'>
        <table className="w-full">
          <thead>
            <tr>
              <td className="h-20 w-[120px]">
                <div className="h-full w-full p-3 flex items-center justify-center text-[14px] text-center">ảnh</div>
              </td>
              {variantItems.map((item, index) => (
                <td key={index} className="h-20 w-[120px]">
                  <div className="h-full w-full p-3 flex items-center justify-center text-[14px] text-center">{item.name || `Nhóm phân loại ${index + 1}`}</div>
                </td>
              ))}
              <td className="h-20 w-[120px]">
                <div className="h-full w-full p-3 flex items-center justify-center text-[14px] text-center">Giá</div>
              </td>
              <td className="h-20 w-[120px]">
                <div className="h-full w-full p-3 flex items-center justify-center text-[14px] text-center">Kho hàng</div>
              </td>
              <td className="h-20 w-[120px]">
                <div className="h-full w-full p-3 flex items-center justify-center text-[14px] text-center">SKU phân loại</div>
              </td>
            </tr>
          </thead>
          <tbody>
            {variantProducts.map((item, index) => (
              <tr key={index}>
                <td className="h-20 w-[120px]">
                  <div className="h-full w-full p-3 flex items-center justify-center text-[14px] text-center">
                    {item.image ? (
                      <img className="size-12" src={item.image} alt="" />
                    ) : (
                      <Image strokeWidth={1.25} className="size-8" />
                    )}
                  </div>
                </td>
                {item.variants.map(it => (
                  <td key={it.value} className="w-[120px]">
                    <div className="px-4 py-6 flex items-center justify-center text-[14px]">{it.value}</div>
                  </td>
                ))}
                <td className="">
                  <div className="px-4 py-6 flex items-center justify-center text-[14px]">
                    <div className="border w-56 h-8 px-3 py-1 flex rounded">
                      <div className="flex items-center text-[12px] pr-2 text-gray-400">
                        ₫
                        <div className="ml-2 border-r h-full"></div>
                      </div>
                      <input
                        {...register(`variantProducts.${index}.price`, { valueAsNumber: true })}
                        type="number"
                        className="w-full h-full outline-none text-[14px]" placeholder="Giá"
                      />
                    </div>
                  </div>
                  {(errros?.variantProducts && errros?.variantProducts[index]?.price?.message) && (
                    <span className="text-sm text-red-500">{errros?.variantProducts[index]?.price.message}</span>
                  )}
                </td>
                <td className="">
                  <div className="px-4 py-6 flex items-center justify-center text-[14px]">
                    <div className="border w-56 h-8 px-3 py-1 flex rounded">
                      <input
                        {...register(`variantProducts.${index}.stock`, { valueAsNumber: true })}
                        className="w-full h-full outline-none text-[14px]" placeholder="Kho hàng"
                      />
                    </div>
                  </div>
                  {(errros?.variantProducts && errros?.variantProducts[index]?.stock?.message) && (
                    <span className="text-sm text-red-500">{errros?.variantProducts[index]?.stock.message}</span>
                  )}
                </td>
                <td className="">
                  <div className="px-4 py-6 flex items-center justify-center text-[14px]">
                    <div className="border w-56 h-8 px-3 py-1 flex rounded">

                      <input
                        {...register(`variantProducts.${index}.sku`)}
                        className="w-full h-full outline-none text-[14px]" placeholder="sku"
                      />
                    </div>
                  </div>
                  {(errros?.variantProducts && errros?.variantProducts[index]?.sku?.message) && (
                    <span className="text-sm text-red-500">{errros?.variantProducts[index]?.sku.message}</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
