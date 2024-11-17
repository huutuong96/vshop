'use client'
import { Image } from 'lucide-react'
import './table.css'
import { Controller, UseFormReturn } from 'react-hook-form'
import { Product } from '@/app/(shop)/shop/product/new-test/new-product-test-form'
import { useEffect, useState } from 'react'
import { useFieldArray, UseFieldArrayReturn, useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod'

const FromDataSchema = z.object({
  price: z.number({ message: "Vui long nhap" }).min(1),
  stock: z.number({ message: "Vui long nhap" }).min(1),
  sku: z.string().min(1, { message: "Vui long nhap" }),
});

type FormData = z.infer<typeof FromDataSchema>;

export default function NewProductVariantTableTest({ variantProductFields, variantFields, productFormHandle }: {
  variantProductFields: any,
  variantFields: any
  productFormHandle: UseFormReturn<Product>
}) {

  const { control, register, getValues, formState: { errors }, trigger, reset } = useForm<FormData>({
    resolver: zodResolver(FromDataSchema),
    defaultValues: {
    },
    mode: "all"
  });


  const handleChangeAllValueVariantProduct = () => {
    if (errors.price || errors.stock || errors.sku) {
      trigger('price');
      trigger('stock');
      trigger('sku');
      return
    }
    const a = productFormHandle.getValues('variant.variantProducts').map(p => ({
      ...p,
      price: getValues('price'),
      stock: getValues('stock'),
      sku: getValues('sku')
    }));
    productFormHandle.setValue('variant.variantProducts', [...a]);
  }

  useEffect(() => {
    reset({ price: 0, stock: 0, sku: "" })
  }, [variantProductFields])

  return (
    <>
      <div className="w-full flex mb-4">
        <div className="flex h-8">
          <div className={`border  w-56 h-full px-3 py-1 flex rounded-tl rounded-bl ${errors.price?.message ? "border-red-500" : "border-r-0"}`}>
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
          <div className={`border w-56 h-full px-3 py-1 flex ${errors.stock?.message ? "border-red-500" : "border-r-0"}`}>
            <input
              {...register('stock', { valueAsNumber: true })}
              type='number'
              className="w-full h-full outline-none text-[14px]" placeholder="Kho hàng" />
          </div>
          <div className={`border w-56 h-full px-3 py-1 flex rounded-tr rounded-br ${errors.sku?.message ? "border-red-500" : ''}`}>
            <input
              {...register('sku')}
              type="text"
              className="w-full h-full outline-none text-[14px]" placeholder="SKU phân loại" />
          </div>
        </div>
        <button onClick={handleChangeAllValueVariantProduct} className={`w-full h-8 ml-6 border text-[14px] bg-blue-500 text-white rounded hover:opacity-80 ${variantProductFields.length === 0 && 'cursor-not-allowed opacity-80'}`}>
          Áp dụng cho tất cả sản phẩm phân loại
        </button>
      </div>
      <div className='w-[672px] grid grid-cols-3 -mt-4 mb-4'>
        <div className='text-sm px-1 text-red-500'>{errors.price?.message && errors.price.message}</div>
        <div className='text-sm px-1 text-red-500'>{errors.stock?.message && errors.stock.message}</div>
        <div className='text-sm px-1 text-red-500'>{errors.sku?.message && errors.sku.message}</div>
      </div>
      <div className="w-full">
        <div className='w-full flex'>
          <table className="w-full">
            <thead>
              <tr>
                <td className="h-20 w-[120px]">
                  <div className="h-full w-full p-3 flex items-center justify-center text-[14px] font-semibold text-center">Ảnh</div>
                </td>
                {variantFields.map((item: any, index: number) => (
                  <td key={index} className="h-20 w-[120px]">
                    <div className="h-full w-full p-3 flex items-center justify-center text-[14px] font-semibold text-center">{variantFields[index].attribute || `Nhóm phân loại ${index + 1}`}</div>
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
                      {item.image ? (
                        <img className="size-12" src={item.image} alt="" />
                      ) : (
                        <Image strokeWidth={1.25} className="size-8" />
                      )}
                    </div>
                  </td>
                  {item.attributes.map((it: any, subIndex: number) => (
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
                          onChange={(e) => {
                            productFormHandle.setValue(`variant.variantProducts.${index}.price`, +e.target.value)
                          }}
                          value={productFormHandle.getValues(`variant.variantProducts.${index}.price`)}
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
                          onChange={(e) => {
                            productFormHandle.setValue(`variant.variantProducts.${index}.stock`, +e.target.value)
                          }}
                          value={productFormHandle.getValues(`variant.variantProducts.${index}.stock`)}
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
                          onChange={(e) => {
                            productFormHandle.setValue(`variant.variantProducts.${index}.sku`, e.target.value)
                          }}
                          value={productFormHandle.getValues(`variant.variantProducts.${index}.sku`)}
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
        </div>
      </div>
    </>
  )
}
