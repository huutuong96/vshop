import NewProductTestForm from "@/app/(shop)/shop/product/new/new-product-test-form";


export default function ProductDetailShopPage({ params: { id } }: { params: { id: string } }) {
  return (
    <NewProductTestForm id={id} />
  )
}
