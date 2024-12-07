'use client'
import { CircleAlert, TicketPercent } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAppInfoDispatch, useAppInfoSelector } from '@/redux/stores/profile.store';
import { formattedPrice } from '@/lib/utils';
import { Checkbox } from "@/components/ui/checkbox"
import { addCheckout, addMainVoucher, addVouchers, changeCheckoutState, selectAllProducts } from '@/redux/slices/profile.slice';
import envConfig from '@/config';
import LoadingScreen from '@/app/(guest)/_components/loading-screen';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { toast } from '@/components/ui/use-toast';
import { encodeData } from '@/helpers';
import CartEmptyItems from '@/app/(guest)/_components/cart-empty-items';
import CartShopSection from '@/app/(guest)/_components/cart-shop-section';
import SkeletonCartItem from '@/app/(guest)/_components/skeleton-cart-item';
import { LoaderCircle } from "lucide-react";

import { useRouter } from 'next/navigation';
import { signToken } from '@/lib/jwt';
import { clientAccessToken } from '@/lib/http';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import redis from '@/lib/redis';



function ButtonLoading(
) {
  return (
    <Button className='w-[160px] bg-blue-700 hover:bg-blue-700 hover:opacity-50 border flex items-center ' disabled>
      <LoaderCircle
        className="-ms-1 me-2 animate-spin"
        size={16}
        strokeWidth={2}
        aria-hidden="true"
      />
      Mua hàng
    </Button>
  );
}


