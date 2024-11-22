'use client'

import envConfig from "@/config";
import { clientAccessToken } from "@/lib/http";
import { formattedPrice } from "@/lib/utils";
import { MailPlus, Store, Truck } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import OrderSkeleton from "@/app/(guest)/account/orders/order-skeleton";
import Link from "next/link";

const titles: { id: number, title: string, status: number }[] = [
  { id: 1, title: "Chờ xác nhận", status: 0 },
  { id: 2, title: "Đã xác nhận", status: 1 },
  { id: 3, title: "Chờ giao hàng", status: 5 },
  { id: 4, title: "Hoàn thành", status: 8 },
  { id: 5, title: "Trả hàng/Hoàn tiền", status: 9 }
]

export default function OrdersGuestSection() {
  const [orders, setOrders] = useState<any[]>([]);
  const [status, setStatus] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [pages, setPages] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  console.log({ loading, orders: orders.length });

  useEffect(() => {
    // const controller = new AbortController(); // Khởi tạo AbortController
    // const signal = controller.signal;
    const getData = async () => {
      try {
        setLoading(true);
        window.scrollTo({
          top: 0,
          behavior: 'smooth', // Thêm smooth để tạo hiệu ứng cuộn mượt
        });
        const ordersRes = await fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT_1}/api/order/user?status=${status}&page=${page}`, {
          headers: {
            "Authorization": `Bearer ${clientAccessToken.value}`
          },
          // signal,
          cache: 'no-cache'
        });

        if (!ordersRes.ok) {
          throw 'Error nè';
        }
        const ordersPayload = await ordersRes.json();
        setOrders([...ordersPayload.data.data]);
        setPages([...ordersPayload.data.links]);

        setLoading(false);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    getData();
    // return () => {
    //   controller.abort();
    // };
  }, [status, page])

  return (
    <div className="">
      <div className='nav-menu w-full flex items-center bg-white rounded sticky top-[130px]'>
        {
          titles.map((item) => (
            <div onClick={() => {
              setStatus(item.status);
              setPage(1);
            }} key={item.id} className={`h-full py-4 flex flex-1 items-center justify-center text-sm font-semibold cursor-pointer border-b-2 hover:text-blue-700 ${item.status === status ? 'border-blue-600 text-blue-700' : ''}`}>{item.title}</div>
          ))
        }
      </div>
      <div>
        {loading && (
          <>
            <OrderSkeleton key={1} />
            <OrderSkeleton key={2} />
          </>
        )}
        {!loading && orders.length > 0 ? orders.map((o: any, index: number) => (
          <div key={o.id} className="my-3 ">
            <div className=' w-full  flex flex-col gap-3 p-6 border border-b-0 rounded bg-white ' >
              <div className="w-full">
                <div className='nav-list-product w-full flex justify-between pb-3 border-b'>
                  <div className='flex gap-3 items-end '>
                    <p className='font-semibold text-[16px]'>{o.shop.shop_name ? o.shop.shop_name : 'Shop đã biến mất'}</p>
                    <button className='p-1 flex items-center justify-center gap-1 border bg-blue-700 rounded-sm text-white'>
                      <MailPlus size={12} />
                      <p className="text-[12px]">Chat</p>
                    </button>
                    <button className='p-1 flex items-center justify-center gap-1 border rounded-sm text-gray-500 font-semibold'>
                      <Store size={12} />
                      <p className="text-[12px]">Xem Shop</p>
                    </button>
                  </div>
                  {+o.order_status === 12 ? (
                    <div>Đã thanh toán</div>
                  ) : (<div>Chưa thanh toán</div>)}
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
                              <Link href={`/products/${d.product.slug}`} >{d.product.name ? d.product.name : 'Sản phẩm không hoạt động'}</Link>
                              {d?.variant && (
                                <span className='text-sm text-gray-500'>Phân loại hàng: {d.variant.name}</span>
                              )}
                              <span className="text-sm">x{d.quantity}</span>
                            </div>
                            <div className='flex items-center gap-1 font-semibold'>
                              <span className="font-semibold">
                                {formattedPrice(+d.subtotal)}
                              </span>
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
        )) : (
          <div className="w-full bg-white mt-4 rounded h-[540px] flex items-center">
            <div className="w-full flex flex-col items-center">
              <img className="size-[100px]" src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/return/5fafbb923393b712b964.png" alt="" />
              <div className="mt-2">Bạn không có đơn hàng nào {titles.find(t => t.status === status)?.title ?? ''}</div>
            </div>
          </div>
        )}

      </div>
      <div className="w-full mt-6 flex justify-end">
        {orders.length > 0 && (
          <Pagination className="justify-end">
            <PaginationContent>
              {pages[0].url && (
                <PaginationItem key={'back'}>
                  <PaginationPrevious content="Back" onClick={() => {
                    setPage(page - 1);
                  }} />
                </PaginationItem>
              )}


              {pages.filter((l: any) => {
                return typeof +l.label === 'number' && !isNaN(+l.label)
              }).map((p, index) => (
                <PaginationItem key={p.label}>
                  <PaginationLink onClick={() => {
                    setPage(+p.label)
                  }} isActive={+p.label === page} className="cursor-pointer">{index + 1}</PaginationLink>
                </PaginationItem>
              ))}
              {pages[pages.length - 1].url && (
                <PaginationItem key={'next'}>
                  <PaginationNext onClick={() => {
                    setPage(page + 1)
                  }} />
                </PaginationItem>
              )}

            </PaginationContent>
          </Pagination>
        )}
      </div>
    </div>
  )
}
