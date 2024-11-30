'use client'

import { Skeleton } from "@/components/ui/skeleton"
import envConfig from "@/config"
import { clientAccessToken } from "@/lib/http"
import { formattedPrice } from "@/lib/utils"
import { useAppInfoDispatch, useAppInfoSelector } from "@/redux/stores/profile.store"
import { ChevronLeft, MailPlus, MapPinIcon, Store, Truck } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { useEffect, useState } from "react"

const titles: { id: number, title: string, order_status: number, valueString: any }[] = [
  { id: 1, title: "Chờ xác nhận", order_status: 0, valueString: (<div className="text-[#d2b510] font-medium">Chờ xác nhận</div>) },
  { id: 2, title: "Đã xác nhận", order_status: 1, valueString: (<div className="text-blue-700 font-medium">Đã xác nhận</div>) },
  { id: 3, title: "Chờ giao hàng", order_status: 5, valueString: (<div className="text-[#16b9ae] font-medium flex gap-2"><Truck className="text-[#16b9ae]" size={20} strokeWidth={1.25} /> Đang vận chuyển</div>) },
  { id: 4, title: "Hoàn thành", order_status: 8, valueString: (<div className="text-green-500 font-medium">Hoàn thành</div>) },
  // { id: 5, title: "Trả hàng/Hoàn tiền", order_status: 9 },
  { id: 5, title: "Đã hủy", order_status: 10, valueString: (<div className="text-red-500 font-medium">Đã hủy</div>) }
]

function formatDateTime(input: string, timeZone = "Asia/Ho_Chi_Minh") {
  // Chuyển đổi chuỗi thành đối tượng Date
  const date = new Date(input);

  // Định dạng các phần: giờ, phút, ngày, tháng, năm
  const hours = date.toLocaleString("en-GB", { hour: "2-digit", hour12: false, timeZone });
  const minutes = date.toLocaleString("en-GB", { minute: "2-digit", timeZone });
  const day = date.toLocaleString("en-GB", { day: "2-digit", timeZone });
  const month = date.toLocaleString("en-GB", { month: "2-digit", timeZone });
  const year = date.toLocaleString("en-GB", { year: "numeric", timeZone });

  // Ghép lại theo định dạng "HH:MM DD-MM-YYYY"
  return `${hours}:${minutes} ${day}-${month}-${year}`;
}

