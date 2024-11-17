'use client'

import LoadingScreen from "@/app/(guest)/_components/loading-screen"
import EmptyProductList from "@/app/(shop)/_components/empty-product-list"
import ListProductItem from "@/app/(shop)/_components/list-product-item"
import ListProductPagination from "@/app/(shop)/_components/list-product-pagination"
import ListProductPopupCategory from "@/app/(shop)/_components/list-product-popup-category"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import envConfig from "@/config"
import { clientAccessToken, shop_id } from "@/lib/http"
import { Search } from "lucide-react"
import { useEffect, useState } from "react"

// const status = [
//   'Tất cả', 'Đang hoạt động', 'Vi phạm', 'Chờ duyệt', 'Chưa đăng được'
// ]
const statusList: { value: number, label: string }[] = [
  { value: 1, label: 'Tất cả' },
  { value: 2, label: 'Đang hoạt động' },
  { value: 3, label: 'Chờ duyệt' },
  { value: 4, label: 'Vi phạm' },
]
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

const apiurl = `${envConfig.NEXT_PUBLIC_API_ENDPOINT_1}`;


export default function ProductListSection() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [status, setStatus] = useState<number>(1);

  useEffect(() => {
    const a = async () => {
      try {
        setLoading(true);
        const b = await fetch(`${apiurl}/api/shop/get_product_to_shop/${shop_id.value}?status=${status}`, {
          headers: {
            "Authorization": `Bearer ${clientAccessToken.value}`
          },
          cache: 'no-cache'
        })
        const payload = await b.json();
        if (!b.ok) {
          throw 'loi'
        }
        setProducts([...payload.data.data]);

      } catch (error) {
        setLoading(false);
      } finally {
        setLoading(false);
      }
    }
    a();
  }, [status])

  console.log({ products });

  const handleChangeStatus = (s: number) => {
    setStatus(s);
  }
  const handleDeleteProduct = async (id: number) => {
    try {
      setLoading(true);
      const res = await fetch(`${apiurl}/api/shop/product/remove/${id}`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${clientAccessToken.value}`
        }
      })
      if (!res.ok) {
        throw 'Xoa that bai!'
      }
      const b = await fetch(`${apiurl}/api/shop/get_product_to_shop/${shop_id.value}?status=${status}`, {
        headers: {
          "Authorization": `Bearer ${clientAccessToken.value}`
        },
        cache: 'no-cache'
      })
      const payload = await b.json();
      if (!b.ok) {
        throw 'loi'
      }
      setProducts([...payload.data.data]);
      toast({
        variant: 'success',
        title: "Thành công",
        content: 'Xóa sản phẩm thành công'
      })
    } catch (error) {
      toast({
        variant: 'destructive',
        title: "Error",
        content: error as string
      })
      setLoading(false);
    } finally {
      setLoading(false);

    }
  }

  return (
    <>
      <div>he</div>
      <div className="flex p-2 px-3 gap-2">
        {statusList.map((item => (
          <div key={item.value}
            onClick={() => {
              handleChangeStatus(item.value);
            }}
            className={`
                text-[14px] text-[#3e3e3e] font-semibold cursor-pointer px-5  border-b-2 pb-2
                 hover:text-blue-500 hover:border-b-blue-500 ${item.value === status ? 'text-blue-500 border-b-blue-500' : 'border-b-white'}
            `}
          >
            {item.label}
          </div>
        )))}
      </div>
      <div className="flex items-center justify-between w-full p-4 px-3">
        <div className="flex">
          <div className="px-2 border border-r-0 flex items-center rounded-tl rounded-bl">
            <Search color="#ababab" strokeWidth={1.25} size={20} className="" />
          </div>
          <Input className="px-3 w-[300px] text-[14px] border-l-0 outline-none rounded-none rounded-tr rounded-br" placeholder="Tìm tên sản phẩm, SKU sản phẩm" />
        </div>
        <ListProductPopupCategory />
        <div className="flex gap-2">
          <button className="border-blue-500 text-blue-500 hover:border-blue-500 border text-[14px] p-2 rounded">Áp dụng</button>
          <Button variant={'default'}>Đặt lại</Button>
        </div>
      </div>
      <div className="px-4 py-2 text-[16px] font-semibold">{products.length} Sản phẩm</div>
      <div className="px-4 py-2">
        <div className="flex rounded-tl rounded-tr bg-[#F0F0F0] border border-b-0 items-center">
          <div className="py-6 pl-4 pr-2">
            <Checkbox className="size-[14px]" />
          </div>
          <div className="w-full h-full  text-[14px] flex items-center  text-[#000000ba]">
            <div className="w-[364px] p-2 pl-4 flex gap-4 items-center">
              <span>Sản phẩm</span>
            </div>
            <div className="w-[200px] p-2">Doanh số</div>
            <div className="w-[280px] p-2">Giá</div>
            <div className="w-[200px] p-2">Kho hàng</div>
            <div className="">Thao tác</div>
          </div>
        </div>
        <div className="border border-t-0 rounded-br rounded-bl">
          {products.length > 0 && products.map((p, index) => (
            <ListProductItem key={index} p={p} handleDeleteProduct={handleDeleteProduct} />
          ))}
          {!products.length && <EmptyProductList />}
          <ListProductPagination />
        </div>
      </div>
      {loading && <LoadingScreen />}
    </>
  )
}
