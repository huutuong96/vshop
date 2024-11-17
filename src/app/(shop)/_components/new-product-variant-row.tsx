'use client'
import { changeInputNameVariantValue, deleteVariantValueInItem, VariantItem } from "@/redux/slices/shop-new-product.slice";
import { ImagePlus, Trash2 } from "lucide-react";
import { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";

export default function NewProductVariantRow({ parentIndex, index, variantValue }: { variantValue: { image: string, value: string }, parentIndex: number, index: number }) {
  const [isOpenInput, setIsOpenInput] = useState<boolean>(false);

  const dispatch = useDispatch();

  const handleDeleteValueInVariantItem = () => {
    dispatch(deleteVariantValueInItem({ parentIndex, index }));
  }
  const handleChangeInputNameVariantValue = (e: FormEvent) => {
    setIsOpenInput(true);
    dispatch(changeInputNameVariantValue({ parentIndex, index, name: (e.target as HTMLInputElement).value }))
  }

  return (
    <div className="w-[calc(50%-12px)] mt-4">
      <div className="w-full flex">
        {
          parentIndex === 0 && (
            <div className="mr-1">
              <div className="size-8 rounded cursor-pointer border border-dashed flex items-center justify-center bg-white hover:bg-blue-50 hover:border-blue-600">
                <ImagePlus color="#2069df" size={20} strokeWidth={1} />
              </div>
            </div>
          )
        }

        <div className={`w-full px-3 mr-1 border rounded bg-white ${isOpenInput && 'border-gray-600 shadow'}`}>
          <input
            className="w-full h-[30px] outline-none text-[14px] "
            placeholder="Nhập"
            onBlur={(e: FormEvent) => {
              setIsOpenInput(false);
            }}
            onFocus={() => setIsOpenInput(true)}
            onInput={handleChangeInputNameVariantValue}
            value={variantValue.value}
          />
        </div>
        <div className="mt-[7px] flex h-4 w-6">
          <div onClick={handleDeleteValueInVariantItem} className="ml-2 cursor-pointer">
            <Trash2 color="#949494" size={16} strokeWidth={1} />
          </div>
        </div>
      </div>
    </div>
  )
}
