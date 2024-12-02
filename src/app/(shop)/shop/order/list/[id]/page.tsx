import OrderDetailShopSection from "@/app/(shop)/shop/order/list/[id]/order-detail-shop-section";


export default function OrderDetailShopPage({ params }: { params: { id: string } }) {
  return (
    <OrderDetailShopSection id={params.id} />
  )
}
