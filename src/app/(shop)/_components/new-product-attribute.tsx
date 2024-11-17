'use client'

import { changeProductDetailValue, deleteProductDetail } from "@/redux/slices/shop-new-product.slice";
import { useAppDispatch } from "@/redux/store"
import { Pen, Trash2 } from "lucide-react"

export default function NewProductAttribute({ label, value, index }: { label: string, value: string, index: number }) {
  const dispatch = useAppDispatch();

  const handleDeleteProductDetail = (index: number) => {
    dispatch(deleteProductDetail(index));
  }

  const handleChangeProductDetailValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(changeProductDetailValue({ index, value: e.target.value }));
  }

  return (
    <div className="w-full flex mb-6">
      <div>
        <div className="w-[144px] h-10 mr-6 flex justify-end items-center gap-1">
          <div className="text-[14px] h-full font-medium flex items-center">{label}</div>
        </div>
      </div>
      <div className="w-full flex gap-4 items-center">
        <div className={`h-10 w-[300px] px-3 border rounded-sm flex`}>
          <input
            className="h-full w-full outline-none text-[14px]" placeholder="Input" value={value}
            onChange={handleChangeProductDetailValue}
          />
        </div>
        <div>
          <Pen size={16} strokeWidth={1.25} className="cursor-pointer" />
        </div>
        <div onClick={() => handleDeleteProductDetail(index)} className="cursor-pointer">
          <Trash2 size={16} strokeWidth={1.25} />
        </div>
      </div>
    </div>
  )
}
