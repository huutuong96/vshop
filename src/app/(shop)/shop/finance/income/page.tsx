'use client'

import envConfig from "@/config"
import { clientAccessToken } from "@/lib/http"
import { formattedPrice } from "@/lib/utils"
import { useAppInfoSelector } from "@/redux/stores/profile.store"
import { env } from "process"
import { useEffect, useState } from "react"

export default function IncomePage() {
  const [data, setData] = useState<any>()
  const shopInfo = useAppInfoSelector(state => state.profile.info);
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT_1}/api/shops/history_get_cash/${shopInfo.shop_id}`, {
          headers: {
            'Authorization': `Bearer ${clientAccessToken.value}`
          }
        })
        const payload = await res.json();
        console.log(payload);
        setData(payload.data);

      } catch (error) {

      }
    }
    if (shopInfo.shop_id) {
      getData()
    }
  }, [])
  return (
    <div>
      <div className="flex p-4 items-center justify-between">
        <span className="text-[20px] font-semibold">Thu Nhập Của Tôi</span>
      </div>
      <div className="w-full flex gap-4">
        <div className="flex-[3] p-6 mb-4 bg-white rounded-sm shadow">
          <div className="w-full">
            <div className="text-[18px] font-semibold mb-2">
              Tổng Quan
            </div>
            <div className="w-full py-4">
              <div className="w-full flex">
                <div className="flex-1">
                  <div className="text-[16px] font-semibold mb-4">
                    Chưa Thanh Toán
                  </div>
                  <div className="">
                    <div className="text-sm text-gray-500 mb-2">Tổng cộng</div>
                    <div className="text-2xl font-bold">{data?.not_paid_yet && formattedPrice(data?.not_paid_yet)}</div>
                  </div>
                </div>
                <div className="flex-1 pl-4 ml-4 border-l">
                  <div className="text-[16px] font-semibold mb-4">
                    Đã Thanh Toán
                  </div>
                  <div className="flex">
                    <div className="flex-[2]">
                      <div className="text-sm text-gray-500 mb-2">Tuần này</div>
                      <div className="text-2xl font-bold">{data?.total_week && formattedPrice(data?.total_week)}</div>
                    </div>
                    <div className="flex-1">
                      <div className="text-sm text-gray-500 mb-2">Tháng này</div>
                      <div className="text-sm font-bold">{data?.total_month && formattedPrice(data?.total_month)}</div>
                    </div>
                    <div className="flex-1">
                      <div className="text-sm text-gray-500 mb-2">Tổng cộng</div>
                      <div className="text-sm font-bold">{data?.total_cash && formattedPrice(data?.total_cash)}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="flex-1 p-6 mb-4 bg-white rounded-sm shadow">he</div> */}
      </div>
    </div>
  )
}
