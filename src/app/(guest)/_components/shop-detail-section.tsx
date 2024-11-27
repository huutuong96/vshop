'use client'
import { Button } from "@/components/ui/button";
import { Check, Clock, Dot, List, Logs, Play, ShoppingBag, UserRoundCheck } from "lucide-react";
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

export default function ShopDetailSection() {
  const params = useParams();
  const [open, setOpen] = useState(false);
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    if (!params.id) {
      return notFound();
    }
  }, [])

  useEffect(() => {
    const getData = async () => {
      const data = await productApiRequest.findAll();
      setProducts(data.payload.data.data);
    }
    getData()
  }, [])

  return (
    <>
      <div className="w-full -mt-5">
        <div className="py-5 w-full bg-white flex items-center justify-center">
          <div className="w-content flex">
            <div className="flex-1 p-5 border rounded-sm shadow-sm">
              <div className="flex">
                <div className="p-1">
                  <div className="size-[72px] ">
                    <img className="size-full border rounded-full " src="https://res.cloudinary.com/dg5xvqt5i/image/upload/v1730028259/idtck4oah4fakc8oob09.jpg" alt="" />
                  </div>
                </div>
                <div className="p-1 flex justify-center w-full flex-col">
                  <div className="text-xl font-bold">Tiệm Của Khang</div>
                  <div className="text-[12px]">4.526 người theo dõi</div>
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
                  <div className="text-sm">Đã tham gia : <span className="text-blue-700 font-medium">1 Tháng trước</span></div>
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
              <div className="w-full pt-[5px] pb-2 flex">
                <div className=" w-1/3 flex border rounded-sm shadow-sm bg-blue-50">
                  <div className="w-full pl-[10px] py-2">
                    <div className="flex items-center">
                      <div className="w-full">
                        <div className="text-sm text-blue-700 mb-1 font-medium">Giảm 12%</div>
                        <div className="text-[13px] text-blue-700 mb-1 font-medium">Giảm 12% Giảm tối đa ₫40k Đơn Tối Thiểu ₫250k</div>
                        <div className="text-[12px] text-gray-400 mb-1">HSD: 30.11.2024</div>
                      </div>
                    </div>
                  </div>
                  <div className="w-[84px] border-l border-dashed flex items-center justify-center">
                    <button className="w-[60px] h-[34px] px-[15px] border text-sm bg-blue-700 text-white rounded-sm">Lưu</button>
                  </div>
                </div>
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
                  <div className="w-full px-3 py-2 pr-[10px] relative cursor-pointer hover:text-blue-700">
                    <div className="text-sm font-medium h-4 text-blue-700">
                      Tất cả sản phẩm
                    </div>
                    <Dot className="absolute top-2 -left-2 text-blue-700" size={20} strokeWidth={1.5} />
                  </div>
                  <div className="w-full px-3 py-2 pr-[10px] relative cursor-pointer hover:text-blue-700">
                    <div className="text-sm font-medium h-4">
                      Tất cả sản phẩm
                    </div>
                  </div>
                  <div className="w-full px-3 py-2 pr-[10px]">
                    <div className="text-sm font-medium h-4">
                      Tất cả sản phẩm
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex-1">
                <div className="w-full">
                  <div className="mx-[2px] py-[13px] px-5 shadow-sm bg-white rounded-sm">
                    <div className="w-full flex items-center h-[34px]">
                      <div className="text-sm mr-[5px]">Sắp xếp theo</div>
                      <div className="flex ml-[10px] gap-[10px]">
                        <Button className="text-sm">Phổ biến</Button>
                        <Button className="text-sm">Mới nhất</Button>
                        <Button className="text-sm">Bán chạy</Button>
                        <Select open={open} onOpenChange={setOpen}>
                          <SelectTrigger className="w-[200px] bg-white">
                            <SelectValue className="text-sm" placeholder="Giá" />
                          </SelectTrigger>
                          <SelectContent className="py-2">
                            <SelectGroup>
                              <SelectItem className="text-sm" value="apple">Giá: Thấp đến cao</SelectItem>
                              <SelectItem className="text-sm" value="banana">Giá: Cao đến thấp</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full grid grid-cols-4 mt-2">
                  {products.map((p: any) => (
                    <div key={p.id} className="px-[5px] my-[5px]">
                      <CardProduct p={p} />
                    </div>

                  ))}

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