export default function CartSection() {
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useAppInfoDispatch();
  const cart = useAppInfoSelector(state => state.profile.cart?.cartInfo) as any[];
  const selectedItems = useAppInfoSelector(state => state.profile.cart?.selectedItems) as any[];
  const cartItemLength = cart.reduce((acc: number, cur) => acc + cur.items.length, 0);
  const cartItemCount = cart.reduce((acc: number, cur) => acc + cur.items.reduce((acc: number, cur: any) => acc + (+cur.quantity), 0), 0);
  const router = useRouter();
  const addresses = useAppInfoSelector(state => state.profile.addresses);
  const mainVoucherSelected = useAppInfoSelector(state => state.profile.cart?.mainVoucherSelected);
  const mainVouchers = useAppInfoSelector(state => state.profile.cart?.mainVouchers) as any[];
  const checkout = useAppInfoSelector(state => state.profile.checkout);
  const info = useAppInfoSelector(state => state.profile.info);

  console.log(checkout);

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT_1}/api/get/voucher`, {
          headers: {
            "Authorization": `Bearer ${clientAccessToken.value}`
          }
        });
        if (!res.ok) {
          throw 'Error'
        }
        const payload = await res.json();
        const shopVouchers = payload.data.filter((sv: any) => sv.type === 'shop');
        const mainVouchers = payload.data.filter((sv: any) => sv.type === 'main')
        dispatch(addVouchers({ mainVouchers, shopVouchers }))

      } catch (error) {
        toast({ title: 'Error', variant: 'destructive' })
      } finally {
        setLoading(false);
      }
    }
    getData()
  }, [])


  const totalPriceNonVouchers = useCallback(() =>
    cart.reduce((acc: number, cur) => {
      let price = cur.items.reduce((innerAcc: number, item: any) =>
        selectedItems.includes(item.id)
          ? innerAcc + (+item.quantity) * (item.product_price ? (+item.product_price) : (+item.variant_price))
          : innerAcc,
        0)
      return acc + price
    }, 0),
    [cart, selectedItems]);

  let priceWithMainVoucher = mainVoucherSelected ? ((+mainVoucherSelected.ratio * totalPriceNonVouchers()) / 100 > +mainVoucherSelected.max ? +mainVoucherSelected.max : (+mainVoucherSelected.ratio * totalPriceNonVouchers()) / 100) : 0;

  const totalPriceSeltected = useMemo(() =>
    cart.reduce((acc: number, cur) => {
      let price = cur.items.reduce((innerAcc: number, item: any) =>
        selectedItems.includes(item.id)
          ? innerAcc + (+item.quantity) * (item.product_price ? (+item.product_price) : (+item.variant_price))
          : innerAcc,
        0)
      let voucherShop = cur.voucherSelected;
      let promotionShopPrice = voucherShop ? ((+voucherShop.ratio * price) / 100 > +voucherShop.max ? +voucherShop.max : (+voucherShop.ratio * price) / 100) : 0
      return acc + price - promotionShopPrice;
    }, 0),
    [cart, selectedItems]);


  const handleCheckout = async () => {
    if (!selectedItems.length) {
      toast({ title: "Vui lòng chọn sản phẩm", variant: 'destructive' });
      return
    }
    let a: any[] = [];
    cart.forEach((s) => {
      let items: any[] = [];
      s.items.forEach((i: any) => {
        if ((selectedItems).includes(i.id)) {
          items.push(i);
        }
      });
      if (items.length) {
        a.push({ ...s, items });
      }
    });
    const body = a.map(s => ({ shop_id: s.id, items: s.items.map((i: any) => i.id) }));
    try {
      setLoading(true)
      const res = await fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT_1}/api/calculate/ship_fee`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${clientAccessToken.value}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        throw 'Error';
      }
      const payload = await res.json();
      const ship_fees = payload as { shop_id: number, ship_fee: number }[];
      const checkoutItems = a.map((c, index) => ({ ...c, ship_fee: ship_fees[index].ship_fee }));

      let foo = {
        mainVouchers,
        checkoutItems,
        originPrice: totalPriceNonVouchers(),
        totalShipFee: ship_fees.reduce((acc, cur) => acc + cur.ship_fee, 0),
        voucherPrice: totalPriceNonVouchers() - totalPriceSeltected + priceWithMainVoucher,
        rankPrice: (totalPriceNonVouchers() * info.rank.value) >= info.rank.limitValue ? info.rank.limitValue : (totalPriceNonVouchers() * info.rank.value),
        mainVoucherSelected
      }

      dispatch(addCheckout(foo));
      await redis.set(`checkout-${info.id}`, foo)

      router.push(`/test-checkout`);
    } catch (error) {
      setLoading(false);
    } finally {
    }

  }


  // const handleCheckout = async () => {
  //   if (!selectedItems.length) {
  //     toast({ title: "Vui lòng chọn sản phẩm", variant: 'destructive' });
  //     return
  //   }
  //   let stateEncode = encodeData(selectedItems);
  //   const res = await fetch(`/api/auth/set-cookie`, {
  //     method: "POST",
  //     body: JSON.stringify({ stateCheckout: stateEncode })
  //   });
  //   const payload = await res.json();
  //   if (!res.ok) {
  //     console.log(payload);
  //   }
  //   dispatch(changeCheckoutState(stateEncode));
  //   setLoading(true)
  //   window.location.href = `/checkout`;
  // }



  return (
    <div className='w-full'>
      <>
        {cartItemCount ? (
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
        ) : ''}

        {!loading && cart.map((c: any, index: number) => {
          let checked = c.items.every((ci: any) => selectedItems.includes(ci.id));
          return (
            <CartShopSection key={c.id} checked={checked} index={index} shop={c} />
          )
        })}

        {loading && Array.from({ length: cartItemLength }, (_, i) => i + 1).map(a => (<SkeletonCartItem key={a} />))}


        {
          cartItemCount ? (
            <section className="checkPrice w-full border sticky bottom-0 bg-white mt-4">
              <div className='w-full p-5 flex justify-end border-dashed border-b-[1px]'>
                <div className='w-[515px] h-5 flex justify-between'>
                  <div className='w-[300px] flex gap-4 text-[16px]'>
                    <TicketPercent strokeWidth={1.25} className='text-blue-700' />
                    <span>VNShop Voucher</span>
                  </div>
                  {/* <span className='text-blue-700'>Chọn thêm mã Voucher</span> */}
                  <div className="flex items-center justify-end gap-4">
                    {mainVoucherSelected && (
                      <div className="flex items-center text-[12px] text-blue-500 mr-[15px] border rounded-sm font-medium border-blue-500 h-5 p-1">- {mainVoucherSelected.ratio}%</div>
                    )}
                    <DropdownMenu modal={false} >
                      <DropdownMenuTrigger>
                        <div className="text-sm text-blue-600">{mainVoucherSelected ? 'Chọn Voucher khác' : 'Chọn Voucher'}</div>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-[544px] absolute top-0 z-10 right-0 h-[716px] px-6 py-4 overflow-y-auto">
                        <DropdownMenuLabel className="font-medium">Chọn Vouchers</DropdownMenuLabel>
                        <div className="w-full mt-4 flex flex-col gap-4">
                          {mainVouchers.map(v => (
                            <div key={v.id} className="w-full">
                              <div className="w-full h-[100px] flex border">
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
                                      dispatch(addMainVoucher((checked ? v : null)));
                                    }}
                                    checked={mainVoucherSelected && mainVoucherSelected.id === v.id}
                                    value={v.id}
                                    disabled={totalPriceNonVouchers() < +v.min}
                                  />
                                </div>
                              </div>
                              {totalPriceNonVouchers() < +v.min && (
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
              {/* <div className='w-full h-[50px] py-4 flex justify-end border-dashed border-b-[1px] '>
                <p className='mr-4'>Chưa xác định được mình có tích xu không ?</p>
              </div> */}
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
                  <span>Chọn Tất Cả ({cartItemCount})</span>
                  <span>Xóa</span>
                  {/* <span>Bỏ sản phẩm không hoạt động</span> */}
                </div>
                <div className='h-full flex gap-4 justify-center items-center text-[16px]'>
                  <span>Tổng thanh toán ({selectedItems.length} Sản phẩm):</span>
                  <span className='text-[#ff424e] text-[24px] font-bold'>{formattedPrice(totalPriceSeltected - priceWithMainVoucher)}</span>
                  {loading && (
                    <ButtonLoading />
                  )}
                  {!loading && (
                    <Button onClick={handleCheckout} className='w-[160px] bg-blue-700 hover:bg-blue-700 hover:opacity-50 border'>Mua Hàng</Button>
                  )}
                </div>
              </div>
            </section>
          ) : ''
        }

      </>
      {
        !cartItemCount && (
          <CartEmptyItems />
        )
      }

    </div>
  )
}
