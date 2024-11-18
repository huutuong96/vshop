'use client'

import AttributeValue from "@/app/(shop)/shop/product/new/attribute-value"
import ImageLoading from "@/app/(shop)/shop/product/new/image-loading"
import { Product } from "@/app/(shop)/shop/product/new/new-product-test-form"
import { clientAccessToken } from "@/lib/http"
import { Asterisk, Plus, Trash, Trash2, X } from "lucide-react"
import { nanoid } from "nanoid"
import { ChangeEvent, memo, useEffect, useRef, useState } from "react"
import { useFieldArray, UseFieldArrayReturn, UseFormReturn, useWatch } from "react-hook-form"




function VariantAttribute({ attributeFormHandle, productFormHandle, index }:
  {
    attributeFormHandle: any
    productFormHandle: any
    index: number
  }) {

  // {
  //   attributeFormHandle: UseFieldArrayReturn<Product>
  //   productFormHandle: UseFormReturn<Product>
  //   index: number
  // }) {


  const [imageLoading, setImageLoading] = useState<boolean>(false);

  const attributeValuesFormHandle = useFieldArray({
    control: productFormHandle.control,
    name: `variant.variantAttributes.${index}.values`
  });


  const handleDeleteVariant = (index: number) => {
    attributeFormHandle.remove(index);
    // const variants = productFormHandle.getValues(`variant.variantAttributes`);
    // variants.splice(index, 1);
    // productFormHandle.setValue(`variant.variantAttributes`, variants);
    const variantAttributes = productFormHandle.getValues('variant.variantAttributes');
    if (!variantAttributes.length) {
      productFormHandle.setValue('variant', null);
      productFormHandle.setValue('variantMode', false);
      productFormHandle.setValue('price', null);
      productFormHandle.setValue('stock', null);
      productFormHandle.setValue('sku', null);

    }
    productFormHandle.setValue(`isCreated`, false);
  }



  return (
    <div className="p-6 rounded shadow bg-[#f5f8fe] relative">
      <div className="mb-4 text-[16px] font-semibold">Biến thể {index + 1}</div>
      <div onClick={() => handleDeleteVariant(index)} className="absolute top-6 right-6">
        <Trash2 size={20} strokeWidth={1.25} className="cursor-pointer text-[#3c3c3c] group-hover:text-blue-500" />
      </div>
      <div className="text-sm">
        <div className="font-semibold mb-2 flex items-center gap-2">
          <Asterisk size={16} color="#e83030" strokeWidth={1.25} />
          Tên biến thể
        </div>
        <input
          {...productFormHandle.register(`variant.variantAttributes.${index}.attribute`, {
            onChange(event: any) {
              productFormHandle.setValue('isCreated', false);
            },
            // required: "Attribute value is required",
            // validate: value => value.trim() !== "" || "Attribute value cannot be empty",
          })}
          type="text"
          className={`border outline-none px-2 py-1 text-sm rounded-md w-[300px] focus:ring-1
              ${productFormHandle.formState.errors.variant?.variantAttributes?.[index]?.attribute?.message ? "focus:ring-red-500" : "focus:ring-blue-700"}
            `}
          placeholder="Vui lòng nhập"
        />

      </div>
      {productFormHandle.formState.errors.variant?.variantAttributes?.[index]?.attribute?.message && (
        <p className="text-sm mt-2 text-red-500">{productFormHandle.formState.errors.variant.variantAttributes[index].attribute.message}</p>
      )}
      <div className="mt-6 text-sm">
        <p className="mt-4 text-sm font-semibold">Các giá trị biến thể: </p>
        <div className="mt-4 flex flex-col gap-3">
          {productFormHandle.getValues(`variant.variantAttributes.${index}.values`).map((v: any, subIndex: number) => (
            <AttributeValue
              key={v.id}
              attributeFormHandle={attributeFormHandle}
              item={v}
              attributeValuesFormHandle={attributeValuesFormHandle}
              index={index}
              subIndex={subIndex}
              productFormHandle={productFormHandle}
            />
          ))}
        </div>
        <div className="mt-4">
          <button onClick={() => {
            attributeValuesFormHandle.append({ id: nanoid(12), image: "", value: "" });
            productFormHandle.trigger()
          }} type="button" className="border-dotted bg-white border-2 rounded p-2 ">Thêm giá trị</button>
        </div>
      </div>
    </div >
  )
}

export default memo(VariantAttribute)



