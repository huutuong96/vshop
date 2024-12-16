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
import { useCallback, useEffect, useState } from "react";
import envConfig from "@/config";
import { clientAccessToken } from "@/lib/http";
import { toast } from "@/components/ui/use-toast";
import { useAppInfoSelector } from "@/redux/stores/profile.store";
import { ArrowDown, ArrowUp, CircleUserRound, Clock, EllipsisVertical, SortAsc, SortDesc, Truck, UserRoundCheck } from "lucide-react";
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
import debounce from 'lodash/debounce';

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




const handleChangeSearchParams = (page: number, sort: string, order_status: number, limit: string, search: string) => {
  return `${page ? `&page=${page}` : ''}&limit=${limit}&order_status=${order_status}${search ? `&search=${search}` : ''}${sort !== '#' ? `&sort=${sort}` : ''}`;
}

const sortOptions: { value: string, label: string, icon: any }[] = [
  { value: '#', label: 'Mặc định', icon: '' },
  { value: 'price', label: 'Giá tăng dần', icon: <ArrowUp /> },
  { value: '-price', label: 'Giá giảm dần', icon: <ArrowDown /> },
  { value: 'updated_at', label: 'Cũ nhất', icon: <Clock /> },
  { value: '-updated_at', label: 'Mới nhất', icon: <Clock /> },
  { value: 'name', label: 'Tên khách hàng từ A → Z', icon: <SortAsc /> },
  { value: '-name', label: 'Tên khách hàng từ Z → A', icon: <SortDesc /> },
];


export default function OrderListSection() {
  const [showAll, setShowAll] = useState(false);
  const MAX_ITEMS = 6;
  const visibleItems = showAll ? orderStatuses : orderStatuses.slice(0, MAX_ITEMS);
  const info = useAppInfoSelector(state => state.profile.info);
  const [orders, setOrders] = useState<any>([]);
  const [status, setStatus] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [sort, setSort] = useState<string>('#');
  const [limit, setLimit] = useState<string>('10');
  const [pages, setPages] = useState<any[]>([]);
  const [countOrder, setCountOrder] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>('')

  const handleChangeStatus = (value: number) => {
    setStatus(value)
  }


  const fetchOrders = useCallback(
    debounce(async (searchValue: string) => {
      try {
        setLoading(true);
        const res = await fetch(
          `${envConfig.NEXT_PUBLIC_API_ENDPOINT_1}/api/shop/order/${info.shop_id}?${handleChangeSearchParams(
            page,
            sort,
            status,
            limit,
            searchValue
          )}`,
          {
            headers: {
              Authorization: `Bearer ${clientAccessToken.value}`,
            },
          }
        );
        const payload = await res.json();
        if (!res.ok) {
          throw 'Error';
        }
        setOrders([...payload.data.data]);
        setPages([...payload.data.links]);
        setCountOrder(+payload.data.total);
      } catch (error) {
        toast({
          title: 'Error',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    }, 500),
    [page, sort, status, limit, info.shop_id]
  );

  // Effect to fetch orders on search or status change
  useEffect(() => {
    fetchOrders(search);
  }, [search, page, sort, status, limit]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    fetchOrders(event.target.value); // Debounced function
  };

  return (
    <>
      <div className="flex p-2 items-center justify-between">
        <span className="text-[20px] font-bold">Tất Cả</span>
        {/* <div className="flex items-center gap-2">
          <Button variant={"outline"}>Xuất</Button>
          <Button variant={"outline"}>Lịch sử Xuất Báo Cáo</Button>
        </div> */}
      </div>
      <div className="bg-white shadow-sm rounded-sm relative">
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
            <Input
              className="px-3 text-sm w-[400px]"
              value={search}
              onChange={handleSearchChange}
              placeholder="Nhập mã đơn hàng hoặc tên khách hàng"
            />
          </div>
          <Select value={sort} onValueChange={(v) => setSort(v)}>
            <SelectTrigger className="w-[250px]">
              <SelectValue placeholder="Sắp xếp" />
            </SelectTrigger>
            <SelectContent className="w-full">
              <SelectGroup className="w-full">
                <ScrollArea className="h-40 w-full">
                  <SelectLabel className="w-full">Sắp xếp đơn hàng</SelectLabel>
                  {sortOptions.map((s, index) => (
                    <SelectItem className="w-full" key={index} value={s.value}>
                      <div className="w-full flex items-center justify-between">
                        {s.label}
                      </div>
                    </SelectItem>
                  ))}
                </ScrollArea>

              </SelectGroup>
            </SelectContent>
          </Select>
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
          <div className="flex justify-between items-center mt-6 sticky top-0 bg-white z-10 shadow-sm">
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
        </div>
      </div>
    </>
  )
}
