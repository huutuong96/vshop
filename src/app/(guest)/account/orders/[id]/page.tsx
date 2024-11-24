import OrderDetailSection from "@/app/(guest)/account/orders/[id]/order-detail-section";
import envConfig from "@/config";
import { notFound } from "next/navigation"

export default async function OrderDetailGuestPage({ params: { id } }: { params: { id: string } }) {
  return (
    <OrderDetailSection id={id} />
  )
}
