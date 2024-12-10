'use client'
import React, { useEffect, useState } from 'react';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import envConfig from '@/config';
import { useAppInfoSelector } from '@/redux/stores/profile.store';
import { clientAccessToken } from '@/lib/http';
import { Link } from 'lucide-react';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
const handleChangeSearchParams = (page: number, limit: string) => {
  return `${page ? `&page=${page}` : ''}&limit=${limit}`
}

const ListDiscountVoucherPage: React.FC = () => {
  const info = useAppInfoSelector(state => state.profile.info);
  const [listVoucherShop, setListVoucherShop] = useState<{ id: number, title: string, description: string, image: string | null, quantity: number, limitValue: number | null, code: string, min: number | null, price: number | null }[]>([]);
  const [limit, setLimit] = useState<string>('10');
  const [pages, setPages] = useState<any[]>([]);
  const [page, setPage] = useState<number>(1);
  
  
  useEffect(() => {
    const controller = new AbortController(); // Khởi tạo AbortController
    const signal = controller.signal;
    const getData = async () => {
      try {
        const res = await fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT_1}/api/get_voucher_to_shop/${info.shop_id}?${handleChangeSearchParams(page, limit)}`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${clientAccessToken.value}`,
            "Content-Type": "application/json"
          },signal
        });
        const payload = await res.json();
        if (!res.ok) {
          throw "error";
        }
        setListVoucherShop(payload.data[0].data);
        setPages(payload.data[0].links);
      } catch (error) {
        console.error(error);
      }
    };
    if (info.shop_id) getData();
    return () => {
      controller.abort();
    };
  }, [handleChangeSearchParams(page, limit)]);
  console.log(listVoucherShop);
  
  return (
    <>
    <div className='w-full text-xl text-black font-semibold mb-4'>
      Danh sách voucher
    </div>
      <div className='bg-white border rounded-sm p-2'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Tiêu đề</TableHead>
            <TableHead>Mô tả</TableHead>
            <TableHead>Image</TableHead>
            <TableHead>Số lượng</TableHead>
            <TableHead>Limit Value</TableHead>
            <TableHead>Code</TableHead>
            <TableHead>Min</TableHead>
            <TableHead>Price</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {listVoucherShop.map((voucher) => (
            <TableRow key={voucher.id}>
              <TableCell>{voucher.id}</TableCell>
              <TableCell>{voucher.title}</TableCell>
              <TableCell>{voucher.description}</TableCell>
              <TableCell>{voucher.image || "Không có"}</TableCell>
              <TableCell>{voucher.quantity}</TableCell>
              <TableCell>{voucher.limitValue || "Không có"}</TableCell>
              <TableCell>{voucher.code}</TableCell>
              <TableCell>{voucher.min || "Không có"}</TableCell>
              <TableCell>{voucher.price || "Không có"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </div>
      <div>
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
    </>
  );
};

export default ListDiscountVoucherPage;
