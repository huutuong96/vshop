'use client'

import CartItem from "@/app/(guest)/_components/cart-item";
import { Checkbox } from "@/components/ui/checkbox";
import { selectAllShopProducts, selectShopVoucher } from "@/redux/slices/profile.slice";
import { useAppInfoDispatch, useAppInfoSelector } from "@/redux/stores/profile.store";
import { Car, CircleAlert, MessageCircleMore, Store, TicketCheck, TicketPercent } from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { formattedPrice } from "@/lib/utils";


export default function CartShopSection({ shop, checked, index }: { shop: any, checked: boolean, index: number }) {
  const dispatch = useAppInfoDispatch();
  const selectedItems = useAppInfoSelector(state => state.profile.cart?.selectedItems) as any[];

  let price = +shop.items.reduce((acc: number, i: any) => acc + (+i.quantity * (i.product_price ? (+i.product_price) : (+i.variant_price))), 0);
  let voucherShop = shop.voucherSelected;
  // let promotionPrice = voucherShop ? ((+voucherShop.ratio * price) / 100 > +voucherShop.max ? +voucherShop.max : (+voucherShop.ratio * price) / 100) : 0


  return (
    <section className='productCartSection w-full border rounded bg-white mt-5'>
      <div className='w-full h-[60px] flex items-center gap-3 border-b-[0.5px]'>
        <Checkbox
          checked={checked}
          onCheckedChange={(c) => {
            let checked = c as boolean;
            dispatch(selectAllShopProducts({ checked, index }))
          }}
          className='size-4 ml-4 mr-2'
        />
        <Store color="#545454" size={18} />
        <Link href={`/vendors/${shop.id}`} className='h-[20px] text-[14px] text-center'>
          {shop.shop_name}
        </Link>
        <MessageCircleMore className='text-blue-700' strokeWidth={1.25} />
      </div>
      <div className='w-full '>
        <div className='w-[1160px] rounded m-5 border'>
          {shop.items.map((i: any, subIndex: number) => {
            let checked = selectedItems.some(si => si === i.id);
            return (
              <CartItem key={i.id} checked={checked} index={index} subIndex={subIndex} item={i} itemsLength={shop.items.length} />
            )
          })}

        </div>
        <div className='w-full border-t'>
          {/* <div className='p-5 flex gap-2 text-[14px] items-center justify-end'>
            <TicketPercent strokeWidth={1.25} className='text-blue-700' />
            <span className='text-blue-700'>Thêm mã giảm giá của Shop</span>
          </div> */}
          <div className="flex items-center justify-end p-5">
            {/* <div className="flex items-center">
              <TicketCheck size={20} color="#2969d1" strokeWidth={1.25} />
              <span className="ml-1.5 text-sm">Voucher của shop</span>
            </div> */}
            <div className="flex items-center gap-4">
              {voucherShop && (
                <button className="flex items-center text-[12px] text-blue-500 mr-[15px] border rounded-sm border-blue-500 h-6 p-1 w-12">- {voucherShop.ratio}%</button>
              )}
              <DropdownMenu  >
                <DropdownMenuTrigger>
                  <div className="text-sm text-blue-600">{voucherShop ? "Chọn Voucher khác" : "Chọn Voucher"}</div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[544px] absolute top-0 z-10 right-0 h-[716px] px-6 py-4 overflow-y-auto">
                  <DropdownMenuLabel className="font-medium">{shop.shop_name} Vouchers</DropdownMenuLabel>
                  <div className="w-full mt-4 flex flex-col gap-4">
                    {shop?.vouchers && shop.vouchers.map((v: any) => (
                      <div key={v.id} className="w-full">
                        <div className="w-full h-[100px] flex border rounded-sm">
                          <div className="size-[100px] border-r flex items-center justify-center">
                            <img src="" className="size-14 rounded-full border" alt="" />
                          </div>
                          <div className="w-[calc(100%-142px)] border-r text-sm pl-3 flex flex-col items-start justify-center">
                            <div>Giảm {v.ratio}% ( tối đa {formattedPrice(+v.max)})</div>
                            <div>Đơn tối thiểu {formattedPrice(+v.min)}</div>
                            {/* <div className="text-[12px] text-gray-400">HSD: 18.12.2024</div> */}
                          </div>
                          <div className="w-[42px] h-full p-3 flex items-center justify-center">
                            <Checkbox
                              onCheckedChange={(c) => {
                                let checked = c as boolean;
                                dispatch(selectShopVoucher({ index, voucher: c ? v : null }))

                              }}
                              value={v.id}
                              checked={voucherShop && voucherShop.id === v.id}
                              disabled={price < +v.min}
                            />
                          </div>
                        </div>
                        {price < +v.min && (
                          <div className="w-full h-[38px] px-[10px] bg-[#fff8e4] flex items-center gap-1">
                            <CircleAlert size={16} color="#f9470b" strokeWidth={1.25} />
                            <span className="text-sm text-[#ee4d2d]">Sản phẩm đã chọn không đáp ứng điều kiện áp dụng của Voucher</span>
                          </div>
                        )}

                      </div>
                    ))}

                  </div>

                </DropdownMenuContent>
              </DropdownMenu>

            </div>
          </div>
        </div>
        <div className='w-full border-t-[0.5px]'>
          {/* <div className='w-[1160px] h-[28px] my-[16px] ml-[40px] flex gap-4 text-[14px] items-center'>
            <Car className='text-blue-500' />
            <span className=''>Giảm ₫300.000 phí vận chuyển đơn tối thiểu <sup>₫</sup>0; Giảm <sup>₫</sup>500.000 phí vận chuyển đơn tối thiểu <sup>₫</sup>500.000
              Tìm hiểu thêm</span>
          </div> */}
        </div>
      </div>
    </section>
  )
}
