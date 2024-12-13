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
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
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
import { ScrollArea } from "@/components/ui/scroll-area"
import { ArrowUp, ArrowDown, Clock, SortAsc, SortDesc } from 'lucide-react';
import debounce from "lodash/debounce";
import { Skeleton } from "@/components/ui/skeleton"


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


const sortOptions: { value: string, label: string, icon: any }[] = [
  { value: '#', label: 'Mặc định', icon: '' },
  { value: 'price', label: 'Giá tăng dần', icon: <ArrowUp /> },
  { value: '-price', label: 'Giá giảm dần', icon: <ArrowDown /> },
  { value: 'updated_at', label: 'Cũ nhất', icon: <Clock /> },
  { value: '-updated_at', label: 'Mới nhất', icon: <Clock /> },
  { value: 'quantity', label: 'Hàng tồn tăng dần', icon: <ArrowUp /> },
  { value: '-quantity', label: 'Hàng tồn giảm dần', icon: <ArrowDown /> },
  { value: 'name', label: 'Tên từ A → Z', icon: <SortAsc /> },
  { value: '-name', label: 'Tên từ Z → A', icon: <SortDesc /> },
  { value: 'sold_count', label: 'Lượt bán tăng dần', icon: <ArrowUp /> },
  { value: '-sold_count', label: 'Lượt bán giảm dần', icon: <ArrowDown /> },
];



const apiurl = `${envConfig.NEXT_PUBLIC_API_ENDPOINT_1}`;

const handleChangeSearchParams = (page: number, sort: string, status: number, limit: string, category_id: number, search: string) => {
  return `${page ? `&page=${page}` : ''}&limit=${limit}&status=${status}${sort !== '#' ? `&sort=${sort}` : ''}${category_id !== 0 ? `&category_id=${category_id}` : ''}${search ? `&search=${search}` : ''}`
}


