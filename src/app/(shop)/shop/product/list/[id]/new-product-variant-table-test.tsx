'use client'
import { Image } from 'lucide-react'
import './table.css'
import { Controller, UseFormReturn } from 'react-hook-form'
import { Product } from '@/app/(shop)/shop/product/new/new-product-test-form'
import { useEffect, useState } from 'react'
import { useFieldArray, UseFieldArrayReturn, useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod'

const FromDataSchema = z.object({
  price: z.coerce.number(),
  stock: z.coerce.number(),
  sku: z.string(),
});

type FormData = z.infer<typeof FromDataSchema>;

export default function NewProductVariantTableTest1({ variantProductFields, productFormHandle, variantAttributes }: {
  variantProductFields: any,
  productFormHandle: any,
  variantAttributes: any
}) {

  const { control, register, getValues, formState: { errors }, trigger, reset } = useForm<FormData>({
    resolver: zodResolver(FromDataSchema),
    defaultValues: {
    },
    mode: "all"
  });


  const handleChangeAllValueVariantProduct = () => {
    const a = productFormHandle.getValues('variant.variantProducts').map((p: any) => ({
      ...p,
      price: getValues('price'),
      stock: getValues('stock'),
      sku: getValues('sku')
    }));
    productFormHandle.setValue('variant.variantProducts', [...a]);
  }

  console.log(variantProductFields);


  return (
    <>
      {productFormHandle.getValues('variant')?.variantProducts && (
        <>
          <div className="w-full flex mb-4">
            <div className="flex h-8">
              <div className={`border  w-56 h-full px-3 py-1 flex rounded-tl rounded-bl `}>
                <div className="flex items-center text-[12px] pr-2">
                  ₫
                  <div className="ml-2 border-r h-full"></div>
                </div>
                <input
                  {...register('price', { valueAsNumber: true })}
                  type='number'
                  className="w-full h-full outline-none text-[14px]"
                  placeholder="Giá" />
              </div>
              <div className={`border w-56 h-full px-3 py-1 flex`}>
                <input
                  {...register('stock', { valueAsNumber: true })}
                  type='number'
                  className="w-full h-full outline-none text-[14px]" placeholder="Kho hàng" />
              </div>
              <div className={`border w-56 h-full px-3 py-1 flex rounded-tr rounded-br `}>
                <input
                  {...register('sku')}
                  type="text"
                  className="w-full h-full outline-none text-[14px]" placeholder="SKU phân loại" />
              </div>
            </div>
            {productFormHandle.getValues('variant')?.variantProducts && (
              <div onClick={handleChangeAllValueVariantProduct} className={`flex items-center justify-center cursor-pointer w-full ml-6 py-2 border text-[14px] bg-blue-700 text-white rounded hover:opacity-80 ${variantProductFields.length === 0 && 'cursor-not-allowed opacity-80'}`}>
                Áp dụng cho tất cả sản phẩm phân loại
              </div>
            )}

          </div>
          <div className='w-[672px] grid grid-cols-3 -mt-4 mb-4'>
            {/* <div className='text-sm px-1 text-red-500'>{errors.price?.message && errors.price.message}</div>
            <div className='text-sm px-1 text-red-500'>{errors.stock?.message && errors.stock.message}</div>
            <div className='text-sm px-1 text-red-500'>{errors.sku?.message && errors.sku.message}</div> */}
          </div>
        </>
      )}
      <div className="w-full">
        <div className='w-full flex'>
          {productFormHandle.getValues('variant')?.variantProducts && (
            <table className="w-full">
              <thead>
                <tr>
                  <td className="h-20 w-[120px]">
                    <div className="h-full w-full p-3 flex items-center justify-center text-[14px] font-semibold text-center">Ảnh</div>
                  </td>
                  {variantAttributes.map((item: any, index: number) => (
                    <td key={index} className="h-20 w-[120px]">
                      <div className="h-full w-full p-3 flex items-center justify-center text-[14px] font-semibold text-center">{item.attribute}</div>
                    </td>
                  ))}
                  <td className="h-20 w-[120px]">
                    <div className="h-full w-full p-3 flex items-center justify-center text-[14px] font-semibold text-center">Giá</div>
                  </td>
                  <td className="h-20 w-[120px]">
                    <div className="h-full w-full p-3 flex items-center justify-center text-[14px] font-semibold text-center">Kho hàng</div>
                  </td>
                  <td className="h-20 w-[120px]">
                    <div className="h-full w-full p-3 flex items-center justify-center text-[14px] font-semibold text-center">SKU phân loại</div>
                  </td>
                </tr>
              </thead>
              <tbody>
                {variantProductFields.map((item: any, index: number) => (
                  <tr key={index}>
                    <td className="h-20 w-[120px]">
                      <div className="h-full w-full p-3 flex items-center justify-center text-[14px] text-center">
                        {item.images ? (
                          <img className="size-12" src={item.images} alt="" />
                        ) : (
                          <Image strokeWidth={1.25} className="size-8" />
                        )}
                      </div>
                    </td>
                    {item.variants.map((it: any, subIndex: number) => (
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
                            {...productFormHandle.register(`variant.variantProducts.${index}.price`, { valueAsNumber: true })}
                            type='number'
                            className="w-full h-full outline-none text-[14px]"
                            placeholder="Giá"
                          />
                        </div>
                      </div>
                    </td>
                    <td className="">
                      <div className="px-4 py-6 flex items-center justify-center text-[14px]">
                        <div className="border w-56 h-8 px-3 py-1 flex rounded">
                          <input
                            {...productFormHandle.register(`variant.variantProducts.${index}.stock`, { valueAsNumber: true })}
                            type='number'
                            className="w-full h-full outline-none text-[14px]"
                            placeholder="Kho hàng"
                          />
                        </div>
                      </div>

                    </td>
                    <td className="">
                      <div className="px-4 py-6 flex items-center justify-center text-[14px]">
                        <div className="border w-56 h-8 px-3 py-1 flex rounded">
                          <input
                            {...productFormHandle.register(`variant.variantProducts.${index}.sku`)}
                            className="w-full h-full outline-none text-[14px]"
                            type='text'
                            placeholder="sku"
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

        </div>
      </div>
    </>
  )
}
