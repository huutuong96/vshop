import type { Metadata } from "next";
import "./globals.css";
import { Nunito, Roboto } from 'next/font/google'
import { Toaster } from "@/components/ui/toaster"
import { cookies } from "next/headers";
import AppProvider from "@/redux/providers/app.provider";
import ProfileProvider from "@/redux/providers/profile.provider";
import envConfig from "@/config";
import { nanoid } from "nanoid";
import { redirect } from "next/navigation";
import TestABX from "@/app/test";
import { NotificationProvider } from "@/context-apis/notification-provider";


const nunito = Nunito({
  subsets: ['latin'],
  display: 'swap',
})




export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  try {
    const cookieStore = cookies();
    const accessToken = cookieStore.get('accessToken')?.value

    const info = cookieStore.get('info')?.value;
    let cart = null;
    let test = null;
    let addresses = null;
    if (accessToken) {
      const [cartRes, addressesRes] = await Promise.all([
        fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT_1}/api/carts`, {
          headers: {
            "Authorization": `Bearer ${accessToken}`
          }
        }),
        fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT_1}/api/address`, {
          headers: {
            "Authorization": `Bearer ${accessToken}`,
            "Content-Type": "application/json"
          },
        })
      ]);


      if (!cartRes.ok || !addressesRes.ok) {
        throw 'Error'

      }
      const cartPayload = await cartRes.json();
      const addressesPayload = await addressesRes.json();

      const newCart = cartPayload.shop.map((shop: any) => {
        const shop_id = shop.id;
        const items = cartPayload.cart.filter((p: any) => +p.shop_id === shop_id).map((p: any) => ({ ...p }));

        return {
          ...shop,
          items
        }
      })
      cart = newCart
      test = cartPayload;
      let a = (addressesPayload.data as any[]).filter(a => !+a.default);
      let b = (addressesPayload.data as any[]).find(a => +a.default);
      if (b) {
        a.unshift(b);
        addresses = [...a]
      } else {
        a = []
      }
    }


    return (
      <html lang="en">
        <body suppressHydrationWarning={true} className={`${nunito.className} text-primary !scroll-smooth`}>
          <Toaster />
          <ProfileProvider
            accessToken={accessToken ? accessToken : ''}
            info={accessToken ? JSON.parse(info as string) : null}
            cart={cart}
            test={test}
            addresses={addresses}
          >
            <NotificationProvider>
              {children}
            </NotificationProvider>
          </ProfileProvider>
        </body>
      </html>
    );


  } catch (error) {
    return (
      <TestABX />
    )
  }

}
