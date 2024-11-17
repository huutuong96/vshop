'use client'

import NewProductVariantRow from "@/app/(shop)/_components/new-product-variant-row";
import { addValueInVariantItem, addVariant, changeInputNameVariant, changeVariantMode, deleteVariant, VariantItem } from "@/redux/slices/shop-new-product.slice";
import { useAppSelector } from "@/redux/store";
import { Pen, Plus, X } from "lucide-react";
import { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";

export default function NewProductVariantItem({ variantItem, index }: { variantItem: VariantItem, index: number }) {
  const dispatch = useDispatch();
  const [changeMode, setChangeMode] = useState<boolean>(true);
  const a = useAppSelector(state => state.shopListProduct.varriant.variantItems);
  const [name, setName] = useState<string>('');

  const handleDeleteVariantItem = () => {
    dispatch(deleteVariant(index))
  }

  const handleAddValueInVariantItem = () => {
    dispatch(addValueInVariantItem(index));
  }

  const handleChangeInputVariantName = (e: FormEvent) => {
    // dispatch(changeInputNameVariant({ index, name: (e.target as HTMLInputElement).value }))
    setName((e.target as HTMLInputElement).value);
  }


  return (
    <div className="bg-[#f6f6f6] p-4 rounded relative mb-4">
      <span onClick={handleDeleteVariantItem} className="absolute top-4 right-4 cursor-pointer">
        <X strokeWidth={1.25} size={20} />
      </span>
      {
        changeMode && (
          <div className="flex w-full pb-4 border-b">
            <div className="px-3 border rounded bg-white">
              <input
                onBlur={(e: FormEvent) => {
                  if (name) {
                    setChangeMode(false);
                    dispatch(changeInputNameVariant({ index, name: (e.target as HTMLInputElement).value }))
                  }
                }}
                onInput={handleChangeInputVariantName}
                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                  if (e.key === 'Enter') {
                    if (name) {
                      setChangeMode(false);
                      dispatch(changeInputNameVariant({ index, name: (e.target as HTMLInputElement).value }))
                    }
                  }
                }}
                value={name}
                autoFocus
                className="w-[260px] h-[30px] outline-none text-[14px]"
                placeholder="Nhập loại biến thể"
              />
            </div>
          </div>
        )
      }
      {
        !changeMode && (
          <div className="flex w-full pb-4 border-b">
            <div className="flex h-[32px] gap-2 items-center">
              <span className="text-[16px] font-bold">{variantItem.name}</span>
              <span className="text-[12px] text-gray-400">(Tùy chỉnh)</span>
              <span onClick={() => setChangeMode(true)} className="cursor-pointer">
                <Pen size={16} />
              </span>
            </div>
          </div>

        )
      }

      <div className="w-full">
        <div className="w-full flex flex-wrap justify-between">
          {variantItem.values.map((item, subIndex) => (
            <NewProductVariantRow key={subIndex} variantValue={item} index={subIndex} parentIndex={index} />
          ))}
        </div>
        <div className="mt-4">
          <div onClick={handleAddValueInVariantItem} className="border-2 inline-flex cursor-pointer gap-2 items-center bg-white rounded border-dashed p-2 px-4 text-[14px] text-blue-600 hover:bg-blue-50 hover:border-blue-400">
            <Plus size={14} /> Thêm
          </div>
        </div>
      </div>
    </div>
  )
}
