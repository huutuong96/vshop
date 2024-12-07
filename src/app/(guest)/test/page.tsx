'use client'

import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import redis from "@/lib/redis"

export default function TestPage() {

  const toastSuccess = () => {
    toast({ description: "ABX", title: 'ABX', variant: 'success' })
  }

  const set = async () => {
    // Đặt giá trị
    try {
      const res = await redis.set('khang', `{"mainVouchers":[{"id":13,"type":"main","status":2,"create_by":137,"update_by":137,"created_at":"2024-11-16T08:22:30.000000Z","updated_at":"2024-11-16T08:22:30.000000Z","code":"VCHERS","user_id":128,"shop_id":null,"max":20000,"min":140000,"ratio":10,"title":"Vchers","description":"Vchers"}],"checkoutItems":[{"id":50,"shop_name":"Racing Shop","slug":"ban-do-choi-xe-may-198","items":[{"id":317,"status":2,"created_at":"2024-12-06T15:25:24.000000Z","updated_at":"2024-12-06T15:25:24.000000Z","cart_id":63,"shop_id":50,"shop_name":"Racing Shop","shop_slug":"ban-do-choi-xe-may-198","product_id":627,"product_name":"Thảm lót sàn xe Honda Vario Click [125-150cc] 2018-2024-chính hãng","product_slug":"tham-lot-san-xe-honda-vario-click-125-150cc-2018-2024-chinh-hang","product_price":null,"product_image":null,"variant_id":1340,"variant_name":"Xanh","variant_price":109148,"variant_image":"https://res.cloudinary.com/dg5xvqt5i/image/upload/v1732866695/onnbo2mghjzws9rkthfo.webp","quantity":1,"ship_code":"STANDARD"}],"vouchers":[],"voucherSelected":null,"ship_fee":25700},{"id":53,"shop_name":"Mixi Shop","slug":"mixi-shop-202","items":[{"id":313,"status":2,"created_at":"2024-12-05T09:25:47.000000Z","updated_at":"2024-12-05T17:03:18.000000Z","cart_id":63,"shop_id":53,"shop_name":"Mixi Shop","shop_slug":"mixi-shop-202","product_id":994,"product_name":"Áo khoác gió nam-nữ 2 lớp 𝐂𝐨́ 𝐓𝐮́𝐢 𝐓𝐫𝐨𝐧𝐠, Áo khoác dù chất liệu vải gió cao cấp kháng nước","product_slug":"ao-khoac-gio-nam-nu-2-lop-ao-khoac-du-chat-lieu-vai-gio-cao-cap-khang-nuoc","product_price":null,"product_image":null,"variant_id":1518,"variant_name":"Kem, M","variant_price":153248,"variant_image":"https://res.cloudinary.com/dg5xvqt5i/image/upload/v1732956996/o5jh739h7ke9xxpwamca.webp","quantity":1,"ship_code":"STANDARD"}],"vouchers":[{"id":20,"type":"shop","status":2,"create_by":137,"update_by":137,"created_at":"2024-11-16T08:29:30.000000Z","updated_at":"2024-11-16T08:29:30.000000Z","code":"THU202","user_id":128,"shop_id":53,"max":50000,"min":0,"ratio":50,"title":"Giảm giá mùa thu","description":"Giảm giá 20% cho tất cả sản phẩm mùa hè"}],"voucherSelected":null,"ship_fee":38998},{"id":54,"shop_name":"T1 Shop","slug":"t1-shop-203","items":[{"id":314,"status":2,"created_at":"2024-12-05T16:47:43.000000Z","updated_at":"2024-12-05T19:07:37.000000Z","cart_id":63,"shop_id":54,"shop_name":"T1 Shop","shop_slug":"t1-shop-203","product_id":1016,"product_name":"Thức ăn hỗn hợp hạt cho chó GANADOR 400g - Đồ Ăn Cho Chó Con, Chó Lớn","product_slug":"thuc-an-hon-hop-hat-cho-cho-ganador-400g-do-an-cho-cho-con-cho-lon","product_price":null,"product_image":null,"variant_id":1623,"variant_name":"Sữa DHA","variant_price":95918,"variant_image":"https://res.cloudinary.com/dg5xvqt5i/image/upload/v1733038064/bhithlosylbvajzbzjzn.webp","quantity":2,"ship_code":"STANDARD"}],"vouchers":[],"voucherSelected":null,"ship_fee":25700}],"originPrice":454232,"totalShipFee":90398,"voucherPrice":0,"rankPrice":45423.200000000004,"mainVoucherSelected":null,"address":null}`, { ex: 3600 }); // hết hạn sau 1 giờ
      console.log(res);
    } catch (error) {

    }

  }

  return (
    <>
      <div className="flex gap-4">
        <div onClick={toastSuccess}>success</div>
        <Button onClick={set}>set</Button>
      </div>
    </>
  )
}
