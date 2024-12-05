'use client'
import { Button } from "@/components/ui/button";
import { Check, ChevronLeft, ChevronRight, Clock, Dot, List, Logs, Play, ShoppingBag, UserRoundCheck } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useEffect, useState } from "react";
import { notFound, useParams } from "next/navigation";
import productApiRequest from "@/apiRequest/product";
import CardProduct from "@/app/(guest)/_components/card-product";
import envConfig from "@/config";
import { toast } from "@/components/ui/use-toast";
import { Skeleton } from "@/components/ui/skeleton"; // Adjust the import path based on your project structure.
import { formattedPrice } from "@/lib/utils";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

const ProductCardSkeleton = () => {
  return (
    <div className="card-product px-[5px] my-[5px]  transition-all">
      <div className="w-full bg-white rounded shadow-sm">
        <div className="img w-full px-5 pt-2 h-[200px]">
          <Skeleton className="w-full h-full object-contain" />
        </div>
        <div className="p-2 px-4 flex flex-col gap-0.5">
          <Skeleton className="w-3/4 h-4" />
          <Skeleton className="w-1/2 h-4" />
          <Skeleton className="w-1/3 h-4" />
          <div className="flex justify-between items-center mt-2">
            <Skeleton className="w-1/4 h-4" />
            <Skeleton className="w-1/4 h-4" />
          </div>
        </div>
      </div>

    </div>
  );
};

const filters = [{
  label: 'Phổ biến',
  value: 'view_count'
}, {
  label: 'Mới nhất',
  value: 'updated_at'
}, {
  label: 'Bán chạy',
  value: 'sold_count'
}
]
const sorts = [{
  label: 'Giá: Thấp đến cao',
  value: 'price'
}, {
  label: 'Giá: Cao đến thấp',
  value: '-price'
}
];

function formatTimeDifference(createdAt: string): string {
  const createdDate = new Date(createdAt);
  const now = new Date();

  // Tính khoảng cách thời gian (theo milliseconds)
  const diffInMs = now.getTime() - createdDate.getTime();

  // Quy đổi milliseconds sang ngày, tháng, năm
  const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
  const diffInMonths = diffInDays / 30;
  const diffInYears = diffInMonths / 12;

  if (diffInMonths < 1) {
    return '1 Tháng Trước';
  } else if (diffInMonths < 13) {
    const months = Math.floor(diffInMonths);
    return `${months} tháng trước`;
  } else {
    const years = Math.floor(diffInYears);
    return `${years} năm trước`;
  }
}

const handleChangeSearchParams = (page: string, filter: any, sort: string, categoryId: number) => {
  return `${page ? `&page=${page}` : ''}${categoryId !== 0 ? `&category_id=${categoryId}` : ''}${filter ? `&${filter}` : ''}${sort !== 'abx' ? `&sort=${sort}` : ''}`
}

