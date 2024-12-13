'use client'
import { Image } from 'lucide-react'
import './table.css'
import { Controller, UseFormReturn } from 'react-hook-form'
import { Product } from '@/app/(shop)/shop/product/new/new-product-test-form'
import { useEffect, useState } from 'react'
import { useFieldArray, UseFieldArrayReturn, useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const FromDataSchema = z.object({
  price: z.number({ message: "Vui long nhap" }).min(1),
  stock: z.number({ message: "Vui long nhap" }).min(1),
  sku: z.string().min(1, { message: "Vui long nhap" }),
});

type FormData = z.infer<typeof FromDataSchema>;

export default function NewProductVariantTableTest({ variantProductFields, variantFields, productFormHandle }: {
  variantProductFields: any,
  variantFields: any
  productFormHandle: any
}) {
  const [a, setA] = useState<any[]>([...productFormHandle.getValues('variant.variantProducts')])

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
    const b = variantProductFields.map((p: any) => ({
      ...p,
      price: getValues('price'),
      stock: getValues('stock'),
      sku: getValues('sku')
    }));
    productFormHandle.setValue('variant.variantProducts', [...b]);
  }

  useEffect(() => {
    reset({ price: 0, stock: 0, sku: "" })
  }, [variantProductFields])

  console.log({ abx: productFormHandle.getValues('variant.variantProducts'), a });

  return (
    <>
      {productFormHandle.getValues('variant')?.variantProducts && (
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
            {productFormHandle.getValues('variant')?.variantProducts && (
              <div onClick={handleChangeAllValueVariantProduct} className={`flex items-center justify-center cursor-pointer w-full ml-6 py-2 border text-[14px] bg-blue-800 shadow-sm text-white rounded hover:opacity-80 ${variantProductFields.length === 0 && 'cursor-not-allowed opacity-80'}`}>
                Áp dụng cho tất cả sản phẩm phân loại
              </div>
            )}

          </div>
          <div className='w-[672px] grid grid-cols-3 -mt-4 mb-4'>
            <div className='text-sm px-1 text-red-500'>{errors.price?.message && errors.price.message}</div>
            <div className='text-sm px-1 text-red-500'>{errors.stock?.message && errors.stock.message}</div>
            <div className='text-sm px-1 text-red-500'>{errors.sku?.message && errors.sku.message}</div>
          </div>
        </>
      )}
      <div className="w-full">
        <div className='w-full flex'>
          {productFormHandle.getValues('variant')?.variantProducts && (
            <Table className='w-full'>
              <TableHeader>

                <TableRow>
                  <TableHead className="h-20 w-[120px]">
                    <div className="h-full w-full p-3 flex items-center justify-center text-[14px] font-semibold text-center">Ảnh</div>
                  </TableHead>
                  {variantFields.map((item: any, index: number) => (
                    <TableHead key={index} className="h-20 w-[120px]">
                      <div className="h-full w-full p-3 flex items-center justify-center text-[14px] font-semibold text-center">{variantFields[index].attribute || `Nhóm phân loại ${index + 1}`}</div>
                    </TableHead>
                  ))}
                  <TableHead className="h-20 w-[120px]">
                    <div className="h-full w-full p-3 flex items-center justify-center text-[14px] font-semibold text-center">Giá</div>
                  </TableHead>
                  <TableHead className="h-20 w-[120px]">
                    <div className="h-full w-full p-3 flex items-center justify-center text-[14px] font-semibold text-center">Kho hàng</div>
                  </TableHead>
                  <TableHead className="h-20 w-[120px]">
                    <div className="h-full w-full p-3 flex items-center justify-center text-[14px] font-semibold text-center">SKU phân loại</div>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {productFormHandle.getValues('variant.variantProducts').map((item: any, index: number) => (
                  <TableRow key={index}>
                    <TableCell className="h-20 w-[120px]">
                      <div className="h-full w-full p-3 flex items-center justify-center text-[14px] text-center">
                        {item.image ? (
                          <img className="size-12" src={item.image} alt="" />
                        ) : (
                          <Image strokeWidth={1.25} className="size-8" />
                        )}
                      </div>
                    </TableCell>
                    {item.attributes.map((it: any, subIndex: number) => (
                      <TableCell key={it.value} className="w-[120px]">
                        <div className="px-4 py-6 flex items-center justify-center text-[14px]">{it.value}</div>
                      </TableCell>
                    ))}
                    <TableCell className="">
                      <div className="px-4 py-6 flex items-center justify-center text-[14px]">
                        <div className='relative'>
                          <div className="border w-56 h-8 px-3 py-1 flex rounded">
                            <div className="flex items-center text-[12px] pr-2 text-gray-400">
                              ₫
                              <div className="ml-2 border-r h-full"></div>
                            </div>
                            <input
                              // onChange={(e) => {
                              //   productFormHandle.setValue(`variant.variantProducts.${index}.price`, +e.target.value)
                              // }}
                              // value={productFormHandle.getValues(`variant.variantProducts.${index}.price`)}
                              {...productFormHandle.register(`variant.variantProducts.${index}.price`, {
                                valueAsNumber: true,
                              })}
                              type='number'
                              className="w-full h-full outline-none text-[14px]"
                              placeholder="Giá"
                            />
                          </div>
                          <div className="text-sm mt-2 h-5 text-red-500 absolute top-7">
                            {productFormHandle.formState.errors.variant?.variantProducts?.[index]?.price?.message ? productFormHandle.formState.errors.variant.variantProducts[index].price.message : ''}
                          </div>

                        </div>


                      </div>

                    </TableCell>
                    <TableCell className="">
                      <div className="px-4 py-6 flex items-center justify-center text-[14px]">
                        <div className='relative'>
                          <div className="border w-56 h-8 px-3 py-1 flex rounded">
                            <input
                              {...productFormHandle.register(`variant.variantProducts.${index}.stock`, {
                                valueAsNumber: true,
                              })}
                              type='number'
                              className="w-full h-full outline-none text-[14px]"
                              placeholder="Kho hàng"
                            />
                          </div>
                          <div className="text-sm mt-2 h-5 text-red-500 absolute top-7">
                            {productFormHandle.formState.errors.variant?.variantProducts?.[index]?.stock?.message ? productFormHandle.formState.errors.variant.variantProducts[index].stock.message : ''}
                          </div>
                        </div>

                      </div>

                    </TableCell>
                    <TableCell className="">
                      <div className="px-4 py-6 flex items-center justify-center text-[14px]">
                        <div className='relative'>
                          <div className="border w-56 h-8 px-3 py-1 flex rounded">
                            <input
                              {...productFormHandle.register(`variant.variantProducts.${index}.sku`)}
                              className="w-full h-full outline-none text-[14px]"
                              type='text'
                              placeholder="sku"
                            />
                          </div>
                          <div className="text-sm mt-2 h-5 text-red-500 absolute top-7">
                            {productFormHandle.formState.errors.variant?.variantProducts?.[index]?.sku?.message ? productFormHandle.formState.errors.variant.variantProducts[index].sku.message : ''}
                          </div>
                        </div>

                      </div>

                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>

            </Table>
          )}


        </div>
      </div>
    </>
  )
}
