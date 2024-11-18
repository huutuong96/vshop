'use client'

import { formattedPrice } from "@/lib/utils"
import { CircleAlert, Store, TicketCheck } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Dispatch, SetStateAction } from "react"

// export default function CheckoutByshopItem({ s, index, setVoucherSelected, vouchersSelected }: { s: any, index: number, setVoucherSelected: Dispatch<SetStateAction<any[]>>, vouchersSelected: any[] }) {
//   let price = +s.items.reduce((acc: number, i: any) => acc + (+i.quantity * (i.product_price ? (+i.product_price) : (+i.variant_price))), 0);
//   let voucherShop = vouchersSelected.find(v => +v.shop_id === s.id);
//   let priceWithVoucher = voucherShop ? ((+voucherShop.ratio * price) / 100 > +voucherShop.max ? +voucherShop.max : (+voucherShop.ratio * price) / 100) : 0
//   console.log({ voucherShop, priceWithVoucher });

//   return (
//     <div key={s.id} className="w-full mt-3 rounded-sm bg-white">
//       <div className="w-full pt-6 px-[30px] flex items-center">
//         <div className="w-full h-[50px] flex items-center">
//           <div className="w-[380px] flex-[4] text-left">
//             <span className="text-[18px] font-normal text-black">Sản phẩm</span>
//           </div>
//           <div className="flex-[2]"></div>
//           <div className="flex-[2] text-sm text-right">Đơn giá</div>
//           <div className="flex-[2] text-sm text-right">Số lượng</div>
//           <div className="flex-[2] text-sm text-right">Thành tiền</div>
//         </div>
//       </div>
//       <div className="w-full ">
//         <div className="w-full">
//           <div className="w-full">
//             <div className="px-[30px] w-full h-[50px] flex items-center">
//               <Store color="#545454" size={18} strokeWidth={1.25} />
//               <div className="ml-[8px] text-sm text-black">{s.shop_name}</div>
//             </div>
//             <div className="w-full pb-5 border-b">
//               {s.items.map((i: any) => (
//                 <div key={i.id} className="flex items-center mx-[30px] mt-3">
//                   <div className="flex items-center justify-start overflow-hidden flex-[4]">
//                     <img src={i.product_image ? i.product_image : i.variant_image} className="size-10 object-cover" />
//                     <span className="flex flex-col justify-center mx-[15px] overflow-hidden text-sm">{i.product_name}</span>
//                   </div>
//                   <div className="flex-[2] text-sm flex justify-start text-[#929292]">
//                     {i.variant_name && (
//                       <span className="pl-3 text-ellipsis whitespace-nowrap overflow-hidden">Loại: {i.variant_name}</span>
//                     )}
//                   </div>
//                   <div className="flex-[2] text-sm text-black flex justify-end">{i.product_price ? formattedPrice(+i.product_price) : formattedPrice(+i.variant_price)}</div>
//                   <div className="flex-[2] text-sm text-black flex justify-end">{i.quantity}</div>
//                   <div className="flex-[2] text-sm text-black flex justify-end">{i.product_price ? formattedPrice(+i.product_price * (+i.quantity)) : formattedPrice(+i.variant_price * (+i.quantity))}</div>
//                 </div>
//               ))}

//             </div>
//             <div className="grid grid-cols-2 border-b border-dashed w-full">
//               <div></div>
//               <div className="p-[25px]">
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center">
//                     <TicketCheck size={20} color="#2969d1" strokeWidth={1.25} />
//                     <span className="ml-1.5 text-sm">Voucher của shop</span>
//                   </div>
//                   <div className="flex items-center">
//                     {voucherShop && (
//                       <div className="flex items-center text-[12px] text-blue-500 mr-[15px] border border-blue-500 h-5 p-1">- {voucherShop.ratio}%</div>
//                     )}
//                     <DropdownMenu modal={false} >
//                       <DropdownMenuTrigger>
//                         <div className="text-sm text-blue-600">{voucherShop ? "Chọn Voucher khác" : "Chọn Voucher"}</div>
//                       </DropdownMenuTrigger>
//                       <DropdownMenuContent align="end" className="w-[544px] absolute top-0 z-10 right-0 h-[716px] px-6 py-4 overflow-y-auto">
//                         <DropdownMenuLabel className="font-medium">{s.shop_name} Vouchers</DropdownMenuLabel>
//                         <div className="w-full mt-4 flex flex-col gap-4">
//                           {s.vouchers.map((v: any, index: number) => (
//                             <div key={index} className="w-full">
//                               <div className="w-full h-[100px] flex border">
//                                 <div className="size-[100px] border-r flex items-center justify-center">
//                                   <img src="" className="size-14 rounded-full border" alt="" />
//                                 </div>
//                                 <div className="w-[calc(100%-142px)] border-r text-sm pl-3 flex flex-col items-start justify-center">
//                                   <div>Giảm {v.ratio}% ( tối đa {formattedPrice(+v.max)})</div>
//                                   <div>Đơn tối thiểu {formattedPrice(+v.min)}</div>
//                                   {/* <div className="text-[12px] text-gray-400">HSD: 18.12.2024</div> */}
//                                 </div>
//                                 <div className="w-[42px] h-full p-3 flex items-center justify-center">
//                                   <Checkbox
//                                     onCheckedChange={(c) => {
//                                       let checked = c as boolean;
//                                       if (checked) {
//                                         setVoucherSelected((prev) => {
//                                           const newA = prev.filter(i => s.vouchers.some((vou: any) => +vou.shop_id !== +i.shop_id));
//                                           return [...newA, v]
//                                         })
//                                       } else {
//                                         setVoucherSelected((prev) => {
//                                           const newA = prev.filter(i => i.id !== v.id);
//                                           return [...newA];
//                                         })
//                                       }
//                                     }}
//                                     value={v.id}
//                                     checked={vouchersSelected.some((vou) => vou.id === v.id)}
//                                     disabled={price < +v.min}
//                                   />
//                                 </div>
//                               </div>
//                               {price < +v.min && (
//                                 <div className="w-full h-[38px] px-[10px] bg-[#fff8e4] flex items-center gap-1">
//                                   <CircleAlert size={16} color="#f9470b" strokeWidth={1.25} />
//                                   <span className="text-sm text-[#ee4d2d]">Sản phẩm đã chọn không đáp ứng điều kiện áp dụng của Voucher</span>
//                                 </div>
//                               )}