export default function ShopDetailSection() {
  const params = useParams();
  const [open, setOpen] = useState(false);
  const [products, setProducts] = useState<any[]>([]);
  const [filter, setFilter] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [sort, setSort] = useState<any>('abx');
  const [pages, setPages] = useState<any[]>([]);
  const [page, setPage] = useState('1');
  const [shopInfo, setShopInfo] = useState<any>();
  const [categoryId, setCategoryId] = useState(0);

  useEffect(() => {
    if (!params.id) {
      return notFound();
    }
  }, []);



  useEffect(() => {
    const getData = async () => {
      if (params.id) {
        try {
          setLoading(true);
          const [productsRes, shopInfoRes] = await Promise.all([
            fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT_1}/api/products/filter?limit=12&shop_id=${params.id}${handleChangeSearchParams(page, filter, sort, categoryId)}`),
            fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT_1}/api/shops/${params.id}`)
          ])
          const shopInfoPayload = await shopInfoRes.json();
          const productsPayload = await productsRes.json();


          if (!shopInfoRes.ok) {
            throw productsPayload
          }
          if (!productsRes.ok) {
            throw shopInfoPayload

          }

          setProducts([...productsPayload.data]);
          setPages([...productsPayload.links]);
          setShopInfo(shopInfoPayload.data);
        } catch (error) {
          console.log('check error: ', error);
          // toast({ title: 'Error', variant: 'destructive' })
          setProducts([]);
          setPages([])
        } finally {
          setLoading(false);
        }
      }

    }
    getData()
  }, [handleChangeSearchParams(page, filter, sort, categoryId)])

  return (
    <>
      <div className="w-full -mt-5">
        <div className="py-5 w-full bg-white flex items-center justify-center">
          <div className="w-content flex">
            <div className="flex-1 p-5 border rounded-sm shadow-sm" style={{ backgroundImage: `url(https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/shopmicrofe/dc2a8ae5803b2531c9a5.jpg)` }}>
              <div className="flex">
                <div className="p-1">
                  <div className="size-[72px] ">
                    <img className="size-full border rounded-full " src="https://res.cloudinary.com/dg5xvqt5i/image/upload/v1730028259/idtck4oah4fakc8oob09.jpg" alt="" />
                  </div>
                </div>
                <div className="p-1 flex justify-center w-full flex-col">
                  <div className="text-xl font-bold">{shopInfo?.shop?.shop_name || 'Tieem cua Khang'}</div>
                  <div className="text-[12px]">{shopInfo?.shop?.visits || '0'} người theo dõi</div>
                </div>
                <div className="p-1 flex items-center">
                  <Button>+ Theo dõi</Button>
                </div>
              </div>
            </div>
            <div className="flex-1 p-5">
              <div className="w-full grid grid-cols-2">
                <div className="py-[10px] w-full flex items-center">
                  <div className="mx-[10px]">
                    <ShoppingBag size={18} color="#575757" strokeWidth={1.25} />
                  </div>
                  <div className="text-sm">Sản phẩm: <span className="text-blue-700 font-medium">200</span></div>
                </div>
                <div className="py-[10px] w-full flex items-center">
                  <div className="mx-[10px]">
                    <UserRoundCheck size={16} color="#575757" strokeWidth={1.25} />
                  </div>
                  {shopInfo?.shop?.created_at ? (
                    <div className="text-sm">Đã tham gia : <span className="text-blue-700 font-medium">{formatTimeDifference(shopInfo.shop.created_at)}</span></div>
                  ) : ''}

                </div>
                <div className="py-[10px] w-full flex items-center">
                  <div className="mx-[10px]">
                    <Clock size={18} color="#575757" strokeWidth={1.25} />
                  </div>
                  <div className="text-sm">Thời gian chuẩn bị hàng: <span className="text-blue-700 font-medium">12 giờ</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex items-center justify-center">
        <div className="w-content pt-5">
          <div className="w-full bg-white px-[30px] py-5 rounded-sm">
            <div className="w-full ">
              <div className="text-xl font-medium mb-[10px]">Voucher</div>
              <div className="w-full pt-[5px] pb-2 flex gap-3">
                {shopInfo?.Vouchers ? (
                  shopInfo.Vouchers.map((v: any) => (
                    <div key={v.id} className="w-1/3 flex border rounded-sm shadow-sm bg-blue-50">
                      <div className="w-full pl-[10px] py-2">
                        <div className="flex items-center">
                          <div className="w-full">
                            <div className="text-sm text-blue-700 mb-1 font-medium">Giảm {+v.ratio * 100 + '%'}</div>
                            <div className="text-[13px] text-blue-700 mb-1 font-medium">Giảm tối đa {formattedPrice(+v.limitValue)} Đơn Tối Thiểu {formattedPrice(+v.min)}</div>
                            <div className="text-[12px] text-gray-400 mb-1">HSD: 30.11.2024</div>
                          </div>
                        </div>
                      </div>
                      <div className="w-[84px] px-2 border-l border-dashed flex items-center justify-center">
                        <button className="w-[60px] h-[34px] px-[15px] border text-sm bg-blue-700 text-white rounded-sm">Lưu</button>
                      </div>
                    </div>
                  ))
                ) : ''}

              </div>
            </div>
          </div>
          <div className="mt-[30px]">
            <div className="w-full flex">
              <div className="flex-[0_0_11.25rem] mr-[22px]">
                <div className="w-full border-b h-[50px] mb-[10px] flex items-center gap-3 font-bold">
                  <List size={16} strokeWidth={2.0} color="black" />
                  <span>Danh Mục</span>
                </div>
                <div className="w-full">
                  <div onClick={() => {
                    setCategoryId(0);
                    setPage('1')
                  }} className="w-full px-3 py-2 pr-[10px] transition-all relative cursor-pointer hover:text-blue-700">
                    <div className={`text-sm font-medium h-4 ${categoryId === 0 ? 'text-blue-700' : ''}`}>
                      Tất cả sản phẩm
                    </div>
                    {categoryId === 0 && (
                      <Dot className="absolute top-2 -left-2 text-blue-700" size={20} strokeWidth={1.5} />
                    )}
                  </div>
                  {shopInfo && shopInfo.categories.map((c: any) => (
                    <div key={c.id} onClick={() => {
                      setCategoryId(+c.id)
                      setPage('1');
                    }} className="w-full px-3 py-2 pr-[10px] relative transition-all cursor-pointer hover:text-blue-700">
                      <div className={`text-sm font-medium h-4 ${+c.id === categoryId ? 'text-blue-700' : ''}`}>
                        {c.title}
                      </div>
                      {+c.id === categoryId && (
                        <Dot className="absolute top-2 -left-2 text-blue-700" size={20} strokeWidth={1.5} />
                      )}
                    </div>
                  ))}

                </div>
              </div>
              <div className="flex-1">
                <div className="w-full">
                  <div className="mx-[2px] py-[13px] px-5 shadow-sm bg-white rounded-sm">
                    <div className="w-full flex items-center justify-between h-[34px]">
                      <div className="flex items-center">
                        <div className="text-sm mr-[5px]">Sắp xếp theo</div>
                        <div className="flex ml-[10px] gap-[10px]">
                          {!loading && filters.map((f, index) => (
                            <Button
                              onClick={() => {
                                if (!filter) {
                                  setPage('1')
                                  setFilter(f.value);
                                  return
                                }
                                if (filter === f.value) {
                                  setPage('1')
                                  setFilter(null)
                                  return
                                } else {
                                  setPage('1')
                                  setFilter(f.value)
                                  return
                                }
                              }}
                              key={index} className={`
                            text-sm bg-white text-black border hover:text-white hover:bg-blue-700 hover:border-blue-700
                            ${filter === f.value ? 'bg-blue-700 text-white' : ''}
                            `}
                            >
                              {f.label}
                            </Button>
                          )
                          )
                          }
                          {loading && filters.map((f, index) => (
                            <Button
                              key={index} className={`
                            text-sm bg-white text-black border hover:text-white hover:bg-blue-700 hover:border-blue-700
                            ${filter === f.value ? 'bg-blue-700 text-white' : ''}
                            `}
                            >
                              {f.label}
                            </Button>
                          )
                          )
                          }
                          <Select open={open} value={sort} onValueChange={(v) => {
                            setSort(v);
                            setPage('1')
                          }} onOpenChange={setOpen}>
                            <SelectTrigger className="w-[200px] bg-white">
                              <SelectValue className="text-sm" placeholder="Giá" />
                            </SelectTrigger>
                            <SelectContent className="py-2">
                              <SelectGroup>
                                <SelectItem key={'abx'} className="text-sm" value={'abx'}>Mặc định</SelectItem>
                                {sorts.map((s, index) => (
                                  <SelectItem key={index} className="text-sm" value={s.value}>{s.label}</SelectItem>
                                ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="flex justify-end items-center">
                        {!loading && (
                          <>
                            <div className="flex text-[12px]">
                              <span className="text-blue-700">{page}</span>
                              <span>/</span>
                              <span>{pages?.length as number - 2}</span>
                            </div>
                            <Button
                              disabled={!pages[0]?.url ? true : false}
                              onClick={() => {
                                setPage(`${+page - 1}`)
                              }}
                              className="ml-5 size-9 flex border items-center justify-center bg-white text-[#4f4f4f] p-0 border-r-0 hover:bg-white hover:text-[#4f4f4f]">
                              <ChevronLeft size={16} color="#4f4f4f" strokeWidth={1} />
                            </Button>
                            <Button
                              disabled={!pages[pages.length - 1]?.url ? true : false}
                              onClick={() => {
                                setPage(`${+page + 1}`)
                              }}
                              className="size-9 flex items-center border justify-center bg-white text-[#4f4f4f] hover:bg-white hover:text-[#4f4f4f] p-0">
                              <ChevronRight size={16} color="#4f4f4f" strokeWidth={1} />
                            </Button>
                          </>
                        )}
                        {loading && (
                          <Skeleton className="h-9 w-[100px]" />
                        )}

                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full grid grid-cols-4 mt-2">
                  {!loading && products.map((p: any) => (
                    <div key={p.id} className="px-[5px] my-[5px]">
                      <CardProduct p={p} />
                    </div>
                  ))}
                  {loading && (
                    Array.from({ length: 12 }).map((_, index) => (
                      <ProductCardSkeleton key={index} />
                    ))
                  )}
                </div>
                <div className="he mt-4 flex justify-center">
                  {pages.length > 3 && (
                    <Pagination>
                      <PaginationContent>
                        {[...pages].shift().url && (
                          <PaginationItem onClick={() => setPage(`${+page - 1}`)}>
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
                          <PaginationItem onClick={() => setPage(`${+page + 1}`)}>
                            <PaginationNext />
                          </PaginationItem>
                        )}

                      </PaginationContent>
                    </Pagination>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
