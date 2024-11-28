'use client'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import categoryApiRequest from "@/apiRequest/category";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import envConfig from "@/config";
import { Asterisk, Check, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const abx = (category: any, categories: any[]): any => {
  let parent_id = category.parent_id;
  let categoriesParent = categories.filter(c => c.parent_id === parent_id);
  let result = { parent_id, categories: categoriesParent };
  if (parent_id === 0) {
    return [result]
  }
  let categoryParent = categories.find(c => c.id === parent_id);
  return [{ parent_id, categories: categoriesParent }, ...abx(categoryParent, categories)]
}
const ctx = (category: any, categories: any[]): any => {
  let parent_id = category.parent_id;
  if (category.parent_id === 0) {
    return [category];
  }
  let categoryParent = categories.find(c => c.id === parent_id);
  return [category, ...ctx(categoryParent, categories)]
}

export default function CategorySection({ productFormHandle, setShowMore, setLoading }: { productFormHandle: any, setShowMore: any, setLoading: any }) {
  const [open, setOpen] = useState<boolean>(false);
  const [categories, setCategories] = useState<any[]>([]);
  const [showCategories, setShowCategories] = useState<{
    parent_id: number
    categories: any[]
  }[]>([]);
  const [categoriesSlected, setCategoriesSlected] = useState<any[]>([]);
  const [categoriesSlectedCopy, setCategoriesSlectedCopy] = useState<any[]>([]);
  const [isValid, setIsValid] = useState<boolean>(false);


  useEffect(() => {
    if (productFormHandle.getValues('category') && categories.length > 0) {
      let category_id = productFormHandle.getValues('category');
      let category = categories.find(c => c.id === category_id);
      let a = abx(category, categories).slice().reverse();
      let b = ctx(category, categories).slice().reverse();
      setShowCategories([...a]);
      setCategoriesSlected([...b]);
      setCategoriesSlectedCopy([...b]);
      setShowMore(true);
      productFormHandle.setError('category', { message: undefined });
      setLoading(false);
    }
  }, [categories]);


  useEffect(() => {
    if (open) {
      productFormHandle.setError('category', { message: undefined })
    } else {
      if (categoriesSlectedCopy.length === 0) {
        productFormHandle.setError('category', { message: 'Lĩnh vực này là cần thiết' })
      }
    }
  }, [open])

  useEffect(() => {
    const getCategoryList = async () => {
      try {
        const res = await fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT_1}/api/categories`, {
          cache: 'no-cache'
        });
        if (!res.ok) {
          throw 'Error';
        }
        const payload = await res.json();
        setCategories([...payload.data.data.map((c: any) => ({ ...c, parent_id: +c.parent_id }))]);
        setShowCategories([{ parent_id: 0, categories: payload.data.data.map((c: any) => ({ ...c, parent_id: +c.parent_id })).filter((c: any) => !+c.parent_id) }])
      } catch (error) {
        console.log(error);
      }
    }
    getCategoryList()
  }, []);



  const handleClickCategory = (isHasChildren: boolean, id: number, index: number) => {
    setCategoriesSlected((prev) => {
      let item = categories.find(c => c.id === id);
      prev.splice(index, 100);
      prev.push(item);
      return [...prev]
    })
    if (isHasChildren) {
      let categoriesNest = categories.filter((pc) => pc.parent_id === id);
      setIsValid(false);
      setShowCategories((prev) => {
        prev.splice(index + 1, 100);
        prev.push({ parent_id: id, categories: categoriesNest })
        return [...prev]
      })
    } else {
      setIsValid(true);
      setShowCategories((prev) => {
        prev.splice(index + 1, 100);
        return [...prev]
      })
    }
  }

  return (
    <div className="my-6">
      <div className="text-sm mb-2 font-semibold flex items-center gap-1">
        <Asterisk size={16} color="#e83030" strokeWidth={1.25} />
        Danh mục ngành hàng
      </div>
      <DropdownMenu open={open} onOpenChange={setOpen} modal={false}>
        <DropdownMenuTrigger asChild>
          <div className="border w-full h-[30px] rounded px-4 text-sm flex items-center cursor-pointer">
            {/* {!isValid && (
              <span className="text-gray-400">Chọn danh mục</span>
            )} */}
            {(categoriesSlectedCopy.length > 0 ?
              categoriesSlectedCopy.map((c, index) => (
                <span key={index} className="flex items-center gap-1 mr-1 ">
                  {c.title}
                  {index !== categoriesSlectedCopy.length - 1 && <ChevronRight size={16} strokeWidth={1.25} />}
                </span>
              ))
              : (<span className="text-gray-400">Chọn danh mục</span>)
            )}
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-[900px] bg-white p-0 top-0 absolute">
          <div className="w-full p-4 rounded-lg border">
            <div className="w-full">
              <div className="h-[30px] mb-4">
                <input type="text" placeholder="Tìm kiếm" className="outline-none rounded-xl border text-[12px] h-full px-3 w-[400px]" />
              </div>
              <ScrollArea className=" w-full rounded-md border pb-2">
                <div className="flex overflow-x-auto">
                  {showCategories.length > 0 && showCategories.map((s, index) => (
                    <div key={index} className="w-[240.5px] border-r h-[300px]">
                      <ul className="w-full">
                        {s.categories.map((c, subIndex) => {
                          let isHasChildren = categories.some((pc) => pc.parent_id === c.id);
                          let checked = categoriesSlected.some(pc => pc.id === c.id);
                          // if (isHasChildren) setIsValid(true);
                          // else setIsValid(false);
                          return (
                            <li
                              key={subIndex}
                              className={`pl-5 pr-[18px] text-sm h-8 flex items-center justify-between hover:bg-gray-100  cursor-pointer
                                  ${checked ? "bg-gray-100" : ""}
                                `}
                              onClick={() => handleClickCategory(isHasChildren, c.id, index)}
                            >
                              {c.title}
                              {isHasChildren &&
                                <ChevronRight size={16} color="#383838" strokeWidth={1.25} />
                              }
                              {!isHasChildren && checked && (
                                <Check size={16} color="#2347d7" strokeWidth={1.25} />
                              )}
                            </li>
                          )
                        })}
                      </ul>
                    </div>
                  ))}
                </div>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </div>
            <div className="w-full p-4 flex items-center justify-end">
              <div className="flex gap-3">
                <Button type="button" onClick={() => {
                  setOpen(false)
                }}>Hủy</Button>
                <Button type="button" onClick={() => {
                  setCategoriesSlectedCopy([...categoriesSlected]);
                  productFormHandle.setValue('category', categoriesSlected[categoriesSlected.length - 1].id)
                  setOpen(false);
                  setShowMore(true);
                }} disabled={!isValid}>Xác nhận</Button>
              </div>
            </div>
          </div>

        </DropdownMenuContent>
      </DropdownMenu>
      {productFormHandle.formState.errors?.category?.message && <p className="text-sm text-red-500 mt-1">{productFormHandle.formState.errors.category.message}</p>}

    </div>
  )
}
