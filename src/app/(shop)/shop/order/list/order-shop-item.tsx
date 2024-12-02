'use client'

import { formattedPrice } from "@/lib/utils"
import { CircleUserRound, Ellipsis, EllipsisIcon, EllipsisVertical, Truck, X } from "lucide-react"
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


type OrderStatus = { label: string; value: number, valueString: any };

const orderStatuses: OrderStatus[] = [
  {
    valueString: (<div className="text-[#f5a623] font-medium">Chờ xác nhận</div>),
    value: 0,
    label: 'Chờ xác nhận',
  },
  {
    valueString: (<div className="text-blue-700 font-medium">Đã xác nhận</div>),
    value: 1,
    label: 'Đã xác nhận',
  },
  {
    valueString: (<div className="text-[#e6b800] font-medium">Đang chuẩn bị hàng</div>),
    value: 2,
    label: 'Đang chuẩn bị hàng',
  },
  {
    valueString: (<div className="text-[#f3a322] font-medium">Đã đóng gói</div>),
    value: 3,
    label: 'Đã đóng gói',
  },
  {
    valueString: (<div className="text-[#d87c00] font-medium">Đã bàn giao vận chuyển</div>),
    value: 4,
    label: 'Đã bàn giao vận chuyển',
  },
  {
    valueString: (
      <div className="text-[#16b9ae] font-medium flex gap-2">
        <Truck className="text-[#16b9ae]" size={20} strokeWidth={1.25} /> Đang vận chuyển
      </div>
    ),
    value: 5,
    label: 'Đang vận chuyển',
  },
  {
    valueString: (
      <div className="text-red-500 font-medium flex gap-2">
        <Truck className="text-red-500" size={20} strokeWidth={1.25} /> Giao hàng thất bại
      </div>
    ),
    value: 6,
    label: 'Giao hàng thất bại',
  },
  {
    valueString: (<div className="text-green-500 font-medium">Đã giao hàng</div>),
    value: 7,
    label: 'Đã giao hàng',
  },
  {
    valueString: (<div className="text-green-600 font-medium">Hoàn thành</div>),
    value: 8,
    label: 'Hoàn thành',
  },
  {
    valueString: (<div className="text-purple-600 font-medium">Hoàn trả</div>),
    value: 9,
    label: 'Hoàn trả',
  },
  {
    valueString: (
      <div className="text-red-500 font-medium flex gap-2">
        <X className="text-red-500" size={20} strokeWidth={1.25} /> Đã hủy
      </div>
    ),
    value: 10,
    label: 'Đã hủy',
  },
];

const nextActionOrders: { label: any, currValue: number, nextValue: number }[] = [
  {
    label: <div className="px-2 text-orange-500 cursor-pointer flex flex-col hover:underline">Xác nhận đơn hàng</div>,
    currValue: 0,
    nextValue: 1,
  },
  {
    label: <div className="px-2 text-orange-500 cursor-pointer flex flex-col hover:underline">Chuẩn bị đơn hàng</div>,
    currValue: 1,
    nextValue: 2,
  },
  {
    label: <div className="px-2 text-orange-500 cursor-pointer flex flex-col hover:underline">Xác nhận đóng gói</div>,
    currValue: 2,
    nextValue: 3,
  },
  {
    label: <div className="px-2 text-orange-500 cursor-pointer flex flex-col hover:underline">Xác nhận bàn giao GHN</div>,
    currValue: 3,
    nextValue: 4,
  },
  {
    label: <div className="px-2 text-[#0fa8a6] cursor-pointer flex flex-col hover:underline">Xác nhận đang vận chuyển</div>,
    currValue: 4,
    nextValue: 5,
  },
  {
    label: <div className="px-2 text-green-600 cursor-pointer flex flex-col hover:underline">Xác nhận hoàn thành</div>,
    currValue: 7,
    nextValue: 8,
  },
  {
    label: <div className="px-2 text-purple-600 cursor-pointer flex flex-col hover:underline">Xác nhận hoàn trả</div>,
    currValue: 8,
    nextValue: 9,
  },
];

