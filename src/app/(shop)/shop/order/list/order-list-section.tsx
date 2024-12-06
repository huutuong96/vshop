'use client'

import EmptyOrder from "@/app/(shop)/_components/empty-order";
import OrderItem from "@/app/(shop)/_components/order-item";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area";
import { ScrollAreaViewport } from "@radix-ui/react-scroll-area";
import { useEffect, useState } from "react";
import envConfig from "@/config";
import { clientAccessToken } from "@/lib/http";
import { toast } from "@/components/ui/use-toast";
import { useAppInfoSelector } from "@/redux/stores/profile.store";
import { CircleUserRound, EllipsisVertical, Truck, UserRoundCheck } from "lucide-react";
import { formattedPrice } from "@/lib/utils";
import OrderSkeleton from "@/app/(shop)/shop/order/list/order-skeleton";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import Link from "next/link";
import OrderShopItem from "@/app/(shop)/shop/order/list/order-shop-item";


type OrderStatus = { label: string; value: number, valueString: any };

const orderStatuses: OrderStatus[] = [
  {
    valueString: (<div className="text-[#d2b510] font-medium">Chờ xác nhận</div>),
    value: 0,
    label: 'Chờ xác nhận'
  },
  { valueString: (<div className="text-blue-700 font-medium">Đã xác nhận</div>), value: 1, label: 'Đã xác nhận' },
  { valueString: (<div className="text-[#f3a322] font-medium">Đang chuẩn bị hàng</div>), value: 2, label: 'Đang chuẩn bị hàng' },
  { valueString: (<div className="text-[#f3a322] font-medium">Đã đóng gói</div>), value: 3, label: 'Đã đóng gói' },
  { valueString: (<div className="text-[#f3a322] font-medium">Đã bàn giao vận chuyển</div>), value: 4, label: 'Đã bàn giao vận chuyển' },
  { valueString: (<div className="text-[#16b9ae] font-medium flex gap-2"><Truck className="text-[#16b9ae]" size={20} strokeWidth={1.25} /> Đang vận chuyển</div>), value: 5, label: 'Đang vận chuyển' },
  { valueString: (<div className="text-red-500 font-medium flex gap-2"><Truck className="text-red-500" size={20} strokeWidth={1.25} /> Giao hàng thất bại</div>), value: 6, label: 'Giao hàng thất bại' },
  { valueString: (<div className="text-green-500 font-medium">Đã giao hàng</div>), value: 7, label: 'Đã giao hàng' },
  { valueString: (<div className="text-green-500 font-medium">Hoàn thành</div>), value: 8, label: 'Hoàn thành' },
  { valueString: (<div className="text-purple-600 font-medium">Hoàn trả</div>), value: 9, label: 'Hoàn trả' },
  { valueString: (<div className="text-red-500 font-medium">Đã hủy</div>), value: 10, label: 'Đã hủy' },
  // { label: "Chưa thanh toán", value: 11 },
  // { label: "Đã thanh toán", value: 12 },
];

const nextActionOrders: { label: string, currValue: number, nextValue: number }[] = [
  {
    label: "Xác nhận đơn hàng",
    currValue: 0,
    nextValue: 1
  }, {
    label: 'Chuẩn bị đơn hàng',
    currValue: 1,
    nextValue: 2
  }, {
    label: 'Xác nhận đóng gói',
    currValue: 2,
    nextValue: 3
  }, {
    label: "Xác nhận bàn giao GHN",
    currValue: 3,
    nextValue: 4
  }, {
    label: "Xác nhận đang vận chuyển",
    currValue: 4,
    nextValue: 5
  }, {
    label: "Xác nhận hoàn thành",
    currValue: 7,
    nextValue: 8
  }, {
    label: "Xác nhận hoàn trả",
    currValue: 8,
    nextValue: 9
  }
]

const handleChangeSearchParams = (page: number, sort: string, order_status: number, limit: string) => {
  return `${page ? `&page=${page}` : ''}&limit=${limit}&order_status=${order_status}`
}


const filters = [
  {
    id: '0',
    name: 'Mã đơn hàng',
    placehoder: 'Nhập mã đơn hàng'
  }, {
    id: '1',
    name: 'Mã vận đơn',
    placehoder: 'Nhập mã vận đơn'
  }, {
    id: '2',
    name: 'Tên người mua',
    placehoder: 'Nhập tên người mua'
  }, {
    id: '3',
    name: 'Sản phẩm',
    placehoder: 'Nhập tên sản phẩm/SKU'
  }
];

