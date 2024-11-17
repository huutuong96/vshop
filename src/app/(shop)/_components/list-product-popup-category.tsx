'use client'
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ChevronRight, Pen } from "lucide-react";
import { useEffect, useState } from "react";

type Category = {
  id: number
  name: string
  parentId?: number | null
  children: Category[]
}

const categories: Category[] = [
  {
    "id": 1, "name": "Thời trang nam", "parentId": null,
    children: [
      {
        "id": 2, "name": "Quần jean", "parentId": 1, children: [
          { "id": 4, "name": "Áo polo", "parentId": 2, children: [] },
          { "id": 5, "name": "Áo thun", "parentId": 2, children: [] },
        ]
      },
      { "id": 12, "name": "Áo", "parentId": 1, children: [] },
      { "id": 3, "name": "Quần đùi", "parentId": 1, children: [] },
    ]
  },
  {
    "id": 7, "name": "Giày dép nam", "parentId": null, children: [
      { "id": 8, "name": "Giày tây lười", "parentId": 7, children: [] },
    ]
  },
  { "id": 11, "name": "Máy tính và Laptop", "parentId": null, children: [] },
]

const getCategories = async (parentId: number | null) => {
  if (parentId) {
    const a = categories.find(item => item.id === parentId);
    if (a) return a.children;
    else {
      throw new Error();
    }
  }
  else {
    return categories
  }
}



export default function ListProductPopupCategory() {
  const [categories1, setCategory1] = useState<Category[]>([]);
  const [categories2, setCategory2] = useState<Category[]>([]);
  const [categories3, setCategory3] = useState<Category[]>([]);
  const [categories4, setCategory4] = useState<Category[]>([]);
  const [categoriesSelected, setCategoriesSelected] = useState<{ id: number, name: string }[]>([]);

  useEffect(() => {
    const a = async () => {
      const b = await getCategories(null);
      setCategory1([...b])
    }
    a()
  }, [])


  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="w-[300px] h-full border rounded px-3 py-1 flex justify-between items-center cursor-pointer hover:border-gray-400">
          <span className="text-[14px] text-gray-400">Tìm kiếm theo ngành hàng</span>
          <Pen size={16} color="#ababab" strokeWidth={1.25} />
        </div>
      </DialogTrigger>
      <DialogContent className="w-[1200px]">
        <DialogHeader>
          <DialogTitle>Chỉnh sửa ngành hàng</DialogTitle>
        </DialogHeader>
        <div className="w-full max-h-[600px] bg-gray-50 rounded p-4">
          <div className="">
            <input type="text" className="h-8 border" />
          </div>
          <div className="w-full grid grid-cols-4 bg-white mt-4 py-2.5">
            <ScrollArea className="border-r h-[300px] max-h-[300px]">
              <ul className="">
                {categories1.map((item) => (
                  <li onClick={async () => {
                    setCategoriesSelected(prev => [{ id: item.id, name: item.name }]);
                    const a = await getCategories(item.id);
                    setCategory2([...a]);
                  }} key={item.id} className="h-8 px-4 flex items-center justify-between hover:bg-gray-100 cursor-pointer">
                    <p className="text-[14px]">{item.name}</p>
                    {item.children.length ? (<ChevronRight size={20} strokeWidth={1.25} />) : ''}
                  </li>
                ))}
              </ul>
            </ScrollArea>
            <ScrollArea className="border-r h-[300px] max-h-[300px]">
              <ul className="">
                {categories2.map((item) => (
                  <li key={item.id} className="h-8 px-4 flex items-center justify-between hover:bg-gray-100 cursor-pointer">
                    <p className="text-[14px]">{item.name}</p>
                    {item.children.length ? (<ChevronRight size={20} strokeWidth={1.25} />) : ''}
                  </li>
                ))}
              </ul>
            </ScrollArea>
            <ScrollArea className="border-r h-[300px] max-h-[300px]">
              <ul className="">
                {/* {categories3.map((item) => (
                  <li key={item.id} className="h-8 px-4 flex items-center justify-between hover:bg-gray-100 cursor-pointer">
                    <p className="text-[14px]">{item.name}</p>
                    {!item.parentId ? (<ChevronRight size={20} strokeWidth={1.25} />) : ''}
                  </li>
                ))} */}
              </ul>
            </ScrollArea>
            <ScrollArea className="border-r h-[300px] max-h-[300px]">
              <ul className="">
                {/* {categories4.map((item) => (
                  <li key={item.id} className="h-8 px-4 flex items-center justify-between hover:bg-gray-100 cursor-pointer">
                    <p className="text-[14px]">{item.name}</p>
                    {!item.parentId ? (<ChevronRight size={20} strokeWidth={1.25} />) : ''}
                  </li>
                ))} */}
              </ul>
            </ScrollArea>
          </div>
        </div>
        <div className="relative">
          <div className="absolute w-[1200px] h-[81px] p-6 -left-[25px] top-0 border-t ">
            <div className="w-full h-full flex justify-between">
              <div className="flex gap-4">
                <span className="text-[14px] font-medium">Đã chọn:</span>
                <span className="text-[14px] font-medium">
                  {categoriesSelected.length ?
                    categoriesSelected.map((item, index) => item.name)
                    : 'Chưa chọn ngành hàng nào'}
                </span>
              </div>
              <div className="flex gap-4">
                <Button>Cancel</Button>
                <Button>Confirm</Button>
              </div>
            </div>
          </div>
          <div className="h-[50px]">
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