//                             </div>
//                           ))}

//                         </div>

//                       </DropdownMenuContent>
//                     </DropdownMenu>

//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="w-full bg-[#fafdff]">
//               <div className="grid grid-cols-[40%_60%] border-b border-dashed">
//                 <div className="p-[25px]">
//                   <div className="flex items-center text-sm text-black">
//                     <span>Lời nhắn:</span>
//                     <div className="flex-1">
//                       <div className="ml-[15px] text-[12px] font-light mb-0">
//                         <div className="bg-white flex items-center border rounded-sm box-border h-10">
//                           <input
//                             type="text"
//                             className="h-full py-1 px-3 w-full border-0 text-black flex-1 text-sm outline-none"
//                             placeholder="Lưu ý cho người bán"
//                           />
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="border-l border-dashed grid gap-[10px]">
//                   <div className="w-full p-[25px] grid border-dashed col-end-5 col-start-1 items-center">
//                     <div className="col-end-2 col-start-1 text-sm font-medium text-black">Phương thức vận chuyển:</div>
//                     <div className="col-start-2 row-end-2 row-start-1 text-sm font-medium text-black">Nhanh</div>
//                     <div className="col-start-1"></div>
//                     <div className="text-[#888] text-[12px] col-start-2 mt-[10px] row-end-auto row-start-auto">
//                       Đảm bảo nhận hàng từ 13 Tháng 11 - 14 Tháng 11
//                     </div>
//                     <div className="col-start-3 row-end-2 row-start-1"></div>
//                     <div className="col-start-4 row-end-2 row-start-1 text-right text-sm font-medium">{formattedPrice(s.ship_fee)}</div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="bg-[#fafdff] w-full py-[15px] flex flex-col">
//               <div className="flex h-10  items-center justify-end">
//                 <div className="text-sm font-normal">Tổng số tiền ({s.items.reduce((acc: number, i: any) => acc + (+i.quantity), 0)} sản phẩm):</div>
//                 <div className="pl-[10px] pr-[25px] h-full flex items-center text-[#ee4d2d] text-[24px] font-semibold">
//                   {formattedPrice(
//                     price + s.ship_fee - priceWithVoucher
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }
export default function CheckoutByshopItem({ s, index, setVoucherSelected, vouchersSelected, setCheckoutItems }: { s: any, index: number, setVoucherSelected: Dispatch<SetStateAction<any[]>>, vouchersSelected: any[], setCheckoutItems: Dispatch<SetStateAction<any[]>> }) {
  let price = +s.items.reduce((acc: number, i: any) => acc + (+i.quantity * (i.product_price ? (+i.product_price) : (+i.variant_price))), 0);
  let voucherShop = s.voucherSelected;
  let promotionPrice = voucherShop ? ((+voucherShop.ratio * price) / 100 > +voucherShop.max ? +voucherShop.max : (+voucherShop.ratio * price) / 100) : 0

  return (
    <div key={s.id} className="w-full mt-3 rounded-sm bg-white">
      <div className="w-full pt-6 px-[30px] flex items-center">
        <div className="w-full h-[50px] flex items-center">
          <div className="w-[380px] flex-[4] text-left">
            <span className="text-[18px] font-normal text-black">Sản phẩm</span>
          </div>
          <div className="flex-[2]"></div>
          <div className="flex-[2] text-sm text-right">Đơn giá</div>
          <div className="flex-[2] text-sm text-right">Số lượng</div>
          <div className="flex-[2] text-sm text-right">Thành tiền</div>
        </div>
      </div>
      <div className="w-full ">
        <div className="w-full">
          <div className="w-full">
            <div className="px-[30px] w-full h-[50px] flex items-center">
              <Store color="#545454" size={18} strokeWidth={1.25} />
              <div className="ml-[8px] text-sm text-black">{s.shop_name}</div>
            </div>
            <div className="w-full pb-5 border-b">
              {s.items.map((i: any) => (
                <div key={i.id} className="flex items-center mx-[30px] mt-3">
                  <div className="flex items-center justify-start overflow-hidden flex-[4]">
                    <img src={i.product_image ? i.product_image : i.variant_image} className="size-10 object-cover" />
                    <span className="flex flex-col justify-center mx-[15px] overflow-hidden text-sm">{i.product_name}</span>
                  </div>
                  <div className="flex-[2] text-sm flex justify-start text-[#929292]">
                    {i.variant_name && (
                      <span className="pl-3 text-ellipsis whitespace-nowrap overflow-hidden">Loại: {i.variant_name}</span>
                    )}
                  </div>
                  <div className="flex-[2] text-sm text-black flex justify-end">{i.product_price ? formattedPrice(+i.product_price) : formattedPrice(+i.variant_price)}</div>
                  <div className="flex-[2] text-sm text-black flex justify-end">{i.quantity}</div>
                  <div className="flex-[2] text-sm text-black flex justify-end">{i.product_price ? formattedPrice(+i.product_price * (+i.quantity)) : formattedPrice(+i.variant_price * (+i.quantity))}</div>
                </div>
              ))}

            </div>
            <div className="grid grid-cols-2 border-b border-dashed w-full">
              <div></div>
              <div className="p-[25px]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <TicketCheck size={20} color="#2969d1" strokeWidth={1.25} />
                    <span className="ml-1.5 text-sm">Voucher của shop</span>
                  </div>
                  <div className="flex items-center gap-4">
                    {voucherShop && (
                      <button className="flex items-center text-[12px] text-blue-500 mr-[15px] border border-blue-500 h-6 p-1 w-10">- {voucherShop.ratio}%</button>
                    )}
                    <DropdownMenu modal={false} >
                      <DropdownMenuTrigger>
                        <div className="text-sm text-blue-600">{voucherShop ? "Chọn Voucher khác" : "Chọn Voucher"}</div>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-[544px] absolute top-0 z-10 right-0 h-[716px] px-6 py-4 overflow-y-auto">
                        <DropdownMenuLabel className="font-medium">{s.shop_name} Vouchers</DropdownMenuLabel>
                        <div className="w-full mt-4 flex flex-col gap-4">
                          {s.vouchers.map((v: any) => (
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
                                      setCheckoutItems((prev) => {
                                        if (checked) {
                                          prev[index].voucherSelected = { ...v };
                                          return [...prev];
                                        } else {
                                          prev[index].voucherSelected = null;
                                          return [...prev]
                                        }
                                      })
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
            </div>
            <div className="w-full bg-[#fafdff]">
              <div className="grid grid-cols-[40%_60%] border-b border-dashed">
                <div className="p-[25px]">
                  <div className="flex items-center text-sm text-black">
                    <span>Lời nhắn:</span>
                    <div className="flex-1">
                      <div className="ml-[15px] text-[12px] font-light mb-0">
                        <div className="bg-white flex items-center border rounded-sm box-border h-10">
                          <input
                            type="text"
                            className="h-full py-1 px-3 w-full border-0 text-black flex-1 text-sm outline-none"
                            placeholder="Lưu ý cho người bán"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="border-l border-dashed grid gap-[10px]">
                  <div className="w-full p-[25px] grid border-dashed col-end-5 col-start-1 items-center">
                    <div className="col-end-2 col-start-1 text-sm font-medium text-black">Phương thức vận chuyển:</div>
                    <div className="col-start-2 row-end-2 row-start-1 text-sm font-medium text-black">Nhanh</div>
                    <div className="col-start-1"></div>
                    <div className="text-[#888] text-[12px] col-start-2 mt-[10px] row-end-auto row-start-auto">
                      Đảm bảo nhận hàng từ 13 Tháng 11 - 14 Tháng 11
                    </div>
                    <div className="col-start-3 row-end-2 row-start-1"></div>
                    <div className="col-start-4 row-end-2 row-start-1 text-right text-sm font-medium">{formattedPrice(s.ship_fee)}</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-[#fafdff] w-full py-[15px] flex flex-col">
              <div className="flex h-10  items-center justify-end">
                <div className="text-sm font-normal">Tổng số tiền ({s.items.reduce((acc: number, i: any) => acc + (+i.quantity), 0)} sản phẩm):</div>
                <div className="pl-[10px] pr-[25px] h-full flex items-center text-[#ee4d2d] text-[24px] font-semibold">
                  {formattedPrice(
                    price + s.ship_fee - promotionPrice
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

