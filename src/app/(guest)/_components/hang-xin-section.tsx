import productApiRequest from "@/apiRequest/product";
import CardProduct from "@/app/(guest)/_components/card-product";
import Link from "next/link";
import { useEffect, useState } from "react";


export default async function HangXinSection() {
  try {
    const data = await productApiRequest.productBySoldCount();

    return (
      <div className="w-full">
        <div className="w-full py-2 flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <span className="text-[18px] font-bold">Sản phẩm bán chạy</span>
            {/* <div className="flex gap-1 items-center">
              <div className="bg-red-500 text-[14px] rounded w-[26px] h-6 flex items-center justify-center text-white">07</div>
              <span className="text-[20px] font-bold">:</span>
              <div className="bg-red-500 text-[14px] rounded w-[26px] h-6 flex items-center justify-center text-white">24</div>
              <span className="text-[20px] font-bold">:</span>
              <div className="bg-red-500 text-[14px] rounded w-[26px] h-6 flex items-center justify-center text-white">29</div>
            </div> */}
          </div>
          <Link href={'/search?filter=sold_count'} className="text-[13px] text-blue-500 cursor-pointer underline font-semibold">Xem tất cả</Link>
        </div>
        <div className="list-card-product py-3 grid grid-cols-5 gap-4">
          {data.payload.data.data.map((item: any, index: number) => (
            <CardProduct key={index} p={item} />
          ))}
        </div>
      </div>
    )

  } catch (error) {
    console.log(error);
    return (
      <div className="w-full">
        OK
      </div>
    )
  }


}
