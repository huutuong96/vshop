'use client'
import CreateShopForm from "@/app/(shop)/_components/create-shop-form";
import CreateShopFormTest from "@/app/(shop)/_components/create-shop-form-test";
import ShopHeader from "@/app/(shop)/_components/shop-header";
import { useAppInfoSelector } from "@/redux/stores/profile.store";

export default function WelcomeShopPage() {
  const info = useAppInfoSelector(state => state.profile.info);
  return (
    <div className="">
      <ShopHeader />
      <div className="bg-gray-100 flex items-center justify-center py-10">
        <div className="w-content bg-white border shadow rounded px-6">
          <div className="w-full border-b p-4">
            Thông tin Shop
          </div>
          <CreateShopFormTest info={info} />
        </div>
      </div>
    </div>
  )
}
