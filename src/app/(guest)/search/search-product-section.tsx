
'use client'
import { Button } from "@/components/ui/button";
import { Check, ChevronLeft, ChevronRight, Clock, Dot, Filter, Lightbulb, List, Logs, Play, ShoppingBag, UserRoundCheck } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useCallback, useEffect, useState } from "react";
import { notFound, useParams, useRouter, useSearchParams } from "next/navigation";
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
import { Input } from "@/components/ui/input";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import _ from "lodash";

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

const handleChangeSearchParams = (page: string, filter: any, sort: string, search: string, min: number, max: number, min_rate: number, max_rate: number) => {
  return `${search ? `search=${search}&` : ''}${min_rate ? `min_rate=${min_rate}&` : ''}${max_rate ? `max_rate=${max_rate}&` : ''}${min ? `min_price=${min}&` : ''}${max ? `max_rate=${max}&` : ''}${page ? `page=${page}` : ''}${filter ? `&${filter}` : ''}${sort && sort !== 'abx' ? `&sort=${sort}` : ''}`
}

const handleChangeSearchParams1 = (page: string, filter: any, sort: string, search: string) => {
  return `${search ? `search=${search}&` : ''}${page ? `page=${page}&` : ''}${filter ? `filter=${filter}&` : ''}${sort && sort !== 'abx' ? `&sort=${sort}` : ''}`
}

// Định nghĩa schema với Zod
const priceRangeSchema = z.object({
  from: z.coerce.number().min(0, "Giá trị phải lớn hơn hoặc bằng 0"),
  to: z.coerce.number().min(0, "Giá trị phải lớn hơn hoặc bằng 0"),
}).refine((data) => {
  if (data.from !== null && data.to !== null) {
    return data.from <= data.to;
  }
  return true;
}, {
  message: "Giá trị 'Từ' phải nhỏ hơn hoặc bằng 'Đến'",
  path: ["to"], // Chỉ định lỗi cho trường 'Đến'
});

// Kiểu dữ liệu TypeScript từ schema
type PriceRangeForm = z.infer<typeof priceRangeSchema>;


const starMes = [
  ''
]


