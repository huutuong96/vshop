import GuestHeader from "@/app/(guest)/_components/guest-header";
import GuestFooter from "./_components/guest-footer";
import GuestFooter2 from "./_components/guest-footer2";
import { Metadata } from "next";
import { headers } from "next/headers";
import envConfig from "@/config";

export const metadata: Metadata = {
  title: "Trang chủ",
  description: "Trang chủ VNShop",
};


export default async function GuestLayout({ children }: { children: React.ReactNode }) {
  try {
    const res = await fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT_1}/api/main/config/client`);
    if (!res.ok) {
      throw 'Error'
    }
    const payload = await res.json();

    console.log(payload);

    return (
      <div className="bg-white w-full">
        <GuestHeader />
        <div className="w-full py-5 h-auto flex items-center flex-col bg-gray-100">
          {children}
        </div>
        {/* <GuestFooter /> */}
        <GuestFooter2 logoFooter={payload.data.logo_footer} description={payload.data.description} mail={payload.data.mail} address={payload.data.address}/>
      </div>
    )
  } catch (error) {
    return (
      <div className="bg-white w-full">
        <div className="w-full py-5 h-auto flex items-center flex-col bg-gray-100">
          {children}
        </div>
        {/* <GuestFooter /> */}
      </div>
    )
  }

}
