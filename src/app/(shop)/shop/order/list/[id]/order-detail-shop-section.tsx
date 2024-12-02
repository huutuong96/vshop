'use client'
import { Button } from "@/components/ui/button";
import envConfig from "@/config";
import { clientAccessToken } from "@/lib/http";
import { formattedPrice } from "@/lib/utils";
import { ClipboardList, HandCoins, MapPin, Receipt, ScanBarcode, Truck, User } from "lucide-react";
import { useEffect, useState } from "react";

type OrderStatus = { label: string; value: number, valueString: any };

const orderStatuses: OrderStatus[] = [
  {
    valueString: (<div className="text-[#d2b510] font-medium">Chờ xác nhận</div>),
    value: 0,
    label: 'Chờ xác nhận'
  },
  { valueString: (<div className="text-blue-700 font-medium">Đã xác nhận</div>), value: 1, label: 'Đã xác nhận' },
  { valueString: (<div className="text-[#f3a322] font-medium">Đang chuẩn bị hàng</div>), value: 2, label: 'Đang chuẩn bị hàng' },
  { valueString: (<div className="text-[#f3a322] font-medium">Đã đóng gói</div>), value: 3, label: 'Đã đóng gói' },
  { valueString: (<div className="text-[#f3a322] font-medium">Đã bàn giao vận chuyển</div>), value: 4, label: 'Đã bàn giao vận chuyển' },
  { valueString: (<div className="text-[#16b9ae] font-medium flex gap-2"><Truck className="text-[#16b9ae]" size={20} strokeWidth={1.25} /> Đang vận chuyển</div>), value: 5, label: 'Đang vận chuyển' },
  { valueString: (<div className="text-red-500 font-medium flex gap-2"><Truck className="text-red-500" size={20} strokeWidth={1.25} /> Giao hàng thất bại</div>), value: 6, label: 'Giao hàng thất bại' },
  { valueString: (<div className="text-green-500 font-medium">Đã giao hàng</div>), value: 7, label: 'Đã giao hàng' },
  { valueString: (<div className="text-green-500 font-medium">Hoàn thành</div>), value: 8, label: 'Hoàn thành' },
  { valueString: (<div className="text-purple-600 font-medium">Hoàn trả</div>), value: 9, label: 'Hoàn trả' },
  { valueString: (<div className="text-red-500 font-medium">Đã hủy</div>), value: 10, label: 'Đã hủy' },
  // { label: "Chưa thanh toán", value: 11 },
  // { label: "Đã thanh toán", value: 12 },
];

