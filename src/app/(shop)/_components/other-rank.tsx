'use client'
import { Skeleton } from '@/components/ui/skeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import envConfig from '@/config';
import { clientAccessToken } from '@/lib/http';
import { useAppInfoSelector } from '@/redux/stores/profile.store';
import { useEffect, useState } from 'react';
const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
]

export default function OtherRank() {
  const info = useAppInfoSelector(state => state.profile.info);
  const [products, setProducts] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const [productsRes, usersRes] = await Promise.all([
          fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT_1}/api/shop/best_selling_products/${info.shop_id}`, {
            headers: {
              'Authorization': `Bearer ${clientAccessToken.value}`
            }
          }),
          fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT_1}/api/shop/top_user_paid/${info.shop_id}`, {
            headers: {
              'Authorization': `Bearer ${clientAccessToken.value}`
            }
          })
        ])

        if (!productsRes.ok || !usersRes.ok) {
          throw 'Error';
        }
        const productsPayload = await productsRes.json();
        const usersPayload = await usersRes.json();
        setProducts([...productsPayload.data.best_selling_products]);
        setUsers([...usersPayload.data])
      } catch (error) {

      }
    }
    if (info) getData()
  }, [])

  return (
    <div className="w-full">
      <div className="flex gap-4">
        <div className="w-2/3 bg-white mb-4 p-6 rounded-sm shadow-sm border">
          <div className="text-xl">Thứ hạng sản phẩm bán chạy</div>
          <div className="w-full mt-4">
            <Table className="w-full">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Thứ hạng</TableHead>
                  <TableHead>Thông tin sản phẩm</TableHead>
                  <TableHead className="text-right">Theo lượt bán</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.length === 0 ? (
                  // Skeleton loading cho các dòng trong bảng
                  <TableRow>
                    <TableCell><Skeleton className="h-6 w-[100px]" /></TableCell>
                    <TableCell>
                      <div className="flex gap-3 items-center">
                        <Skeleton className="h-10 w-10 rounded-sm" />
                        <Skeleton className="h-6 w-40" />
                      </div>
                    </TableCell>
                    <TableCell><Skeleton className="h-6 w-[100px]" /></TableCell>
                  </TableRow>
                ) : (
                  // Dữ liệu thật
                  products.map((p: any, index: number) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{index + 1}</TableCell>
                      <TableCell>
                        <div className="flex gap-3 items-center">
                          <img className="size-10 border rounded-sm" src={p.image} alt="" />
                          {p.name}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">{p.sold_count}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
        <div className="w-1/3 bg-white mb-4 p-6 rounded-sm shadow-sm border">
          <div className="text-xl">Thứ hạng khách hàng</div>
          <div className="w-full mt-4">
            <Table className="w-full">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Thứ hạng</TableHead>
                  <TableHead>Khách hàng</TableHead>
                  <TableHead className="text-right">Theo lượt mua</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.length === 0 ? (
                  // Skeleton loading cho các dòng trong bảng
                  <TableRow>
                    <TableCell><Skeleton className="h-6 w-[100px]" /></TableCell>
                    <TableCell><Skeleton className="h-6 w-20" /></TableCell>
                    <TableCell>
                      <div className='w-full flex justify-end'>
                        <Skeleton className="h-6 w-20" />
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  // Dữ liệu thật
                  users.map((u, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{index + 1}</TableCell>
                      <TableCell>{u.user.fullname}</TableCell>
                      <TableCell className="text-right">{u.total_orders}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  )
}
