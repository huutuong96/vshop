'use client'
import { Checkbox } from "@/components/ui/checkbox";
import envConfig from "@/config";
import { clientAccessToken, shop_id } from "@/lib/http";
import { formattedPrice } from "@/lib/utils";
import { ChevronDown, ChevronUp, Image } from "lucide-react";
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { toast } from "@/components/ui/use-toast";

const apiurl = `${envConfig.NEXT_PUBLIC_API_ENDPOINT_1}`;


export default function ListProductItem({ p, handleDeleteProduct }: { p: any, handleDeleteProduct: (id: number) => Promise<void> }) {
  let length = (p.show_price as string).split(' - ').length;
  let show_price = ''
  if (length > 1) {
    show_price = (p.show_price as string).split(' - ').map((p: any) => formattedPrice(+p)).join(' - ');
  } else {
    show_price = formattedPrice(+p.show_price)
  }
  const [showMore, setShowMore] = useState<boolean>(false);

  return (
    <>
      <div className="py-4 border-b flex">
        <div className="w-full">
          <div className="w-full text-[14px] flex">
            <Checkbox className="ml-4 mr-2 mt-4" />
            <div className="flex-[2] p-2 flex items-center gap-4">
              <div className="w-full">
                <div className="flex items-center gap-4">
                  <div className="size-14 border rounded-sm">
                    <img className="size-full object-cover" src={p?.image ? p.image : "https://cf.shopee.vn/file/vn-11134207-7r98o-m0d4u3p2pckt0d_tn"} alt="" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[14px] font-bold cursor-pointer hover:text-blue-700">{p.name}</span>
                    <span className="text-[13px] text-gray-500">SKU sản phẩm: {p.sku}</span>
                    <span className="text-[13px] text-gray-600">ID sản phẩm: {p.id}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-1 p-2 text-right">
              <div className="text-black font-medium">0</div>
            </div>
            <div className="flex-1 p-2 text-right">
              <div className="text-black font-medium">{show_price}</div>
            </div>
            <div className="flex-1 p-2 text-right">
              <div className="text-black font-medium">{p.variants.length > 0 ? p.variants.reduce((init: number, cur: any) => init + (+cur.stock), 0) : p.quantity}</div>
            </div>
            <div className="text-blue-500 flex-1 items-end flex flex-col gap-2 p-2">
              <div className="cursor-pointer">Cập nhật</div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="cursor-pointer">Xem thêm</div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-36">
                  <DropdownMenuGroup>
                    <DropdownMenuItem>Ẩn</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => {
                      handleDeleteProduct(p.id)
                    }}>Xóa</DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>

            </div>
          </div>
          {p.variants && (
            <div className="w-full">
              {p.variants.filter((pv: any, index: number) => showMore || index < 2).map((pv: any, index: number) => (
                <div key={index} className="w-full flex">
                  <div className="w-4 ml-4 mr-2"></div>
                  <div className="flex-[2] p-2 flex items-center gap-4 bg-gray-50">
                    <div className="w-full">
                      <div className="flex items-center gap-4">
                        <div className="size-14 rounded-sm flex items-center justify-center">
                          {!pv.images && (<Image size={40} color="#a6a6a6" strokeWidth={1} />)}
                          {pv.images && (
                            <img
                              className="size-10 object-cover border rounded-sm"
                              src={pv.images}
                              alt="" />
                          )}

                        </div>
                        <div className="flex flex-col gap-1">
                          <span className="text-[14px] font-bold">{pv.name}</span>
                          <span className="text-[13px] text-gray-500">SKU phân loại: {pv.sku}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 p-2 bg-gray-50 text-right">
                    <div className="text-black font-medium">0</div>
                  </div>
                  <div className="flex-1 p-2 bg-gray-50 text-right">
                    <div className="text-black font-medium">{formattedPrice(+pv.price)}</div>
                  </div>
                  <div className="flex-1 p-2 bg-gray-50 text-right">
                    <div className="text-black font-medium">{pv.stock}</div>
                  </div>
                  <div className="flex-1 p-2"></div>
                </div>
              ))}
              {p.variants.length > 2 && (
                !showMore ? (
                  <div onClick={() => setShowMore(true)} className="flex hover:bg-[#a3c5ec60] hover:rounded">
                    <div className="w-4 ml-4 mr-2"></div>
                    <div className="w-full p-2">
                      <div className="ml-[50px] text-sm mt-2 flex gap-2 items-center cursor-pointer text-blue-700">
                        Xem thêm {p.variants.length - 2} biến thể
                        <ChevronDown size={20} strokeWidth={1.25} />
                      </div>


                    </div>
                  </div>
                ) : (
                  <div onClick={() => setShowMore(false)} className="flex hover:bg-[#a3c5ec60] hover:rounded">
                    <div className="w-4 ml-4 mr-2"></div>
                    <div className="w-full p-2">
                      <div className="ml-[50px] text-sm mt-2 flex gap-2 items-center cursor-pointer text-blue-700">
                        Ẩn {p.variants.length - 2} biến thể
                        <ChevronUp size={20} strokeWidth={1.25} />
                      </div>
                    </div>
                  </div>
                )

              )}

            </div>
          )}
        </div>
      </div>
    </>

  )
}