export default function SearchProductSection({ page1, sort1, filter1, search1 }: { page1?: string, sort1?: string, filter1?: string, search1?: string }) {
  const params = useParams();
  const [open, setOpen] = useState(false);
  const [products, setProducts] = useState<any[]>([]);
  const [filter, setFilter] = useState<any>(filter1 || '');
  const [loading, setLoading] = useState<boolean>(true);
  const [sort, setSort] = useState<string>(sort1 || 'abx');
  const [pages, setPages] = useState<any[]>([]);
  const [page, setPage] = useState(page1 || '1');
  const [category, setCategory] = useState<any>();
  const [categoryId, setCategoryId] = useState(0);
  const searchPrams = useSearchParams();
  const search = searchPrams.get('search');
  const [min, setMin] = useState<number>(0);
  const [max, setMax] = useState<number>(0);
  const [minRate, setMinRate] = useState<number>(0);
  const [maxRate, setMaxRate] = useState<number>(0);

  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    register,
    getValues
  } = useForm<PriceRangeForm>({
    resolver: zodResolver(priceRangeSchema),
    mode: 'all',
    defaultValues: {
    },
  });

  const onSubmit = (data: PriceRangeForm) => {
    // reset()
  };
  const handleClickPriceRange = () => {
    if (Object.entries(errors).length === 0) {
      setMin(getValues('from'))
      setMax(getValues('to'))
      // reset()
    }

  }


  useEffect(() => {
    console.log('in useEffect: ', { page, filter, sort, search });

    setPage(searchPrams.get('page') || '1');
    setSort(searchPrams.get('sort') || '');
    setFilter(searchPrams.get('filter') || '')
  }, [searchPrams])


  const getData = useCallback(async () => {
    setLoading(true);
    try {
      const productsRes = await fetch(
        `${envConfig.NEXT_PUBLIC_API_ENDPOINT_1}/api/client/search?limit=20&${handleChangeSearchParams(
          page,
          filter,
          sort,
          search as string,
          min,
          max,
          minRate,
          maxRate
        )}`
      );


      const productsPayload = await productsRes.json();


      if (!productsRes.ok) {
        throw productsPayload;
      }

      setProducts([...productsPayload.data.data]);
      setPages([...productsPayload.data.links]);
    } catch (error) {
      toast({ title: "Lỗi khi tải sản phẩm", description: "Vui lòng thử lại." });
      setProducts([]);
      setPages([]);
    } finally {
      setLoading(false);
    }
  }, [page, filter, sort, search, min, max, minRate, maxRate]);


  useEffect(() => {
    getData();
  }, [getData]);



  return (
    <>
      <div className="w-full flex items-center justify-center">
        <div className="w-content pt-5">
          <div className="">
            <div className="w-full flex">
              <div className="flex-[0_0_13.25rem] mr-[22px]">
                {/* <div className="mb-4">
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
                </div> */}
                <div>
                  <div className="w-full border-b h-[50px] mb-[10px] flex items-center gap-3 font-bold">
                    <Filter size={16} strokeWidth={2.0} color="black" />
                    <span>Lọc Sản Phẩm</span>
                  </div>
                  <div className="w-full">
                    {/* <div className="w-full mb-2 px-3 pr-0 py-2 transition-all relative cursor-pointer hover:text-blue-700">
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
                    ))} */}
                    <div className="w-full mb-2 pr-0 py-2">Danh mục</div>
                    <div className="py-2 border-b"></div>
                    <div className="w-full mb-2 pr-0 py-2">Khoảng giá</div>
                    <form onSubmit={handleSubmit(onSubmit)} className="w-full mb-2 pr-0">
                      <div className="flex gap-4">
                        {/* Trường 'Từ' */}
                        <div className="flex-1">
                          <Input
                            {...register('from')}
                            type="number"
                            placeholder="đ Từ"
                            className={`bg-white ${errors.from ? "border-red-500" : ""}`}
                          />
                          {/* {errors.from && <p className="text-red-500 text-sm">{errors.from.message}</p>} */}
                        </div>

                        {/* Trường 'Đến' */}
                        <div className="flex-1">
                          <Input
                            {...register('to')}
                            type="number"
                            placeholder="đ Đến"
                            className={`bg-white ${errors.to ? "border-red-500" : ""}`}
                          />
                          {/* {errors.from && <p className="text-red-500 text-sm">{errors.from.message}</p>} */}
                        </div>
                      </div>

                      <div className="w-full mt-4 flex justify-center">
                        <Button type="button" onClick={handleClickPriceRange} className="bg-blue-800 w-full">
                          Áp dụng
                        </Button>
                      </div>
                    </form>
                    <div className="py-2 border-b"></div>
                    <div className="w-full mb-2 pr-0 py-2">Đánh giá</div>
                    <div className="w-full mb-2 pr-0">
                      {/* {[...Array(review.rate)].map((_, i) => (
                            <span key={i} className={`text-yellow-400`}>★</span>
                          ))}
                          {[...Array(greyStar)].map((_, i) => (
                            <span key={i} className={`text-gray-400`}>★</span>
                          ))} */}
                      {Array.from({ length: 5 }).map((_, index) => {
                        let star = 5 - index;
                        let grayStart = index
                        return (
                          <div key={index} onClick={() => {
                            setMinRate(star);
                            setMaxRate(5);
                          }}>
                            <div className="flex gap-1 items-center cursor-pointer py-[1px]">
                              {Array.from({ length: star }).map((_, sI) => (
                                <span key={sI} className={`text-yellow-400 text-xl`}>★</span>
                              ))}
                              {Array.from({ length: grayStart }).map((_, sI) => (
                                <span key={sI} className={`text-gray-400 text-xl`}>★</span>
                              ))}
                              {index !== 0 && <div className="text-[16px] ml-2 text-gray-700">Trở lên</div>}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex-1">
                {search && (
                  <div className="mb-4 mx-[2px] flex gap-2">
                    <Lightbulb size={20} strokeWidth={1.25} />
                    Kết quả tìm với từ khóa : <span className="text-blue-800 font-medium">{search}</span>
                  </div>
                )}

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
                                  router.push(`/search?${handleChangeSearchParams1('1', f.value, '', search || '')}`)
                                  return
                                }
                                if (filter === f.value) {
                                  router.push(`/search?${handleChangeSearchParams1('1', null, '', search || '')}`)
                                  return
                                } else {
                                  router.push(`/search?${handleChangeSearchParams1('1', f.value, '', search || '')}`)
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
                            router.push(`/search?${handleChangeSearchParams1('1', '', v, search || '')}`)
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
                          <PaginationItem key={index} onClick={() => {
                            router.push(`/search?${handleChangeSearchParams1(p.label, filter || '', sort || '', search || ''
                            )}`)
                          }} className="cursor-pointer">
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
