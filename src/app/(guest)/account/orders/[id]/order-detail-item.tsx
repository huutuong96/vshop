import { MailPlus, Store } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { formattedPrice } from "@/lib/utils"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import envConfig from "@/config"
import { toast } from "@/components/ui/use-toast"
import { clientAccessToken } from "@/lib/http"

const titles: { id: number, title: string, order_status: number }[] = [
  { id: 1, title: "Chờ xác nhận", order_status: 0 },
  { id: 2, title: "Đã xác nhận", order_status: 1 },
  { id: 3, title: "Chờ giao hàng", order_status: 5 },
  { id: 4, title: "Hoàn thành", order_status: 8 },
  { id: 5, title: "Trả hàng/Hoàn tiền", order_status: 9 },
  { id: 5, title: "Đã hủy", order_status: 10 }
]

export default function OrderDetailItem({ o, setOrderStatus }: { o: any, setOrderStatus: any }) {
  const [open, setOpen] = useState<boolean>(false);

  const handleCancelOrder = async (id: number) => {
    try {
      const res = await fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT_1}/api/orders/cancelOrder/${id}`, {
        headers: {
          "Authorization": `Bearer ${clientAccessToken.value}`
        }
      });
      if (!res.ok) {
        throw 'Error';
      }
      const payload = await res.json();
      console.log(payload);
      setOpen(false);
      setOrderStatus(10);
    } catch (error) {
      toast({ title: 'Error', variant: 'destructive' })
    }
  }

  return (
    <div className="my-3 ">
      <div className=' w-full  flex flex-col gap-3 p-6 border border-b-0 rounded bg-white ' >
        <div className="w-full">
          <div className='nav-list-product w-full flex justify-between pb-3 border-b'>
            <div className='flex gap-3 items-end '>
              <p className='font-semibold text-[16px]'>{o.shop.shop_name ? o.shop.shop_name : 'Shop đã biến mất'}</p>
              <button className='p-1 flex items-center justify-center gap-1 border bg-blue-700 rounded-sm text-white'>
                <MailPlus size={12} />
                <p className="text-[12px]">Chat</p>
              </button>
              <button className='p-1 flex items-center justify-center gap-1 border rounded-sm text-gray-500 font-semibold'>
                <Store size={12} />
                <p className="text-[12px]">Xem Shop</p>
              </button>
            </div>
            <div className="flex gap-2">
              {+o.order_status !== 10 && (
                <>
                  <div>{titles.find(t => t.order_status === +o.order_status)?.title}</div>
                  {+o.status === 2 ? (
                    <div>Đã thanh toán</div>
                  ) : (<div>Chưa thanh toán</div>)}
                </>
              )}
              {+o.order_status === 10 && (
                <div className="text-lg text-red-500 uppercase">Đã hủy</div>
              )}
            </div>
          </div>
          <div className='w-full flex flex-col justify-between'>
            {
              o.order_details.map((d: any, index: number) => {
                return (
                  <div key={d.id} className={`w-full flex items-center gap-3 py-3 ${o.order_details.length - 1 !== index ? 'border-b' : ''}`}>
                    <div className=''>
                      <img src={`${d.variant ? d.variant.images : d.product.image}`} className='size-20 object-cover' />
                    </div>
                    <div className='w-full flex gap-6 justify-between'>
                      <div className='flex flex-col justify-center'>
                        <Link href={`/products/${d.product.slug}`} >{d.product.name ? d.product.name : 'Sản phẩm không hoạt động'}</Link>
                        {d?.variant && (
                          <span className='text-sm text-gray-500'>Phân loại hàng: {d.variant.name}</span>
                        )}
                        <span className="text-sm">x{d.quantity}</span>
                      </div>
                      <div className='flex items-center gap-1 font-semibold'>
                        <span className="font-semibold">
                          {formattedPrice(+d.subtotal)}
                        </span>
                      </div>
                    </div>
                  </div>

                )
              })
            }
          </div>

        </div>
      </div>
      <div className='flex gap-5 items-center justify-center border-t border-dashed rounded bg-[#fffefb] '>
        <div className="w-full px-6 pt-6 py-6">
          <div className="w-full h-[30px] ">
            <div className="size-full flex justify-between items-center gap-2">
              <Link href={`/account/orders/${o.id}`} className="text-sm text-blue-700 hover:underline">Chi tiết</Link>
              <div className="flex items-center gap-2">
                <span className="text-sm">Thành tiền: </span>
                <div className="text-2xl text-red-500 font-semibold">{formattedPrice(+o.total_amount)}</div>
              </div>
            </div>
          </div>
          <div className="flex justify-end mt-4">
            {+o.order_status === 0 && (
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <Button>Hủy đơn</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Thông báo</DialogTitle>
                  </DialogHeader>
                  <div className="w-full py-4">
                    <div>Bạn có chắc muốn hủy đơn hàng #{o.id} ?</div>
                  </div>
                  <DialogFooter className="flex gap-2">
                    <Button type="button" onClick={() => {
                      setOpen(false);
                    }}>Không</Button>
                    <Button type="button" onClick={async () => await handleCancelOrder(+o.id)}>Có</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}
            {+o.order_status === 10 && (+o.updated_by === + o.user_id ? (
              <div className="text-sm text-gray-500">Đã hủy bởi bạn</div>
            ) : (<div className="text-sm text-gray-500">Đã hủy bởi Shop</div>))}
          </div>
        </div>
      </div>
    </div>
  )
}