export default function ProductListSection() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [status, setStatus] = useState<number>(1);
  const [page, setPage] = useState<number>(1);
  const [sort, setSort] = useState<string>('#');
  const [limit, setLimit] = useState<string>('10');
  const [pages, setPages] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [categoryId, setCategoryId] = useState<number>(0);
  const [listIdSelected, setListIdSelected] = useState<number[]>([]);

  const searchRef = useRef<string>(''); // Dùng useRef để lưu giá trị của search

  // Debounce function with lodash
  const debouncedSearch = useMemo(() => {
    return debounce(() => {
      const controller = new AbortController();
      fetchProducts(
        page,
        sort,
        status,
        limit,
        categoryId,
        searchRef.current,
        controller.signal
      );
      return () => {
        controller.abort();
      };
    }, 500);
  }, [page, sort, status, limit, categoryId]);

  const fetchProducts = async (page: number, sort: string, status: number, limit: string, categoryId: number, search: string, signal: AbortSignal) => {
    try {
      setLoading(true);
      const response = await fetch(
        `${envConfig.NEXT_PUBLIC_API_ENDPOINT_1}/api/shop/get_product_to_shop/${shop_id.value}?${handleChangeSearchParams(
          page,
          sort,
          status,
          limit,
          categoryId,
          search
        )}`,
        {
          headers: {
            Authorization: `Bearer ${clientAccessToken.value}`,
          },
          cache: 'no-cache',
          // signal
        }
      );
      const payload = await response.json();
      if (!response.ok) {
        throw new Error('Error fetching products');
      }
      setProducts(payload.data.data);
      setPages(payload.data.links);
      setTotal(payload.data.total);
      setListIdSelected([])
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const controller = new AbortController();

    // Gọi fetchProducts trực tiếp thay vì debounce
    fetchProducts(
      page,
      sort,
      status,
      limit,
      categoryId,
      searchRef.current,
      controller.signal
    );

    // Cleanup signal khi unmount
    return () => {
      controller.abort();
    };
  }, [page, sort, status, limit, categoryId]);

  const resetState = () => {
    setPage(1);
    setSort('#');
    setLimit('10');
    setCategoryId(0);
    searchRef.current = ''
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    searchRef.current = e.target.value;
    debouncedSearch(); // Gọi debounce khi search thay đổi
  };


  const handleChangeStatus = (s: number) => {
    setStatus(s);
    setListIdSelected([]);
    resetState();
  }
  const handleDeleteProduct = async (id: number) => {
    try {
      setLoading(true);

      // Gửi yêu cầu xóa sản phẩm
      const res = await fetch(`${apiurl}/api/shop/product/remove/${id}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${clientAccessToken.value}`,
        },
      });

      if (!res.ok) {
        throw new Error("Xóa thất bại!");
      }

      // Load lại danh sách sản phẩm từ server
      await fetchProducts(page, sort, status, limit, categoryId, searchRef.current, new AbortController().signal);

      // Reset danh sách sản phẩm đã chọn
      setListIdSelected([]);

      // Thông báo thành công
      toast({
        variant: "success",
        title: "Thành công",
        content: "Xóa sản phẩm thành công",
      });
    } catch (error) {
      // Xử lý lỗi
      toast({
        variant: "destructive",
        title: "Error",
        content: (error as Error).message,
      });
    } finally {
      setLoading(false);
    }
  };
  const handleChangeCategoryId = useCallback((id: number) => {
    setCategoryId(id);
    setListIdSelected([]);
  }, []);

  const handleChecked = useCallback((id: number) => {
    setListIdSelected((prev) => {
      let a = prev.findIndex(i => i === id);
      if (a === -1) {
        prev.push(id);
        return [...prev]
      } else {
        prev.splice(a, 1)
        return [...prev];
      }
    })
  }, [listIdSelected]);

  const handleMultipleDelete = async () => {
    try {
      setLoading(true);

      // Gửi yêu cầu xóa danh sách sản phẩm
      const res = await fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT_1}/api/destroyArray`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${clientAccessToken.value}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ arrayID: listIdSelected }), // Gửi danh sách ID cần xóa
      });

      if (!res.ok) {
        throw new Error("Xóa thất bại!");
      }

      // Load lại danh sách sản phẩm từ server sau khi xóa
      await fetchProducts(page, sort, status, limit, categoryId, searchRef.current, new AbortController().signal);

      // Reset danh sách ID đã chọn
      setListIdSelected([]);

      // Thông báo thành công
      toast({
        variant: "success",
        title: "Thành công",
        content: "Xóa các sản phẩm thành công",
      });
    } catch (error) {
      // Thông báo lỗi
      toast({
        variant: "destructive",
        title: "Error",
        content: (error as Error).message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="w-full bg-white rounded">
        <div className="flex py-4 px-3 gap-2">
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
        <div className="flex items-center justify-between w-full p-4 px-3 relative">
          <div className="flex">
            <div className="px-2 border border-r-0 flex items-center rounded-tl rounded-bl">
              <Search color="#ababab" strokeWidth={1.25} size={20} className="" />
            </div>
            <Input
              onChange={handleSearchChange} className="px-3 w-[300px] text-[14px] border-l-0 outline-none rounded-none rounded-tr rounded-br" placeholder="Tìm tên sản phẩm, SKU sản phẩm" />
          </div>
          <Select value={sort} onValueChange={(v) => setSort(v)}>
            <SelectTrigger className="w-[250px]">
              <SelectValue placeholder="Sắp xếp" />
            </SelectTrigger>
            <SelectContent className="w-full">
              <SelectGroup className="w-full">
                <ScrollArea className="h-40 w-full">
                  <SelectLabel className="w-full">Sắp xếp sản phẩm</SelectLabel>
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
          <FilterCategoryProductSection onChangeCategory={handleChangeCategoryId} />
          {/* <div className="flex gap-2">
            <button className="border-blue-500 text-blue-500 hover:border-blue-500 border text-[14px] p-2 rounded">Áp dụng</button>
            <Button variant={'default'}>Đặt lại</Button>
          </div> */}
        </div>
        <div className="px-4 py-2 h-[50px] text-[16px] font-semibold flex items-center justify-between">
          {loading && (
            <Skeleton className="h-6 w-20"></Skeleton>
          )}
          {!loading && (
            <div>{total} Sản phẩm</div>
          )}

          {!loading && listIdSelected.length > 0 && (
            <div className="font-medium flex gap-4 items-center">
              <div>Chọn {listIdSelected.length} Sản phẩm</div>
              <Button className="bg-destructive" onClick={handleMultipleDelete}>Xóa</Button>
            </div>
          )}
        </div>


        <div className="px-4 py-2">
          <div className="flex rounded-tl rounded-tr bg-[#f5f8fd] relative border items-center">
            <div className="w-full h-full text-sm flex items-center  text-[#000000ba]">
              <Checkbox
                className="ml-4 mr-2"
                checked={listIdSelected.length > 0 && listIdSelected.length === products.length}
                onCheckedChange={(c) => {
                  let checked = c as boolean;
                  setListIdSelected((prev) => {
                    return checked ? products.map(p => p.id) : []
                  })
                }} />
              <div className="flex-[2] p-2">Sản phẩm</div>
              <div className="flex-1 p-2 py-4 text-right">Lượt bán</div>
              <div className="flex-1 p-2 text-right">Giá</div>
              <div className="flex-1 p-2 text-right">Kho hàng</div>
              <div className="flex-1 p-2 text-right">Thao tác</div>
            </div>

          </div>
          <div className="border border-t-0 rounded-br rounded-bl relative w-full">
            {loading && (
              Array.from({ length: 10 }).map((_, index) => (
                <ProductSekeleton key={index} />
              ))

            )}

            {!loading && products.length > 0 && products.map((p, index) => (
              <ListProductItem listIdChecked={listIdSelected} onChecked={handleChecked} key={index} p={p} handleDeleteProduct={handleDeleteProduct} />
            ))}
            {!loading && !products.length && <EmptyProductList />}

          </div>
          <div className="flex justify-between items-center mt-6 px-2">
            {total > 10 && (
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
            )}

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
