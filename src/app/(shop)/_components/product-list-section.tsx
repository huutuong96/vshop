'use client'

import LoadingScreen from "@/app/(guest)/_components/loading-screen"
import EmptyProductList from "@/app/(shop)/_components/empty-product-list"
import ListProductItem from "@/app/(shop)/_components/list-product-item"
import ListProductPagination from "@/app/(shop)/_components/list-product-pagination"
import ListProductPopupCategory from "@/app/(shop)/_components/list-product-popup-category"
import ProductSekeleton from "@/app/(shop)/shop/product/list/product-sekeleton"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import envConfig from "@/config"
import { clientAccessToken, shop_id } from "@/lib/http"
import { Search } from "lucide-react"
import { useEffect, useState } from "react"
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
import FilterCategoryProductSection from "@/app/(shop)/shop/product/list/filter-category-product-section"

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

const handleChangeSearchParams = (page: number, sort: string, status: number, limit: string) => {
  return `${page ? `&page=${page}` : ''}&limit=${limit}&status=${status}`
}


export default function ProductListSection() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [status, setStatus] = useState<number>(1);
  const [page, setPage] = useState<number>(1);
  const [sort, setSort] = useState<string>('');
  const [limit, setLimit] = useState<string>('10');
  const [pages, setPages] = useState<any[]>([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const a = async () => {
      try {
        setLoading(true);
        const b = await fetch(`${apiurl}/api/shop/get_product_to_shop/${shop_id.value}?${handleChangeSearchParams(page, sort, status, limit)}`, {
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
        setPages([...payload.data.links]);
        setTotal(payload.data.total)
      } catch (error) {
        setLoading(false);
      } finally {
        setLoading(false);
      }
    }
    a();
  }, [handleChangeSearchParams(page, sort, status, limit), products.length])


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
      setProducts(prev => {
        const a = prev.filter(p => p.id !== id);
        return [...a]
      })
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
    <div className="w-full bg-white rounded">
      <div className="flex p-2 px-3 gap-2">
        {statusList.map((item => (
          <div key={item.value}
            onClick={() => {
              handleChangeStatus(item.value);
            }}
            className={`
                text-[14px] text-[#3e3e3e] font-semibold cursor-pointer px-5  border-b-2 pb-2 transition-all
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
        <FilterCategoryProductSection />
        <div className="flex gap-2">
          <button className="border-blue-500 text-blue-500 hover:border-blue-500 border text-[14px] p-2 rounded">Áp dụng</button>
          <Button variant={'default'}>Đặt lại</Button>
        </div>
      </div>
      <div className="px-4 py-2 text-[16px] font-semibold">{total} Sản phẩm</div>
      <div className="px-4 py-2">
        <div className="flex rounded-tl rounded-tr bg-[#f5f8fd]  border items-center">
          {/* <div className="py-6 pl-4 pr-2">
            <Checkbox className="size-[14px]" />
          </div> */}
          <div className="w-full h-full text-sm flex items-center  text-[#000000ba]">
            <Checkbox className="ml-4 mr-2" />
            <div className="flex-[2] p-2">Sản phẩm</div>
            <div className="flex-1 p-2 py-4 text-right">Doanh số</div>
            <div className="flex-1 p-2 text-right">Giá</div>
            <div className="flex-1 p-2 text-right">Kho hàng</div>
            <div className="flex-1 p-2 text-right">Thao tác</div>
          </div>
        </div>
        <div className="border border-t-0 rounded-br rounded-bl">
          {loading && (
            <>
              <ProductSekeleton />
              <ProductSekeleton />
              <ProductSekeleton />
            </>
          )}

          {!loading && products.length > 0 && products.map((p, index) => (
            <ListProductItem key={index} p={p} handleDeleteProduct={handleDeleteProduct} />
          ))}
          {!loading && !products.length && <EmptyProductList />}

        </div>
        <div className="flex justify-between items-center mt-6 px-2">
          <div className="flex gap-2 items-center">
            Chọn
            <Select value={limit} onValueChange={(v) => setLimit(v)}>
              <SelectTrigger className="w-[60px]">
                <SelectValue placeholder={limit} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="50">50</SelectItem>
              </SelectContent>
            </Select>
            <div className="w-[100px]">Sản phẩm</div>
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
  )
}
