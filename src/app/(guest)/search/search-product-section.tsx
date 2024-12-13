
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
import Link from "next/link";

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

const handleChangeSearchParams = (page: string, filter: any, sort: string) => {
  return `${page ? `&page=${page}` : ''}${filter ? `&${filter}` : ''}${sort !== 'abx' ? `&sort=${sort}` : ''}`
}

export default function SearchProductSection() {
  const params = useParams();
  const [open, setOpen] = useState(false);
  const [products, setProducts] = useState<any[]>([]);
  const [filter, setFilter] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [sort, setSort] = useState<any>('abx');
  const [pages, setPages] = useState<any[]>([]);
  const [page, setPage] = useState('1');
  const [category, setCategory] = useState<any>();
  const [categoryId, setCategoryId] = useState(0);

  // useEffect(() => {
  //   if (!params.id) {
  //     return notFound();
  //   }
  // }, []);



  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const [productsRes] = await Promise.all([
          fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT_1}/api/products/filter?limit=20&${handleChangeSearchParams(page, filter, sort)}`),
          // fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT_1}/api/shops/categories?category_id=${params.id}`),

        ])
        const productsPayload = await productsRes.json();
        // const categoryPayload = await categoryRes.json();


        if (!productsRes.ok) {
          throw productsPayload

        }

        setProducts([...productsPayload.data]);
        setPages([...productsPayload.links]);
        // setCategory(categoryPayload)
      } catch (error) {
        setProducts([]);
        setPages([]);
      } finally {
        setLoading(false);
      }

    }
    getData()
  }, [handleChangeSearchParams(page, filter, sort)])

  return (
    <>
      <div className="w-full flex items-center justify-center">
        <div className="w-content pt-5">
          <div className="">
            <div className="w-full flex">
              <div className="flex-[0_0_11.25rem] mr-[22px]">
                <div className="w-full border-b h-[50px] mb-[10px] flex items-center gap-3 font-bold">
                  <List size={16} strokeWidth={2.0} color="black" />
                  <span>Danh Mục</span>
                </div>
                <div className="w-full">
                  <div className="w-full mb-2 px-3 pr-0 py-2 transition-all relative cursor-pointer hover:text-blue-700">
                    <div className={`text-sm font-semibold h-4 text-black uppercase `}>
                      {category?.name || 'Tất cả danh mục'}
                    </div>
                  </div>
                  {category?.nest.map((c: any) => (
                    <div key={c.id} onClick={() => setCategoryId(+c.id)} className="w-full px-3 mb-2 pr-0 relative transition-all cursor-pointer hover:text-blue-700">
                      <Link href={`/categories/${c.id}`} className={`text-sm font-medium h-4 ${+c.id === categoryId ? 'text-blue-700' : ''}`}>
                        {c.title}
                      </Link>
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
