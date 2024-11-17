'use client'
import { TicketPercent } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAppInfoDispatch, useAppInfoSelector } from '@/redux/stores/profile.store';
import { formattedPrice } from '@/lib/utils';
import { Checkbox } from "@/components/ui/checkbox"
import { changeCheckoutState, selectAllProducts } from '@/redux/slices/profile.slice';
import envConfig from '@/config';
import LoadingScreen from '@/app/(guest)/_components/loading-screen';
import { useState } from 'react';
import { toast } from '@/components/ui/use-toast';
import { encodeData } from '@/helpers';
import CartEmptyItems from '@/app/(guest)/_components/cart-empty-items';
import CartShopSection from '@/app/(guest)/_components/cart-shop-section';


export default function CartSection() {
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useAppInfoDispatch();
  const cart = useAppInfoSelector(state => state.profile.cart?.cartInfo) as any[];
  const selectedItems = useAppInfoSelector(state => state.profile.cart?.selectedItems) as any[];
  const cartItemLength = cart.reduce((acc: number, cur) => acc + cur.items.length, 0);
  const cartItemCount = cart.reduce((acc: number, cur) => acc + cur.items.reduce((acc: number, cur: any) => acc + (+cur.quantity), 0), 0);


  // const cartItemCountSelected = cart.reduce((acc: number, cur) =>
  //   acc + cur.items.reduce((acc: number, cur: any) =>
  //     selectedItems.includes(cur.id) ? acc + (+cur.quantity) : acc + 0
  //     , 0), 0);

  const totalPriceSeltected = cart.reduce((acc: number, cur) =>
    acc + cur.items.reduce((acc: number, cur: any) =>
      selectedItems.includes(cur.id) ? acc + (+cur.quantity) * (cur.product_price ? (+cur.product_price) : (+cur.variant_price)) : acc + 0
      , 0), 0);


  const handleCheckout = async () => {
    if (!selectedItems.length) {
      toast({ title: "Vui lòng chọn sản phẩm", variant: 'destructive' });
      return
    }
    let stateEncode = encodeData(selectedItems);
    const res = await fetch(`${envConfig.NEXT_PUBLIC_URL}/api/auth/set-cookie`, {
      method: "POST",
      body: JSON.stringify({ stateCheckout: stateEncode })
    });
    const payload = await res.json();
    if (!res.ok) {
      console.log(payload);
    }
    dispatch(changeCheckoutState(stateEncode));
    window.location.href = `/checkout`;
  }



  return (
    <div className='w-full'>
      {cartItemCount > 0 && (
        <>
          <section className='headerCart w-full h-[55px] border rounded mt-5 flex items-center gap-4 text-[14px] bg-white'>
            <Checkbox
              checked={selectedItems.length > 0 && selectedItems.length === cartItemLength}
              onCheckedChange={(c) => {
                let checked = c as boolean;
                dispatch(selectAllProducts(checked))
              }}
              className='size-4 ml-4 mr-2'
            />
            <div className='w-[506px] h-[20px] '>
              Sản phẩm
            </div>
            <div className='w-[173px] h-[20px] text-center text-[#888888]'>
              Đơn giá
            </div>
            <div className='w-[168px] h-[20px] text-center text-[#888888]'>
              Số lượng
            </div>
            <div className='w-[114px] h-[20px] text-center text-[#888888]'>
              Số tiền
            </div>
            <div className='w-[138px] h-[20px] text-center text-[#888888]'>
              Thao tác
            </div>
          </section>
          {cart.map((c: any, index: number) => {
            let checked = c.items.every((ci: any) => selectedItems.includes(ci.id));
            return (
              <CartShopSection key={c.id} checked={checked} index={index} shop={c} />
            )
          })}

          <section className="checkPrice w-full border sticky bottom-0 bg-white mt-4">
            <div className='w-full h-[44px] py-3 flex justify-end border-dashed border-b-[1px]'>
              <div className='w-[515px] h-5 flex justify-around mr-4'>
                <div className='w-[300px] flex gap-4 text-[16px]'>
                  <TicketPercent className='text-blue-500' />
                  <span>VNShop Voucher</span>
                </div>
                <span className='text-blue-500'>Chọn thêm mã Voucher</span>
              </div>
            </div>
            <div className='w-full h-[50px] py-4 flex justify-end border-dashed border-b-[1px] '>
              <p className='mr-4'>Chưa xác định được mình có tích xu không ?</p>
            </div>
            <div className='w-full h-[64px] flex items-center justify-between py-3 px-5'>
              <div className='h-full flex items-center gap-4 text-[16px]'>
                <Checkbox
                  checked={selectedItems.length > 0 && selectedItems.length === cartItemLength}
                  onCheckedChange={(c) => {
                    let checked = c as boolean;
                    dispatch(selectAllProducts(checked))
                  }}
                  className='size-4 ml-4 mr-2'
                />
                <span>Chọn Tất Cả ({cartItemCount})
                </span>
                <span>Xóa</span>
                <span>Bỏ sản phẩm không hoạt động</span>
              </div>
              <div className='h-full flex gap-4 justify-center items-center text-[16px]'>
                <span>Tổng thanh toán ({selectedItems.length} Sản phẩm):</span>
                <span className='text-[#ff424e] text-[24px] font-bold'>{formattedPrice(totalPriceSeltected)}</span>
                <Button onClick={handleCheckout} className='px-10 bg-blue-500 hover:bg-white hover:text-blue-500 border'>Mua Hàng</Button>
              </div>
            </div>
          </section>
        </>
      )}
      {
        !cartItemCount && (
          <CartEmptyItems />
        )
      }

      {loading && (<LoadingScreen />)}
    </div>
  )
}
