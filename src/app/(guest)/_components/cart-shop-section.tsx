'use client'

import CartItem from "@/app/(guest)/_components/cart-item";
import { Checkbox } from "@/components/ui/checkbox";
import { selectAllShopProducts } from "@/redux/slices/profile.slice";
import { useAppInfoDispatch, useAppInfoSelector } from "@/redux/stores/profile.store";
import { Car, MessageCircleMore, Store, TicketPercent } from "lucide-react";


export default function CartShopSection({ shop, checked, index }: { shop: any, checked: boolean, index: number }) {
  const dispatch = useAppInfoDispatch();
  const selectedItems = useAppInfoSelector(state => state.profile.cart?.selectedItems) as any[];

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
        <div className='h-[20px] text-[14px] text-center'>
          {shop.shop_name}
        </div>
        <MessageCircleMore className='text-blue-500' />
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
        <div className='w-full border-t-[0.5px]'>
          <div className='w-[1160px] h-[28px] my-[16px] ml-[40px] flex gap-4 text-[14px] items-center'>
            <TicketPercent className='text-blue-500' />
            <span className='text-blue-500'>Thêm mã giảm giá của Shop</span>
          </div>
        </div>
        <div className='w-full border-t-[0.5px]'>
          <div className='w-[1160px] h-[28px] my-[16px] ml-[40px] flex gap-4 text-[14px] items-center'>
            <Car className='text-blue-500' />
            <span className=''>Giảm ₫300.000 phí vận chuyển đơn tối thiểu <sup>₫</sup>0; Giảm <sup>₫</sup>500.000 phí vận chuyển đơn tối thiểu <sup>₫</sup>500.000
              Tìm hiểu thêm</span>
          </div>
        </div>
      </div>
    </section>
  )
}
