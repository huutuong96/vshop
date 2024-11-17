import productApiRequest from "@/apiRequest/product";
import CardProduct from "@/app/(guest)/_components/card-product";
import { useEffect, useState } from "react";


export default async function HangXinSection() {
  try {
    const data = await productApiRequest.findAll();

    return (
      <div className="w-full">
        <div className="w-full py-2 flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <span className="text-[18px] font-bold">Hàng xịn giá sốc</span>
            <div className="flex gap-1 items-center">
              <div className="bg-red-500 text-[14px] rounded w-[26px] h-6 flex items-center justify-center text-white">07</div>
              <span className="text-[20px] font-bold">:</span>
              <div className="bg-red-500 text-[14px] rounded w-[26px] h-6 flex items-center justify-center text-white">24</div>
              <span className="text-[20px] font-bold">:</span>
              <div className="bg-red-500 text-[14px] rounded w-[26px] h-6 flex items-center justify-center text-white">29</div>
            </div>
          </div>
          <div className="text-[13px] text-blue-500 cursor-pointer underline font-semibold">Xem tất cả</div>
        </div>
        <div className="list-card-product py-3 grid grid-cols-5 gap-4">
          {data.payload.data.data.sort(() => Math.random() - 0.5).slice(0,5).map((item: any, index: number) => (
            <CardProduct key={index} p={item} />
          ))}
        </div>
      </div>
    )

  } catch (error) {
    return (
      <div className="w-full">
        OK
      </div>
    )
  }


}
