import NewProductAttribute from "@/app/(shop)/_components/new-product-attribute";
import { addProductDetail } from "@/redux/slices/shop-new-product.slice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import React, { useState } from "react";

export default function NewProductDetailSection() {
  const isConfirmCategories = useAppSelector(state => state.shopListProduct.category.isConfirmCategories);
  const infoProductDetailList = useAppSelector(state => state.shopListProduct.infomation);
  const dispatch = useAppDispatch();
  const [label, setLabel] = useState<string>('');

  return (
    <div className="px-6 py-6 bg-white shadow rounded">
      <div className={`text-[20px] font-semibold mb-6 ${!isConfirmCategories && 'text-gray-400'}`}>{isConfirmCategories ? 'Thông tin chi tiết' : 'Thông tin bán hàng'} </div>
      {isConfirmCategories ? (
        <>
          <div className="w-full flex mb-6">
            <div>
              <div className="w-[144px] h-10 mr-6 flex justify-end items-center gap-1">
                <span className="text-[12px] text-blue-700">*</span>
                <div className="text-[14px] h-full font-medium flex items-center">
                  Thêm chi tiết
                </div>
              </div>
            </div>
            <div className="w-full">
              <div className="bg-[#f6f6f6] p-4 rounded relative mb-4">
                <div className="flex w-full pb-4 border-b">
                  <div className="w-full px-3 border rounded bg-white">
                    <input
                      autoFocus
                      className="w-full h-full outline-none text-[14px]"
                      placeholder="Nhập"
                      value={label}
                      onChange={(e) => setLabel(e.target.value)}
                    />
                  </div>
                  <button type="button" onClick={() => {
                    if (label) {
                      dispatch(addProductDetail(label));
                      setLabel('')
                    }
                  }} className="border-2 bg-white rounded border-dashed p-2 px-4 text-[14px] text-blue-600 hover:bg-blue-50 hover:border-blue-400">
                    Thêm chi tiết sản phẩm
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {infoProductDetailList.map((item, index) => (
              <NewProductAttribute {...{ ...item, index }} key={index} />
            ))}
          </div>
        </>
      ) : (
        <div className={`-mt-2 text-[14px] ${!isConfirmCategories && 'text-gray-400'}`}>Có thể điều chỉnh sau khi chọn ngành hàng</div>
      )}
    </div>
  )
}
