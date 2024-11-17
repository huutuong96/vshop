'use client'
import { CreateProductFormData } from "@/app/(shop)/_components/new-product-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { addToSelectedCategories, Category, confirmCategory } from "@/redux/slices/shop-new-product.slice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { ChevronRight, Pen } from "lucide-react";
import { Dispatch, memo, SetStateAction, useEffect, useState } from "react";
import { UseFormSetError, UseFormSetValue } from "react-hook-form";




function NewProductPopupCategory({ isShowPopupCategory, setIsShowPopupCategory, setValue, setError }:
  {
    isShowPopupCategory: boolean,
    setIsShowPopupCategory: Dispatch<SetStateAction<boolean>>
    setValue: UseFormSetValue<CreateProductFormData>
    setError: UseFormSetError<CreateProductFormData>
  }
) {

  const dispatch = useAppDispatch();
  const rootCategories = useAppSelector(state => state.shopListProduct.category.rootCategories);
  const categories = useAppSelector(state => state.shopListProduct.category.categories);
  const categoriesSelected = useAppSelector(state => state.shopListProduct.category.selectedCategories);
  const categoriesSelected1 = useAppSelector(state => state.shopListProduct.category.selectedCategories1);

  const isConfirmCategories = useAppSelector(state => state.shopListProduct.category.isConfirmCategories);


  const isCategoryHasChildren = (id: number): boolean => {
    return rootCategories.some(item => item.parent_id === id);
  }

  const handleClickCategory = ({ i, j }: { i: number, j: number }) => {
    dispatch(addToSelectedCategories({ i, j }));
  }

  const handleCancelPopup = () => {
    setIsShowPopupCategory(false);
  }

  return (
    <Dialog open={isShowPopupCategory} onOpenChange={setIsShowPopupCategory}>
      <DialogTrigger asChild>
        <div className="w-[800px] h-full border rounded px-3 py-1 flex justify-between items-center cursor-pointer hover:border-gray-400">
          <div className="text-[14px] text-gray-400 flex gap-1">
            {
              categoriesSelected.length > 0 && isConfirmCategories
                ? categoriesSelected.map((item, index) => (
                  <span className="text-black font-medium">
                    <span>{item.title}</span>
                    <span className="ml-1">{index !== categoriesSelected.length - 1 && ' > '}</span>
                  </span>
                ))
                : 'Tìm kiếm theo ngành hàng'
            }
          </div>
          <Pen size={16} color="#ababab" strokeWidth={1.25} />
        </div>
      </DialogTrigger>
      <DialogContent onInteractOutside={(e) => e.preventDefault()} className="w-[1200px]">
        <DialogHeader>
          <DialogTitle>Chỉnh sửa ngành hàng</DialogTitle>
        </DialogHeader>
        <div className="w-full h-[400px] bg-gray-50 rounded p-4">
          <div className="">
            <input type="text" className="h-8 border" />
          </div>
          <div className="grid grid-cols-4 w-full bg-white mt-4 py-2.5">
            {categories.map((item, index) => (
              <ScrollArea key={index} className="flex-shrink-0 border-r h-[300px] max-h-[300px]">
                <ul className="">
                  {item.data.map((it) => (
                    <li onClick={() => handleClickCategory({ i: index, j: it.id })} key={it.id} className="h-8 px-4 flex items-center justify-between hover:bg-gray-100 cursor-pointer">
                      <p className={`text-[14px] ${categoriesSelected.some(item => item.id === it.id) && 'text-blue-700 font-semibold'}`}>{it.title}</p>
                      {isCategoryHasChildren(it.id) && (<ChevronRight size={20} strokeWidth={1.25} />)}
                    </li>
                  ))}

                </ul>
              </ScrollArea>
            ))}

          </div>
        </div>
        <div className="relative">
          <div className="absolute w-[1200px] h-[81px] p-6 -left-[25px] top-0 border-t ">
            <div className="w-full h-full flex justify-between">
              <div className="flex gap-4">
                <span className="text-[14px] font-medium">Đã chọn:</span>
                <span className="text-[14px] font-medium">
                  {categoriesSelected.length ?
                    categoriesSelected.map((item, index) => `${item.title} ${index !== categoriesSelected.length - 1 ? ' > ' : ''}`)
                    : 'Chưa chọn ngành hàng nào'}
                </span>
              </div>
              <div className="flex gap-4">
                <Button onClick={handleCancelPopup}>Cancel</Button>
                <Button
                  className={`${!isConfirmCategories ? 'bg-[#D3D3D3] opacity-60 cursor-not-allowed hover:bg-[#D3D3D3]' : ''}`}
                  onClick={() => {
                    if (isConfirmCategories) {
                      const a = categoriesSelected[categoriesSelected.length - 1];
                      if (!isCategoryHasChildren(a.id)) {
                        setIsShowPopupCategory(false);
                        dispatch(confirmCategory(a.id));
                        setValue('category_id', a.id);
                        setError('category_id', { message: undefined })
                      }
                    }
                  }}>Confirm</Button>
              </div>
            </div>
          </div>
          <div className="h-[50px]">
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default memo(NewProductPopupCategory);
