'use client'
import { Checkbox } from "@/components/ui/checkbox";
import envConfig from "@/config";
import { clientAccessToken, shop_id } from "@/lib/http";
import { formattedPrice } from "@/lib/utils";
import { Image } from "lucide-react";
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

  return (
    <>
      <div className="py-4 border-b flex">
        <div className="py-6 pl-4 pr-2">
          <Checkbox className="size-[14px]" />
        </div>
        <div className="">
          <div className="w-full text-[14px] flex">
            <div className="w-[364px] p-2 pl-4 flex items-center gap-4">
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
            <div className="w-[200px] p-2">
              <div className="text-black font-medium">0</div>
            </div>
            <div className="w-[280px] p-2">
              <div className="text-black font-medium">{show_price}</div>
            </div>
            <div className="w-[200px] p-2">
              <div className="text-black font-medium">{p.variants.length > 0 ? p.variants.reduce((init: number, cur: any) => init + (+cur.stock), 0) : p.quantity}</div>
            </div>
            <div className="text-blue-500 flex flex-col gap-2">
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
            <>
              {p.variants.map((pv: any, index: number) => (
                <div className="text-[14px] flex">
                  <div className="w-[364px] p-2 pl-4 flex items-center gap-4 bg-gray-50">
                    <div className="w-full">
                      <div className="flex items-center gap-4">
                        <div className="size-14 pl-4 rounded-sm flex items-center justify-center">
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
                  <div className="w-[200px] p-2 bg-gray-50">
                    <div className="text-black font-medium">0</div>
                  </div>
                  <div className="w-[280px] p-2 bg-gray-50">
                    <div className="text-black font-medium">{formattedPrice(+pv.price)}</div>
                  </div>
                  <div className="w-[200px] p-2 bg-gray-50">
                    <div className="text-black font-medium">{pv.stock}</div>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </>

  )
}