export default function OrderListSection() {
  const [showAll, setShowAll] = useState(false);
  const MAX_ITEMS = 6;
  const visibleItems = showAll ? orderStatuses : orderStatuses.slice(0, MAX_ITEMS);
  const info = useAppInfoSelector(state => state.profile.info);
  const [orders, setOrders] = useState<any>([]);
  const [status, setStatus] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [sort, setSort] = useState<string>('');
  const [limit, setLimit] = useState<string>('10');
  const [pages, setPages] = useState<any[]>([]);
  const [countOrder, setCountOrder] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const handleChangeStatus = (value: number) => {
    setStatus(value)
  }

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT_1}/api/shop/order/${info.shop_id}?${handleChangeSearchParams(page, sort, status, limit)}`, {
          headers: {
            "Authorization": `Bearer ${clientAccessToken.value}`
          }
        });
        const payload = await res.json();
        if (!res.ok) {
          throw 'Error';
        }
        setOrders([...payload.data.data]);
        setPages([...payload.data.links]);
        setCountOrder(+payload.data.total);
      } catch (error) {
        toast({
          title: "error",
          variant: 'destructive'
        })
      } finally {
        setLoading(false);
      }
    }
    getData()
  }, [handleChangeSearchParams(page, sort, status, limit)])

  return (
    <>
      <div className="flex p-2 items-center justify-between">
        <span className="text-[20px] font-bold">Tất Cả</span>
        <div className="flex items-center gap-2">
          <Button variant={"outline"}>Xuất</Button>
          <Button variant={"outline"}>Lịch sử Xuất Báo Cáo</Button>
        </div>
      </div>
      <div className="bg-white shadow-sm rounded-sm">
        <div className="px-3 py-2">
          <div className="flex flex-wrap gap-2">
            {visibleItems.map((item) => (
              <div
                onClick={() => {
                  handleChangeStatus(item.value);
                  setPage(1)
                }}
                key={item.value}
                className={`
              text-[14px] text-[#3e3e3e] py-2 font-semibold cursor-pointer px-5  border-b-2
              hover:text-blue-700 hover:border-b-blue-700
                ${status === item.value ? "text-blue-700 border-b-blue-700" : "border-b-white"}
            `}
              >
                {item.label}
              </div>
            ))}
            {orderStatuses.length > MAX_ITEMS && (
              <div
                onClick={() => setShowAll(!showAll)}
                className="py-2 px-5 text-sm text-blue-700 cursor-pointer hover:underline"
              >
                {showAll ? "Ẩn bớt" : "Xem thêm"}
              </div>
            )}
          </div>

        </div>
        <div className="flex items-center justify-between w-full p-4 px-3 bg-white">
          <div className="flex">
            <Select defaultValue={filters[0].id}>
              <SelectTrigger className="w-[250px] rounded-none rounded-tl rounded-bl">
                <SelectValue placeholder="Mã Đơn Hàng" className="text-[13px]" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {filters.map((item, index) => (
                    <SelectItem key={index} className="text-[13px]" value={item.id}>{item.name}</SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <Input className="px-3 text-[14px] outline-none rounded-none rounded-tr rounded-br" placeholder="Nhập mã đơn hàng" />
          </div>
          <Select>
            <SelectTrigger className="w-[250px] outline-none">
              <SelectValue placeholder="Đơn Vị Vận Chuyển" className="text-[13px]" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem className="text-[13px]" value={'test'}>test</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <div className="flex gap-2">
            <button className="border-blue-500 text-blue-500 hover:border-blue-500 border text-[14px] p-2 rounded">Áp dụng</button>
            <Button variant={'default'}>Đặt lại</Button>
          </div>
        </div>
        <div className="px-4 py-2 text-[16px] font-semibold">{countOrder} Đơn hàng</div>
        <div className="px-4 py-2">
          <div className="w-full h-full border-blue-50 px-4 py-3 border text-[14px] flex items-center rounded bg-[#f5f8fd]  text-[#000000ba]">
            <div className="w-full flex -mx-2">
              <div className="flex-[2] px-2 font-semibold">Sản phẩm</div>
              <div className="flex-1 px-2 font-semibold  ">Tổng đơn hàng</div>
              <div className="flex-1 px-2 font-semibold ">Trạng thái</div>
              <div className="w-[160px] px-2 font-semibold items-center">Thanh toán</div>
              <div className="flex-[0.5] px-2 font-semibold ">Vận chuyển</div>
              <div className="flex-[0.5] px-2 font-semibold ">Thao tác</div>
            </div>
          </div>
          {!loading && orders.map((o: any, index: number) => (
            <OrderShopItem setStatus={setStatus} key={index} o={o} />
          ))}
          {loading && <OrderSkeleton />}
          <div className="flex justify-between items-center mt-6">
            <div className="flex gap-2 items-center">
              Chọn
              <Select value={limit} onValueChange={(v) => {
                setLimit(v);
                setPage(1);
              }}>
                <SelectTrigger className="w-[60px]">
                  <SelectValue placeholder={limit} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                </SelectContent>
              </Select>
              <div className="w-[100px]">Đơn hàng</div>
            </div>
            {pages.length > 3 && (
              <Pagination className="flex justify-end">
                <PaginationContent>
                  {[...pages].shift().url && (
                    <PaginationItem onClick={() => setPage(page - 1)}>
                      <PaginationPrevious />
                    </PaginationItem>
                  )}

                  {pages.slice(1, pages.length - 1).map((p: any, index: number) => (
                    <PaginationItem key={index} onClick={() => setPage(p.label)} className="cursor-pointer">
                      <PaginationLink isActive={+p.label === +page}>{p.label}</PaginationLink>
                    </PaginationItem>
                  ))}

                  {/* <PaginationItem>
                        <PaginationEllipsis />
                      </PaginationItem> */}
                  {[...pages].pop().url && (
                    <PaginationItem onClick={() => setPage(page + 1)}>
                      <PaginationNext />
                    </PaginationItem>
                  )}

                </PaginationContent>
              </Pagination>
            )}
          </div>

          {/* <div className="mt-4 border rounded-sm">
            <div className="p-2 flex items-center justify-between bg-[#F0F0F0] text-black text-[14px]">
              <span>Khách hàng: Test2</span>
              <span>Mã đơn hàng: 01234544ds5</span>
            </div>
            <div className="w-full h-full text-[14px] flex">
              <div className="w-[364px] p-2 pr-6">
                <div className="flex w-full justify-between mt-1">
                  <div className="flex gap-2 items-center">
                    <div className="size-[92px]">
                      <img src="https://down-vn.img.susercontent.com/file/vn-11134207-7qukw-lk0onee5bmb8cc" className="size-full object-cover border" alt="" />
                    </div>
                    <div className="">
                      <div className="flex flex-col mt-1 ml-2">
                        <span className="font-bold">Áo màu vàng</span>
                        <span>Phân loại: màu vàng, size XL</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-[12px]">x1</div>
                </div>
                <div className="flex w-full justify-between mt-1">
                  <div className="flex gap-2 items-center">
                    <div className="size-[92px]">
                      <img src="https://down-vn.img.susercontent.com/file/vn-11134207-7qukw-lk0onee5bmb8cc" className="size-full object-cover border" alt="" />
                    </div>
                    <div className="">
                      <div className="flex flex-col mt-1 ml-2">
                        <span className="font-bold">Áo màu vàng</span>
                        <span>Phân loại: màu vàng, size XL</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-[12px]">x1</div>
                </div>
              </div>
              <div className="w-[200px] p-2">
                <div className="text-black font-medium">120.000đ</div>
                <div className="text-[#585858] mt-1">Thanh toán khi nhận hàng</div>
              </div>
              <div className="w-[280px] p-2">
                <div className="text-black font-medium">Đã giao</div>
                <div className="text-[#585858] mt-1">Giao hàng thành công</div>
              </div>
              <div className="w-[200px] p-2">
                <div className="text-black font-medium">Nhanh</div>
                <div className="text-[#585858] mt-1">GHTK</div>
              </div>
              <div className="p-2 text-blue-500 cursor-pointer">Xem chi tiết</div>
            </div>
          </div> */}
          {/* <OrderItem />
        <OrderItem /> */}
          {/* <EmptyOrder /> */}
        </div>
      </div>
    </>
  )
}
