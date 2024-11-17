import type { Metadata } from "next";
import "./globals.css";
import { Nunito, Roboto } from 'next/font/google'
import { Toaster } from "@/components/ui/toaster"
import { cookies } from "next/headers";
import AppProvider from "@/redux/providers/app.provider";
import ProfileProvider from "@/redux/providers/profile.provider";
import envConfig from "@/config";
import { nanoid } from "nanoid";


const nunito = Nunito({
  subsets: ['latin'],
  display: 'swap',
})




export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const cookieStore = cookies();
  const accessToken = cookieStore.get('accessToken')?.value

  const info = cookieStore.get('info')?.value;
  let cart = null;

  if (accessToken) {
    const res = await fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT_1}/api/carts`, {
      headers: {
        "Authorization": `Bearer ${accessToken}`
      }
    });
    if (!res.ok) {
      return null;
    }
    const payload = await res.json();
    const newCart = payload.shop.map((shop: any) => {
      const shop_id = shop.id;
      const items = payload.cart.filter((p: any) => +p.shop_id === shop_id).map((p: any) => ({ ...p }));

      return {
        ...shop,
        items
      }
    })
    cart = newCart
  }


  return (
    <html lang="en">
      <body suppressHydrationWarning={true} className={`${nunito.className} text-primary !scroll-smooth`}>
        <Toaster />
        <ProfileProvider
          accessToken={accessToken ? accessToken : ''}
          info={accessToken ? JSON.parse(info as string) : null}
          cart={cart}
        >
          {children}
        </ProfileProvider>
      </body>
    </html>
  );
}