export default function OrderDetailSection({ id }: { id: string }) {
  const [order, setOrder] = useState<any>();
  const profile = useAppInfoSelector(state => state.profile.info);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT_1}/api/order/user/detail/${id}`, {
          headers: {
            "Authorization": `Bearer ${clientAccessToken.value}`
          },
        });
        if (!res.ok) {
          throw 'Error';
        }
        const payload = await res.json();
        setOrder(payload.data[0])
      } catch (error) {
        notFound();
      } finally {
        setLoading(false);
      }
    }
    getData();
  }, [])

  return (
    <>
      {loading && (
        <div className="w-full">
          {/* Header Skeleton */}
          <div className="w-full bg-white h-[56px] py-5 px-4 flex items-center justify-between">
            <div className="flex gap-2 items-center text-sm">
              <Skeleton className="w-5 h-5 rounded-full" />
              <Skeleton className="w-20 h-4" />
            </div>
            <div className="flex gap-3 items-center">
              <Skeleton className="w-24 h-4" />
              <Skeleton className="w-24 h-4" />
              <div>|</div>
              <Skeleton className="w-20 h-4" />
            </div>
          </div>

          {/* Address Skeleton */}
          <div className="w-full mt-5">
            <div className="header w-full bg-white border-b text-[#000000]">
              <div className="w-full px-4 pt-7 pb-6">
                <div className="title flex items-center">
                  <Skeleton className="w-5 h-5 rounded-full" />
                  <Skeleton className="ml-2 w-32 h-5" />
                </div>
                <div className="header-content flex items-center mt-4 gap-2">
                  <Skeleton className="w-20 h-4" />
                  <Skeleton className="w-20 h-4" />
                  <Skeleton className="w-40 h-4" />
                </div>
              </div>
            </div>

            {/* Order Details Skeleton */}
            <div className="bg-white px-5 py-3">
              <div className="w-full">
                <Skeleton className="h-6 w-40 mb-4" />
                {[...Array(3)].map((_, key) => (
                  <div
                    key={key}
                    className={`w-full py-4 border-b flex items-center`}
                  >
                    <Skeleton className="w-[85px] h-[85px] rounded-sm" />
                    <div className="flex-1 ml-4">
                      <Skeleton className="w-2/3 h-5 mb-2" />
                      <Skeleton className="w-1/2 h-4 mb-2" />
                      <Skeleton className="w-1/4 h-4" />
                    </div>
                    <Skeleton className="w-20 h-4 text-end" />
                  </div>
                ))}
              </div>
            </div>

            {/* Pricing Skeleton */}
            {/* <div className="w-full bg-[#fffefc] border-t border-dotted">
              {[...Array(5)].map((_, key) => (
                <div
                  key={key}
                  className="px-6 flex justify-end items-center border-t border-dotted"
                >
                  <Skeleton className="w-32 h-4" />
                  <Skeleton className="w-40 h-5 ml-4" />
                </div>
              ))}
              <div className="px-6 flex justify-end items-center border-t border-dotted">
                <Skeleton className="w-32 h-4" />
                <Skeleton className="w-40 h-5 ml-4" />
              </div>
            </div> */}
          </div>
        </div>
      )}
      {!loading && order && (
        <div className="w-full">
          <div className="w-full bg-white h-[56px] py-5 px-4 flex items-center justify-between shadow-sm rounded-sm">
            <Link href={'/account/orders'} className="flex gap-2 items-center text-sm">
              <ChevronLeft size={20} strokeWidth={1.25} />
              Trở lại
            </Link>
            <div className="flex gap-3 items-center">
              {+order.order_status !== 10 && (
                <>
                  <div className="text-sm">{formatDateTime(order.created_at)}</div>
                  <div className="text-sm">Mã đơn hàng #{order.id}</div>
                  <div>|</div>
                  <div className="text-sm">
                    {titles.find(t => t.order_status === +order.order_status)?.title}
                  </div>
                </>
              )}
              {+order.order_status === 10 && (
                <span className="text-[13px] text-gray-400">Yêu cầu vào: {formatDateTime(order.updated_at)}</span>
              )}
            </div>
          </div>
          <div className="w-full mt-5">
            {+order.order_status !== 10 && (
              <div className="header w-full bg-white border-b  text-[#000000]">
                <div className="" style={{
                  backgroundImage: 'repeating-linear-gradient(45deg, #6fa6d6, #6fa6d6 33px, transparent 0, transparent 41px, #f18d9b 0, #f18d9b 74px, transparent 0, transparent 82px)',
                  backgroundPositionX: '-30px',
                  backgroundSize: '116px 3px',
                  height: '3px',
                  width: '100%'
                }}></div>
                <div className="w-full px-4 pt-7 pb-6">
                  <div className="title flex items-center" >
                    <MapPinIcon color="#2969d1" strokeWidth={1.25} size={16} />
                    <div className="ml-2 text-black text-[18px]">Địa Chỉ Nhận Hàng</div>
                  </div>
                  <div className="header-content flex items-center mt-4 gap-2">
                    <span className="text-sm font-semibold">
                      {order.to_name}
                    </span>
                    <span className="text-sm font-semibold">
                      {order.to_phone}
                    </span>
                    <span className="text-sm">
                      {order.to_address}
                    </span>
                  </div>
                </div>
              </div>
            )}
            {+order.order_status === 10 && (
              <div className="w-full bg-[#fffcf5] px-6">
                <div className="w-full py-5">
                  <div className="w-full">
                    <div className="text-red-500 text-xl">Đã hủy đơn hàng</div>
                    <span className="text-sm text-gray-400">Yêu cầu vào: {formatDateTime(order.updated_at)}</span>
                  </div>
                </div>
              </div>
            )}
            <div className="bg-white px-5 py-3">
              <div className="w-full ">
                <div className='flex gap-3 items-end pb-4 border-b'>
                  <p className='font-semibold text-[16px]'>{order.shop.shop_name ? order.shop.shop_name : 'Shop đã biến mất'}</p>
                  <button className='p-1 flex items-center justify-center gap-1 border bg-blue-700 rounded-sm text-white'>
                    <MailPlus size={12} />
                    <p className="text-[12px]">Chat</p>
                  </button>
                  <button className='p-1 flex items-center justify-center gap-1 border rounded-sm text-gray-500 font-semibold'>
                    <Store size={12} />
                    <p className="text-[12px]">Xem Shop</p>
                  </button>
                </div>
                <div className="w-full">
                  {order.order_details.map((o: any, key: number) => (
                    <div key={key} className={`w-full py-4 ${order.order_details.length - 1 !== key ? 'border-b' : ''}`}>
                      <div className="w-full flex">
                        <div className=" pr-4">
                          <div className="size-[85px] border rounded-sm"> <img src={o.variant ? o.variant.images : o.product.image} className="  size-full" alt="" /></div>
                        </div>
                        <div className="w-full mr-4">
                          <div className="mb-[2px] text-sm font-medium">
                            <span>{o.product.name}</span>
                          </div>
                          {o.variant && (
                            <div className="mb-[2px] text-[12px] text-gray-400">
                              <span>{o.variant.name}</span>
                            </div>
                          )}
                          <div className="text-sm">x{o.quantity}</div>
                        </div>
                        <div className="flex flex-col justify-center text-[13px] text-gray-700">
                          {formattedPrice(+o.subtotal)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            </div>
            <div className="w-full bg-[#fffefc] border-t border-dotted">
              {+order.order_status !== 10 && (
                <>
                  <div className="px-6 flex justify-end items-center border-b border-dotted">
                    <div className="px-[10px] py-[13px] text-[12px] text-gray-500">
                      <span>Tổng tiền hàng</span>
                    </div>
                    <div className="py-[13px] pl-[10px] border-l text-sm w-[240px] text-end">
                      <span>{formattedPrice(+order.price_before_vat)}</span>
                    </div>
                  </div>
                  <div className="px-6 flex justify-end items-center border-t border-dotted">
                    <div className="px-[10px] py-[13px] text-[12px] text-gray-500">
                      <span>Thuế giá trị gia tăng</span>
                    </div>
                    <div className="py-[13px] pl-[10px] border-l text-sm w-[240px] text-end">
                      <span>{formattedPrice(+order.vat)}</span>
                    </div>
                  </div>
                  <div className="px-6 flex justify-end items-center border-t border-dotted">
                    <div className="px-[10px] py-[13px] text-[12px] text-gray-500">
                      <span>Phí vận chuyển</span>
                    </div>
                    <div className="py-[13px] pl-[10px] border-l text-sm w-[240px] text-end">
                      <span>{formattedPrice(+order.ship_fee)}</span>
                    </div>
                  </div>
                  <div className="px-6 flex justify-end items-center border-t border-dotted">
                    <div className="px-[10px] py-[13px] text-[12px] text-gray-500">
                      <span>Thành viên {profile.rank.title}</span>
                    </div>
                    <div className="py-[13px] pl-[10px] border-l text-sm w-[240px] text-end">
                      <span>-{formattedPrice(+order.disscount_by_rank)}</span>
                    </div>
                  </div>
                  {(order.voucher_shop_disscount !== '0') && (
                    <div className="px-6 flex justify-end items-center border-t border-dotted">
                      <div className="px-[10px] py-[13px] text-[12px] text-gray-500">
                        <span>Voucher từ shop</span>
                      </div>
                      <div className="py-[13px] pl-[10px] border-l text-sm w-[240px] text-end">
                        <span>-{formattedPrice(+order.voucher_shop_disscount)}</span>
                      </div>
                    </div>
                  )}
                  {order.voucher_disscount !== '0' && (
                    <div className="px-6 flex justify-end items-center border-t border-dotted">
                      <div className="px-[10px] py-[13px] text-[12px] text-gray-500">
                        <span>Voucher từ VNShop</span>
                      </div>
                      <div className="py-[13px] pl-[10px] border-l text-sm w-[240px] text-end">
                        <span>-{formattedPrice(+order.voucher_disscount)}</span>
                      </div>
                    </div>
                  )}
                  <div className="px-6 flex justify-end items-center border-t border-dotted">
                    <div className="px-[10px] py-[13px] text-[12px] text-gray-500">
                      <span>Thành tiền</span>
                    </div>
                    <div className="py-[13px] pl-[10px] border-l text-sm w-[240px] text-end">
                      <span className="text-xl text-red-500 font-semibold">{formattedPrice(+order.total_amount)}</span>
                    </div>
                  </div>
                </>
              )}
              {+order.order_status === 10 && (
                <div className="px-6 flex justify-end items-center border-t border-dotted">
                  <div className="px-[10px] py-[13px] text-[12px] text-gray-500">
                    <span>Yêu cầu bởi</span>
                  </div>
                  <div className="py-[13px] pl-[10px] border-l text-sm w-[240px] text-end">
                    <span className="text-sm">Người mua</span>
                  </div>
                </div>
              )}

              <div className="px-6 flex justify-end items-center border-t border-dotted rounded-bl-sm rounded-br-sm">
                <div className="px-[10px] py-[13px] text-[12px] text-gray-500">
                  <span>Phương thức thanh toán</span>
                </div>
                <div className="py-[13px] pl-[10px] border-l text-sm w-[240px] text-end">
                  <span className="text-sm">{order.payment.name}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
