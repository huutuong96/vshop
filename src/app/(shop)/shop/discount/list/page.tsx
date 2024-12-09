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

const Page: React.FC = () => {
  const info = useAppInfoSelector(state => state.profile.info);
  const [listVoucherShop, setListVoucherShop] = useState<{ id: number, title: string, description: string, image: string | null, quantity: number, limitValue: number | null, code: string, min: number | null, price: number | null }[]>([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT_1}/api/get_voucher_to_shop/${info.shop_id}`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${clientAccessToken.value}`,
            "Content-Type": "application/json"
          },
        });

        const payload = await res.json();
        if (payload.status) {
          // Lấy dữ liệu từ payload.data[0].data
          const vouchers = payload.data[0]?.data || [];
          setListVoucherShop(vouchers);
        } else {
          console.error(payload.message);
        }
      } catch (error) {
        console.error(error);
      }
    };
    getData();
  }, [info.shop_id]);

  return (
    <>
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
    </>
  );
};

export default Page;