export default function OrderShopItem({ o }: { o: any }) {
  return (
    <div className="mt-4 ">
      <div className="px-4 h-10 flex rounded-tl-sm border  rounded-tr-sm items-center justify-between bg-[#f5f8fd]  text-black text-[14px]">
        <div className="h-full flex items-center text-black gap-2 font-semibold">
          <div className="h-full flex items-center">
            <CircleUserRound size={20} strokeWidth={1.5} />
          </div>
          <div className="flex h-full items-center">Mã đơn hàng: #{o.id}</div>
        </div>
      </div>
      <div className="w-full h-full text-[14px] flex p-4 border-t-0 border rounded-bl-sm rounded-br-sm">
        <div className="w-full flex -mx-2">
          <div className="flex-[2] px-2">
            {o.order_details.map((od: any, subIndex: number) => (
              <div key={subIndex} className="-mx-2 mb-2">
                <div className="flex w-full justify-between px-2">
                  <div className="flex gap-2 items-center">
                    <div className="size-[56px] mr-2">
                      <img src={od?.variant ? od.variant.images : od.product.image} className="size-full object-cover border rounded-sm" alt="" />
                    </div>
                    <div className="h-full">
                      <div className="font-semibold">{od?.product?.name || "Tên sản phẩm"}</div>
                      {od?.variant && (
                        <div>Phân loại: {od.variant.name}</div>
                      )}
                    </div>
                  </div>
                  <div className="text-[12px] mr-4">x{od.quantity}</div>
                </div>
              </div>
            ))}

          </div>
          <div className="flex-1 px-2 flex flex-col">
            <div className="text-black font-medium">{formattedPrice(+o.total_amount)}</div>
            <div className="text-[#585858] mt-1">
              {o?.payment?.name ? o?.payment?.name : "Thanh toán khi nhận hàng"}
            </div>
          </div>
          <div className="flex-1 px-2 flex flex-col ">
            {orderStatuses.find(od => od.value === +o.order_status)?.valueString}
            {+o.order_status === +10 && (
              <div className="text-[#585858] mt-1">{+o.updated_by === +o.user_id ? "Đã hủy bởi người mua" : "Đã hủy bởi người bán"}</div>
            )}
          </div>
          <div className="w-[160px] px-2 font-semibold items-center">


            {o.status === '1' ?
              <div className="text-sm text-red-500">Chưa thanh toán</div>
              :
              <div className="text-sm text-green-600">Thanh toán</div>
            }
          </div>
          <div className="flex-[0.5] px-2 flex flex-col">
            {/* <div className="text-black font-medium">Nhanh</div> */}
            <div className="text-black">GHN</div>
          </div>
          <div className="flex-[0.5] px-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Ellipsis />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="p-0">
                <DropdownMenuLabel className="p-2 font-normal flex flex-col gap-2">
                  <Link href={`/shop/order/list/${o.id}`} className="px-2 text-blue-700 hover:underline cursor-pointer flex flex-col">Xem chi tiết</Link>
                  {nextActionOrders.find(n => n.currValue === +o.order_status)?.label || ""}
                  {+o.order_status === 5 && (
                    <>
                      <div className="px-2 text-red-500 cursor-pointer flex flex-col hover:underline">Xác nhận giao hàng thất bại</div>
                      <div className="px-2 text-[#0fa59e] cursor-pointer flex flex-col hover:underline">Xác nhận giao hàng thành công</div>
                    </>
                  )}
                  {+o.order_status === 0 && (
                    <div className="px-2 text-red-500 cursor-pointer flex flex-col hover:underline">Xác nhận hủy đơn hàng</div>
                  )}
                </DropdownMenuLabel>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
  )
}
