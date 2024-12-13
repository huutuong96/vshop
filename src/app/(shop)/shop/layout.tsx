import ShopHeader from "@/app/(shop)/_components/shop-header";
import ShopSidebar from "@/app/(shop)/_components/shop-sidebar";
import ShopWrapper from "@/app/(shop)/shop/shop-wrapper";
import { toast } from "@/components/ui/use-toast";
import envConfig from "@/config";
import { clientAccessToken } from "@/lib/http";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect, useRouter } from "next/navigation";

export const metadata: Metadata = {
  title: "Kênh Người Bán - VNShop",
  description: "Kênh Người Bán VNShop",
};


export default async function ShopLayout({ children }: { children: React.ReactNode }) {
  try {
    const cookieStore = cookies();
    const accessToken = cookieStore.get('accessToken')?.value

    const info = JSON.parse(cookieStore.get('info')?.value as string);

    const res = await fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT_1}/api/shops/${info.shop_id}`, {
      headers: {
        'Authorization': `Bearer ${clientAccessToken.value}`,
        'Content-Type': 'application/json'
      },

    });
    if (!res.ok) {
      throw 'Error';
    }
    const payload = await res.json();

    return (
      <div className="relative">
        <ShopHeader />
        <main className="w-full bg-[#F4F4F4] py-2.5">
          <div className="w-full flex">
            <ShopSidebar />
            <div className=" w-[calc(100vw-292px)] pl-2.5 pr-4">
              <div className="w-full h-auto rounded">
                <ShopWrapper shop={payload.data}>
                  {children}
                </ShopWrapper>
              </div>
            </div>
          </div>
          <footer className="text-center py-4 bg-gray-100 text-sm">
            <p className="text-gray-600">
              © {new Date().getFullYear()} VNShop. All rights reserved.
            </p>
          </footer>
        </main>
      </div>
    )
  } catch (error) {
    redirect('/')
  }
}