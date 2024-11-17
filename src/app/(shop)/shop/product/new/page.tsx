
import NewProductForm from "@/app/(shop)/_components/new-product-form";
import ShopNewProductProvider from "@/redux/shop-new-product-provider";

export default function CreateProductPage() {
  return (
    <ShopNewProductProvider>
      <div className="w-full flex flex-col gap-6 bg-[#F4F4F4]">
        <NewProductForm />
      </div>
    </ShopNewProductProvider>

  )
}