export default function OrderDetailShopSection({ id }: { id: string }) {
  const [orderDetail, setOrderDetail] = useState<any>();
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT_1}/api/order/shop/detail/${id}`, {
          headers: {
            "Authorization": `Bearer ${clientAccessToken.value}`
          }
        });
        const payload = await res.json();
        console.log(payload.data[0]);
        setOrderDetail(payload.data[0])
      } catch (error) {

      }
    }
    getData()
  }, [])
  return (
    <>
      <div className="w-full p-4 text-xl">
        Chi tiết hóa đơn #{orderDetail?.id || 1}
      </div>
      <div className="w-full">
        <div className="bg-white w-full shadow-sm border rounded-sm my-4 p-6">
          <div className="w-full">
            <div className="flex items-center">
              <div>
                <ClipboardList className="mr-4" size={16} strokeWidth={1.25} />
              </div>
              {/* <span className="text-lg font-semibold">Đã Hủy</span> */}
              {orderDetail?.order_status ? orderStatuses.find(od => od.value === +orderDetail.order_status)?.valueString : ''}
            </div>
            {/* <div className="mt-3 ml-8">
              <div className="text-sm text-gray-500">Đã hủy tự động bởi hệ thống Shopee</div>
              <div className="text-sm text-gray-500">Lý do hủy: Người Bán không xử lý đơn hàng đúng hạn</div>
            </div> */}
          </div>
        </div>
        <div className="bg-white w-full shadow-sm border rounded-sm my-4 p-6 mt-4">
          <div className="w-full">
            <div className="flex items-center">
              <div>
                <ScanBarcode className="mr-4" size={16} strokeWidth={1.25} />
              </div>
              <span className="text-lg font-semibold">Mã Đơn Hàng</span>
            </div>
            <div className="mt-3 ml-8">
              <div className="text-sm text-gray-500">#{orderDetail?.id || 1}</div>
            </div>
          </div>
          <div className="w-full mt-4">
            <div className="flex items-center">
              <div>
                <MapPin className="mr-4" size={16} strokeWidth={1.25} />
              </div>
              <span className="text-lg font-semibold">Địa chỉ nhận hàng</span>
            </div>
            <div className="mt-3 ml-8">
              <div className="text-sm text-gray-500">{orderDetail?.to_name || 1}, {orderDetail?.to_phone || 1}</div>
              <div className="text-sm text-gray-500">{orderDetail?.to_address || 1}</div>
            </div>
          </div>
          <div className="w-full mt-4">
            <div className="flex items-center">
              <div>
                <Truck className="mr-4" size={16} strokeWidth={1.25} />
              </div>
              <span className="text-lg font-semibold">Thông tin vận chuyển</span>
            </div>
            {orderDetail?.order_details.map((od: any, index: number) => (
              <div key={index} className="mt-3 ml-8">
                <div>
                  <div className="flex items-center mb-3">
                    <div className="text-sm font-semibold mr-2">Kiện hàng {index + 1}:</div>
                    <div className="text-sm"> GHN</div>
                  </div>
                  <div className="w-full flex items-center">
                    <div className="size-12 rounded-sm mr-3">
                      <img className="size-full border rounded-sm" src={od.variant ? od.variant.images : od.product.image} alt="" />
                    </div>
                    <div>x{od.quantity}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>


        </div>
        <div className="bg-white w-full shadow-sm border rounded-sm my-4 p-6 mt-4">
          <div className="w-full flex items-center justify-between">
            <div className="flex items-center">
              <div className="flex items-center justify-center size-12 rounded-full border mr-4">
                <User size={20} strokeWidth={1.25} />
              </div>
              <span className="text-lg font-medium">{orderDetail?.to_name || '1'}</span>
            </div>
            <div className="">
              <Button>Chat ngay</Button>
            </div>
          </div>
        </div>
        <div className="bg-white w-full shadow-sm border rounded-sm my-4 p-6 mt-4">
          <div className="w-full">
            <div className="flex items-center mb-3">
              <div>
                <Receipt className="mr-4" size={16} strokeWidth={1.25} />
              </div>
              <span className="text-lg font-semibold">Thông tin thanh toán</span>
            </div>
            <div className="w-full px-4 pb-4 border rounded-sm">
              <div className="w-full">
                <div className="px-4 py-[6px] border-b -mx-4 bg-blue-50 flex">
                  <div className="flex-shrink-0 flex-grow-0 basis-14 px-2 h-[30px] flex items-center justify-center">STT</div>
                  <div className="flex-1 px-2 h-[30px] flex items-center">Sản phẩm</div>
                  <div className="flex-shrink-0 flex-grow-0 basis-[120px] px-2 h-[30px] flex items-center justify-end">Đơn giá</div>
                  <div className="flex-shrink-0 flex-grow-0 basis-24 px-2 h-[30px] flex items-center justify-end">Số lượng</div>
                  <div className="flex-shrink-0 flex-grow-0 basis-[120px] px-2 h-[30px] flex items-center justify-end ">Thành tiền</div>
                </div>
              </div>
              {orderDetail?.order_details.map((od: any, index: number) => (
                <div key={index} className="w-full py-[10px]">
                  <div className="w-full flex">
                    <div className="flex-shrink-0 flex-grow-0 basis-14 px-2  flex items-center justify-center ">{index + 1}</div>
                    <div className="flex-1 px-2  flex items-center">
                      <div className="w-full flex items-center">
                        <div className="size-16 rounded-sm mr-[10px]">
                          <img className="size-16 rounded-sm border" src={od.variant ? od.variant.images : od.product.image} alt="" />
                        </div>
                        <div>
                          <div className="flex text-[14px] text-gray-500">
                            {/* <div className="">Hủy</div> */}
                            <div>{od?.product?.name || `1`}</div>
                          </div>
                          <div className="my-2"></div>
                          <div className="text-sm text-gray-500">
                            {od?.variant && (
                              <div>Phân loại: {od.variant.name}</div>
                            )}
                            <div>SKU: {od?.variant ? od?.variant.sku : od?.product.sku}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex-shrink-0 flex-grow-0 basis-[120px] px-2  flex items-center justify-end">{od?.variant ? formattedPrice(+od?.variant.price) : formattedPrice(+od?.product.price)}</div>
                    <div className="flex-shrink-0 flex-grow-0 basis-24 px-2  flex items-center justify-end">{od?.quantity || 0}</div>
                    <div className="flex-shrink-0 flex-grow-0 basis-[120px] px-2  flex items-center justify-end ">{formattedPrice(+od?.subtotal || 0)}</div>
                  </div>
                </div>
              ))}

              <div className="w-full">
                {/* <div className="h-4 w-full flex justify-end">
                <div className="pl-[10px] text-[12px] w-[210px] flex items-center justify-end">Ẩn chi tiết danh thu</div>
              </div> */}
                <div className="flex text-sm">
                  <div className="px-4 py-1 w-full h-8 text-right">Tổng cộng hàng hóa</div>
                  <div className="w-[240px] py-1 pr-2 pl-6 border-l border-dotted h-8 text-right">{formattedPrice(+orderDetail?.subtotal || 0)}</div>
                </div>
                {/* <div className="flex text-sm">
                  <div className="px-4 py-1 w-full h-8 text-right">Giá sản phẩm</div>
                  <div className="w-[240px] py-1 pr-2 pl-6 border-l border-dotted h-8"></div>
                </div> */}
                {+orderDetail?.order_status === 10}
                <div className="flex text-sm">
                  <div className="px-4 py-1 w-full h-8 text-right">Số tiền đã hủy</div>
                  <div className="w-[240px] py-1 pr-2 pl-6 border-l border-dotted h-8"></div>
                </div>
                <div className="flex text-sm">
                  <div className="px-4 py-1 w-full h-8 text-right">Phí vận chuyển người mua trả</div>
                  <div className="w-[240px] py-1 pr-2 pl-6 border-l border-dotted h-8"></div>
                </div>
                <div className="flex text-sm">
                  <div className="px-4 py-1 w-full h-8 text-right">Doanh thu đơn hàng ước tính</div>
                  <div className="w-[240px] py-1 pr-2 pl-6 border-l border-dotted h-8"></div>
                </div>
              </div>
            </div>

          </div>
        </div>
        <div className="bg-white w-full shadow-sm border rounded-sm my-4 p-6 mt-4">
          <div className="w-full flex items-center justify-between">
            <div className="flex items-center">
              <div>
                <ClipboardList className="mr-4" size={16} strokeWidth={1.25} />
              </div>
              <span className="text-lg font-semibold">Số tiền cuối cùng</span>
            </div>
            <div>0đ</div>
          </div>
        </div>
        <div className="bg-white w-full shadow-sm border rounded-sm my-4 p-6 mt-4">
          <div className="w-full ">
            <div className="flex items-center">
              <div>
                <HandCoins className="mr-4" size={16} strokeWidth={1.25} />
              </div>
              <span className="text-lg font-semibold">Thanh toán của Người Mua</span>
            </div>
            <div className="w-full">
              {/* <div className="h-4 w-full flex justify-end">
                <div className="pl-[10px] text-[12px] w-[210px] flex items-center justify-end">Ẩn chi tiết danh thu</div>
              </div> */}
              <div className="flex text-sm">
                <div className="px-4 py-1 w-full h-8 text-right">Tổng cộng hàng hóa</div>
                <div className="w-[256px] py-1 pr-2 pl-6 border-l border-dotted h-8"></div>
              </div>
              <div className="flex text-sm">
                <div className="px-4 py-1 w-full h-8 text-right">Phí vận chuyển người mua trả</div>
                <div className="w-[256px] py-1 pr-2 pl-6 border-l border-dotted h-8"></div>
              </div>
              <div className="flex text-sm">
                <div className="px-4 py-1 w-full h-8 text-right">Mã giảm giá của VNShop</div>
                <div className="w-[256px] py-1 pr-2 pl-6 border-l border-dotted h-8"></div>
              </div>
              <div className="flex text-sm">
                <div className="px-4 py-1 w-full h-8 text-right">Tổng tiền thanh toán</div>
                <div className="w-[256px] py-1 pr-2 pl-6 border-l border-dotted h-8"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
