'use client'

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import ImageLoading from "@/app/(shop)/shop/product/new-test/image-loading"
import { Product } from "@/app/(shop)/shop/product/new-test/new-product-test-form"
import { clientAccessToken } from "@/lib/http"
import { PencilLine, Plus, Trash2 } from "lucide-react"
import { ChangeEvent, memo, useRef, useState } from "react"
import { FieldArrayWithId, UseFieldArrayReturn, UseFormReturn } from "react-hook-form"
import envConfig from "@/config"

function AttributeValue({ item, productFormHandle, attributeValuesFormHandle, index, subIndex }: {
  item: any
  attributeFormHandle: UseFieldArrayReturn<Product>
  attributeValuesFormHandle: UseFieldArrayReturn<Product>
  productFormHandle: UseFormReturn<Product>
  index: number
  subIndex: number
}) {

  const [imageLoading, setImageLoading] = useState<boolean>(false);
  const currentInputRef = useRef<HTMLInputElement | null>(null);


  const handleClickImage = (subIndex: number) => {
    if (currentInputRef.current) {
      currentInputRef.current.click();
    }
  }

  const handleUploadVariantValueImage = async (e: ChangeEvent<HTMLInputElement>, subIndex: number) => {
    try {
      setImageLoading(true);
      const files = e.target.files;
      if (files && files.length > 0) {
        const file = files[0];
        const formData = new FormData();
        formData.append('images[]', file);
        const resToServer = await fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT_1}/api/product/uploadImage`, {
          method: "POST",
          body: formData,
          headers: {
            "Authorization": `Bearer ${clientAccessToken.value}`
          }
        });
        const payload = await resToServer.json();
        const { images } = payload;
        const image = images[0];
        // attributeValuesFormHandle.update(subIndex, { ...attributeValuesFormHandle.fields[subIndex], image })
        productFormHandle.setValue('isCreated', false);
        productFormHandle.setValue(`variant.variantAttributes.${index}.values.${subIndex}.image`, image);
        if (!resToServer.ok) {
          throw 'Error!'
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setImageLoading(false);
    }
  }

  const handleDeleteVariantValue = (subIndex: number) => {
    attributeValuesFormHandle.remove(subIndex);
    productFormHandle.setValue('isCreated', false);
  }

  const handleDeleteVariantImage = (index: number, subIndex: number) => {
    productFormHandle.setValue(`variant.variantAttributes.${index}.values.${subIndex}.image`, "");
    productFormHandle.setValue('isCreated', false);
  }


  return (
    <div>
      <div
        className={`
          flex justify-between items-center  rounded p-4 py-2 
          ${productFormHandle.formState.errors.variant?.variantAttributes?.[index]?.values?.[subIndex]?.value?.message ? "bg-[#f656531a] border border-dotted border-red-400" : "bg-white"}
        `}
      >
        <div className="flex gap-4 items-center">
          <div >
            <input
              {...productFormHandle.register(`variant.variantAttributes.${index}.values.${subIndex}.value`, {
                onChange(event) {
                  productFormHandle.setValue('isCreated', false);
                },
              })}
              className={`
                border outline-none px-2 py-1 text-sm rounded w-[400px] focus:ring-1 
                ${productFormHandle.formState.errors.variant?.variantAttributes?.[index]?.values?.[subIndex]?.value?.message ? "focus:ring-red-500" : "focus:ring-blue-700"}
              `}
              type="text"
              autoFocus={false}
              placeholder="Vui lòng nhập"
            />
          </div>
          {index === 0 && (
            !imageLoading ? (
              !item.image ? (
                <>
                  <div onClick={() => handleClickImage(subIndex)} className="border-dashed bg-white border group border-[#c4c4c4] cursor-pointer size-12 rounded flex items-center justify-center hover:border-blue-500">
                    <Plus size={32} strokeWidth={1.5} className="group-hover:text-blue-500 text-[#858585]" />
                  </div>
                </>
              ) : (
                <HoverCard closeDelay={100} openDelay={100}>
                  <HoverCardTrigger asChild>
                    <div className="size-12 p-1 border rounded cursor-pointer">
                      <img className="size-full rounded" src={item.image} alt="" />
                    </div>
                  </HoverCardTrigger>
                  <HoverCardContent className="bg-white absolute p-0 w-40 -left-20 -top-[270px]" align="center">
                    <div className="">
                      <div className="size-40">
                        <img className="size-full rounded" src={item.image} alt="" />
                      </div>
                      <div className="w-40 h-10 p-1 py-2">
                        <div className="size-full flex items-center">
                          <div className="w-1/2 border-r p-2 flex items-center justify-center group">
                            <PencilLine onClick={() => handleClickImage(subIndex)} size={16} strokeWidth={1.25} className="cursor-pointer text-[#919191] group-hover:text-blue-500" />
                          </div>
                          <div className="w-1/2 p-2 flex items-center justify-center group">
                            <Trash2 onClick={() => handleDeleteVariantImage(index, subIndex)} size={16} strokeWidth={1.25} className="cursor-pointer text-[#919191] group-hover:text-blue-500" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </HoverCardContent>
                </HoverCard>

              )
            )
              : (<ImageLoading />)

          )}
          <input type="file" hidden ref={currentInputRef} onChange={(e) => handleUploadVariantValueImage(e, subIndex)} />

        </div>

        {attributeValuesFormHandle.fields.length > 1 && (
          <TooltipProvider delayDuration={100} skipDelayDuration={100}>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="cursor-pointer" onClick={() => handleDeleteVariantValue(subIndex)}>
                  <Trash2 size={18} color="#3d3d3d" strokeWidth={1.25} />
                </div>
              </TooltipTrigger>
              <TooltipContent align="center">
                <p>Xóa</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
      {
        productFormHandle.formState.errors.variant?.variantAttributes?.[index]?.values?.[subIndex]?.value?.message && (
          <p className="text-sm mt-2 text-red-500">{productFormHandle.formState.errors.variant.variantAttributes[index].values[subIndex].value.message}</p>
        )
      }
    </div>
  )
}

export default memo(AttributeValue);

