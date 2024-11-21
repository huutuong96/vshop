'use client'

import { clientAccessToken } from "@/lib/http";
import { formattedPrice } from "@/lib/utils";
import { MailPlus, Store, Truck } from "lucide-react";
import { useEffect, useState } from "react";

const titles: { id: number, title: string }[] = [
  { id: 1, title: "Tất cả" },
  { id: 2, title: "Chờ thanh toán" },
  { id: 3, title: "Chờ giao hàng" },
  { id: 4, title: "Hoàn thành" },
  { id: 5, title: "Trả hàng/Hoàn tiền" }
]

export default function OrdersGuestSection() {
  const tokenUser = clientAccessToken.value
  const [isCheckedTitle, setIsCheckedTitle] = useState<number>(1);
  const [orders, setOrders] = useState<any>([]);
  const [orderDetails, setOrderDetails] = useState<any>([]);
  const [shops, setShops] = useState<any>([]);
  const [products, setProducts] = useState<any>([]);

  useEffect(() => {
    const controller = new AbortController(); // Khởi tạo AbortController
    const signal = controller.signal;
    const getData = async () => {
      try {
        const [ordersRes, shopsRes] = await Promise.all([
          fetch('http://vnshop.top/api/order/user', {
            headers: {
              "Authorization": `Bearer ${clientAccessToken.value}`
            },
            signal
          }),
          fetch('http://vnshop.top/api/shops', {
            headers: {
              "Authorization": `Bearer ${clientAccessToken.value}`
            },
            signal
          })
        ])

        if (!ordersRes.ok || !shopsRes.ok) {
          throw 'Error nè';
        }
        const ordersPayload = await ordersRes.json();
        const shopsPayload = await shopsRes.json();
        // const data = shopsPayload.data.shops.map((s:any) => {
        //   let id = s.id;
        //   let orders = ordersPayload.data.filter((o:any) => id === +o.shop_id);
        //   return {...s, orders}
        // }).filter((s:any) => s.orders.length > 0);
        // setShops([...data])
        // console.log('check data: ====>', data);
        const data = ordersPayload.data.map((o: any) => {
          let id = o.shop_id
          let shopData = shopsPayload.data.shops.find((s: any) => s.id === +id);
          return { ...o, shopData }
        }).filter((o: any) => o.shopData).sort((a: any, b: any) => new Date(b.created_at as Date).getTime() - new Date(a.created_at).getTime())
        console.log(data);
        setOrders([...data]);

      } catch (error) {
        console.log(error);
      }
    }
    getData();
    return () => {
      controller.abort();
    };
  }, [])

  return (
    <div>
      <div className='nav-menu w-full h-[52px] flex items-center bg-white rounded'>
        {
          titles.map((item: any) => (
            <span key={item.id} className={`h-full flex flex-1 items-center justify-center text-sm font-semibold cursor-pointer `}>{item.title}</span>
          ))
        }
      </div>
      <div>
        {
          orders.map((o: any, index: number) => {
            console.log(o);
            return (
              <div key={o.id} className="my-3 ">
                <div className=' w-full  flex flex-col gap-3 p-6 border border-b-0 rounded bg-white ' >
                  <div className="w-full">
                    <div className='nav-list-product w-full h-[35px] flex justify-between pb-3 border-b'>
                      <div className='flex gap-3 items-end '>
                        <p className='font-semibold text-[16px]'>{o.shopData.shop_name ? o.shopData.shop_name : 'Shop đã biến mất'}</p>
                        <button className='p-1 flex items-center justify-center gap-1 border bg-blue-700 rounded-sm text-white'>
                          <MailPlus size={12} />
                          <p className="text-[12px]">Chat</p>
                        </button>
                        <button className='p-1 flex items-center justify-center gap-1 border rounded-sm text-gray-500 font-semibold'>
                          <Store size={12} />
                          <p className="text-[12px]">Xem Shop</p>
                        </button>
                      </div>
                      {/* <div className='flex gap-2 items-end font-semibold text-[#0A68FF]'>
                      <Truck />
                      {
                        o.status == 2 && (
                          <p>Chờ duyệt đơn hàng</p>
                        )
                      }
                      {
                        o.status == 3 && (
                          <p>Đơn hàng đang giao</p>
                        )
                      }
                      {
                        o.status == 4 && (
                          <p>Đơn hàng giao thành công</p>
                        )
                      }
                      {
                        o.status == 5 && (
                          <p>Đơn hàng đã hoàn trả</p>
                        )
                      }
                    </div> */}
                    </div>
                    <div className='w-full flex flex-col justify-between'>
                      {
                        o.order_details.map((d: any, index: number) => {
                          return (
                            <div key={d.id} className={`w-full flex items-center gap-3 py-3 ${o.order_details.length - 1 !== index ? 'border-b' : ''}`}>
                              <div className=''>
                                <img src={`${d.variant ? d.variant.images : d.product.image}`} className='size-20 object-cover' />
                              </div>
                              <div className='w-full flex gap-6 justify-between'>
                                <div className='flex flex-col justify-center'>
                                  <span >{d.product.name ? d.product.name : 'Sản phẩm không hoạt động'}</span>
                                  {d?.variant && (
                                    <span className='text-sm text-gray-500'>Phân loại hàng: {d.variant.name}</span>
                                  )}
                                  <span className="text-sm">x{d.quantity}</span>
                                </div>
                                <div className='flex items-center gap-1 font-semibold'>
                                  <span className="font-semibold">
                                    {formattedPrice(+d.subtotal)}
                                  </span>
                                  {/* <span className='text-[12px]'>-20%</span> */}
                                </div>
                              </div>
                            </div>

                          )
                        })
                      }
                    </div>

                  </div>
                </div>
                <div className='flex gap-5 items-center justify-center border-t border-dashed rounded bg-[#fffefb] '>
                  <div className="w-full px-6 pt-6 py-6">
                    <div className="w-full h-[30px] ">
                      <div className="size-full flex justify-end items-center gap-2">
                        <span className="text-sm">Thành tiền: </span>
                        <div className="text-xl text-red-500 font-semibold">{formattedPrice(+o.total_amount)}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            )
          })
        }
      </div>
    </div>
  )
}
