'use client'

import CheckoutSekeleton from "@/app/(guest)/_components/checkout-sekeleton"
import LoadingScreen from "@/app/(guest)/_components/loading-screen"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import envConfig from "@/config"
import { decodeData } from "@/helpers"
import { clientAccessToken } from "@/lib/http"
import { formattedPrice } from "@/lib/utils"
import { changeCheckoutState } from "@/redux/slices/profile.slice"
import { useAppInfoDispatch, useAppInfoSelector } from "@/redux/stores/profile.store"
import { CircleAlert, CreditCard, MapPinIcon, MessageCircleMore, Plus, Store, Ticket, TicketCheck } from "lucide-react"
import { notFound, useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { Cross2Icon } from "@radix-ui/react-icons"
import AddressSection from "@/app/(guest)/_components/address-section"
import CheckoutByshopItem from "@/app/(guest)/_components/checkout-byshop-item"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function CheckoutSection({ stateCheckout }: { stateCheckout: string | undefined | null }) {
  const dispatch = useAppInfoDispatch();
  const [checkoutItems, setCheckoutItems] = useState<any[]>([]);
  const stateCheckoutInProfle = useAppInfoSelector(state => state.profile.checkoutState);
  const [loading, setLoading] = useState<boolean>(true);
  const cart = useAppInfoSelector(state => state.profile.cart?.cartInfo) as any[];
  const selectedItems = useAppInfoSelector(state => state.profile.cart?.selectedItems) as any[];
  const router = useRouter();
  const [mainVouchers, setMainVouchers] = useState<any[]>([]);
  const [mainVoucherSelected, setMainVoucherSelected] = useState<any>(null);
  const [vouchersSelected, setVoucherSelected] = useState<any[]>([]);

  useEffect(() => {
    const controller = new AbortController(); // Khởi tạo AbortController
    const signal = controller.signal;

    const getData = async () => {
      if (!stateCheckout && !stateCheckoutInProfle) return notFound();

      let decodeSelectedItems = stateCheckout ? JSON.parse(decodeData(stateCheckout)) : selectedItems;
      let a: any[] = [];
      cart.forEach((s) => {
        let items: any[] = [];
        s.items.forEach((i: any) => {
          if ((decodeSelectedItems).includes(i.id)) {
            items.push(i);
          }
        });
        if (items.length) {
          a.push({ ...s, items });
        }
      });


      const body = a.map(s => ({ shop_id: s.id, items: s.items.map((i: any) => i.id) }));

      try {
        const [calShipFeeRes, vouchersRes] = await Promise.all([
          fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT_1}/api/calculate/ship_fee`, {
            method: "POST",
            headers: {
              "Authorization": `Bearer ${clientAccessToken.value}`,
              "Content-Type": "application/json"
            },
            body: JSON.stringify(body),
            signal // Thêm signal để có thể hủy yêu cầu khi cần thiết
          }),
          fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT_1}/api/get/voucher`, {
            headers: {
              "Authorization": `Bearer ${clientAccessToken.value}`
            }, signal
          })

        ]);
        if (!calShipFeeRes.ok || !vouchersRes.ok) {
          throw 'Error'
        }
        const calShipFeePayload = await calShipFeeRes.json();
        const vouchersPayload = await vouchersRes.json();

        setMainVouchers(vouchersPayload.data.filter((v: any) => v.type === 'main'))

        setCheckoutItems([...a.map((s, index: number) => (
          {
            ...s,
            ship_fee: calShipFeePayload[index].ship_fee,
            vouchers: vouchersPayload.data.filter((v: any) => +v.shop_id === s.id),
            voucherSelected: null
          }
        ))])
        setLoading(false);
      } catch (error: any) {
        if (error.name !== 'AbortError') {
          console.error("Fetch error: ", error); // Xử lý lỗi khác ngoài AbortError
          toast({ title: "Error", variant: "destructive" })
        }
      }
    };

    getData();


    // Cleanup function để hủy request khi component unmount
    return () => {
      controller.abort();
    };
  }, [selectedItems.length])

  const handleCheckout = async () => {
    const carts = checkoutItems.reduce((acc: any, s: any) => [...acc, ...s.items.map((i: any) => i.id)], []);
    let voucherToShopCode: any[] = [];
    checkoutItems.forEach((s) => {
      if (s.voucherSelected) {
        voucherToShopCode.push(s.voucherSelected.code)
      }
    })
    try {
      const res = await fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT_1}/api/purchase_to_cart`, {
        method: "POST",
        body: JSON.stringify({
          carts,
          payment: 11,
          voucherToMainCode: mainVoucherSelected ? mainVoucherSelected.code : undefined,
          voucherToShopCode: voucherToShopCode.length > 0 ? voucherToShopCode : undefined
        }),
        headers: {
          "Authorization": `Bearer ${clientAccessToken.value}`,
          "Content-Type": "application/json"
        }
      });
      const payload = await res.json();
      if (!res.ok) {
        throw 'Error'
      }
      await fetch(`${envConfig.NEXT_PUBLIC_URL}/api/auth/del-cookie`, {
        method: "POST",
      });
      dispatch(changeCheckoutState(""));
      // router.push('/');
      // toast({ title: "Đặt hàng thành công!", variant: "success" })
      location.href = '/'

    } catch (error) {
      toast({ title: "Lỗi", variant: "destructive" })
    }

  }


  // useEffect(() => {
  //   const controller = new AbortController(); // Khởi tạo AbortController
  //   const signal = controller.signal;
  //   const getData = async () => {
  //     try {
  //       const res = await fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT_1}/api/get/voucher`, {
  //         headers: {
  //           "Authorization": `Bearer ${clientAccessToken.value}`
  //         }, signal
  //       });
  //       const payload = await res.json();
  //       console.log(payload);
  //     } catch (error) {

  //     }
  //   }

  //   getData()

  //   return () => {
  //     controller.abort();
  //   };

  // }, [])
  let price = checkoutItems.reduce((acc: number, s: any) => acc + s.items.reduce((acc: number, i: any) => acc + (+i.quantity * (i.product_price ? (+i.product_price) : (+i.variant_price))), 0), 0);
  let ship_fee = checkoutItems.reduce((acc: number, s: any) => acc + s.ship_fee, 0);
  let priceWithVoucher = mainVoucherSelected ? ((+mainVoucherSelected.ratio * price) / 100 > +mainVoucherSelected.max ? +mainVoucherSelected.max : (+mainVoucherSelected.ratio * price) / 100) : 0;
  let priceWithShopVouchers = checkoutItems.reduce((acc: number, s: any) => {
    let price = +s.items.reduce((acc: number, i: any) => acc + (+i.quantity * (i.product_price ? (+i.product_price) : (+i.variant_price))), 0);
    let voucherShop = s.voucherSelected;
    let promotionPrice = voucherShop ? ((+voucherShop.ratio * price) / 100 > +voucherShop.max ? +voucherShop.max : (+voucherShop.ratio * price) / 100) : 0
    return acc + promotionPrice
  }, 0);
  let totalPrice = price + ship_fee - priceWithVoucher - priceWithShopVouchers;

  return (

    <>
      {loading && <CheckoutSekeleton />}
      {!loading && (
        <div className="w-full flex justify-center">
          <div className="w-full">
            <AddressSection />

            {checkoutItems.map((s: any, index) => (
              <CheckoutByshopItem key={s.id} s={s} setCheckoutItems={setCheckoutItems} index={index} vouchersSelected={vouchersSelected} setVoucherSelected={setVoucherSelected} />
            ))}


            <div className="voucher  bg-white border rounded px-[30px] py-7 mt-3 text-[#000000]">
              <div className="title flex items-center justify-between">
                <div className="flex items-center">
                  <Ticket color="#2969d1" strokeWidth={1.25} size={24} />
                  <div className="ml-3 text-[20px]">VNShop Voucher</div>
                </div>
                <div className="flex items-center">
                  {mainVoucherSelected && (
                    <div className="flex items-center text-[12px] text-blue-500 mr-[15px] border border-blue-500 h-5 p-1">- {mainVoucherSelected.ratio}%</div>
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
                                    setMainVoucherSelected(checked ? v : null);
                                  }}
                                  checked={mainVoucherSelected && mainVoucherSelected.id === v.id}
                                  value={v.id}
                                  disabled={checkoutItems.reduce((acc: number, s: any) => acc + s.items.reduce((acc: number, i: any) => acc + (+i.quantity * (i.product_price ? (+i.product_price) : (+i.variant_price))), 0), 0) < +v.min}
                                />
                              </div>
                            </div>
                            {checkoutItems.reduce((acc: number, s: any) => acc + s.items.reduce((acc: number, i: any) => acc + (+i.quantity * (i.product_price ? (+i.product_price) : (+i.variant_price))), 0), 0) < +v.min && (
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
            <div className="payment-type  bg-white border rounded mt-3">
              <div className="title flex items-center justify-between px-[30px] h-[90px] border-b">
                <div className="flex">
                  <div className="text-[20px] text-black">Phương thức thanh toán</div>
                </div>
                <div className="flex">
                  <span className="text-sm">Thanh toán khi nhận hàng</span>
                  <span className="text-blue-700 text-sm ml-[60px] uppercase">Thay đổi</span>
                </div>
              </div>
              <div className="content flex justify-end pt-[15px] bg-[#fffefb]">
                <ul className="w-[230px] text-gray-500">
                  <li className="h-10 flex text-sm items-center">Tổng tiền hàng</li>
                  <li className="h-10 flex text-sm items-center">Tổng tiền phí vận chuyển</li>
                  <li className="h-10 flex text-sm items-center">Tổng cộng voucher giảm giá</li>
                  <li className="h-10 flex text-sm items-center">Tổng thanh toán</li>
                </ul>
                <ul className="pr-[25px]">
                  <li className="justify-end h-10 flex text-sm items-center text-black font-medium">{
                    formattedPrice(price)
                  }
                  </li>
                  <li className="justify-end h-10 flex text-sm items-center text-black font-medium">
                    {
                      formattedPrice(ship_fee)
                    }
                  </li>
                  <li className="justify-end h-10 flex text-sm items-center text-black font-medium">
                    -{formattedPrice(priceWithVoucher + priceWithShopVouchers)
                    }
                  </li>
                  <li className="text-[#ee4d2d] justify-end h-10 flex text-[28px] font-semibold items-center">
                    {formattedPrice(totalPrice)
                    }
                  </li>
                </ul>
              </div>
              <div className="footer mt-[10px] h-[100px] px-[30px] flex items-center justify-between border-t">
                <div className="text pt-10 pb-8 pr-[25px]">
                  <div className="text-sm">Nhấn "Đặt hàng" đồng nghĩa với việc bạn đồng ý tuân theo <span>Điều khoản VNShop</span></div>
                </div>
                <div className="btn">
                  <Button onClick={handleCheckout} className="bg-blue-700 w-[200px] h-[40px] text-[16px] text-white font-bold">Đặt hàng</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </>
  )
}
