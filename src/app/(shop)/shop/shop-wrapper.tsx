'use client'

import { addShop } from "@/redux/slices/profile.slice";
import { useAppInfoDispatch } from "@/redux/stores/profile.store"
import { useEffect } from "react"

export default function ShopWrapper({ children, shop = null }: { children: React.ReactNode, shop?: any }) {
  const dispatch = useAppInfoDispatch();
  useEffect(() => {
    if (shop) {
      dispatch(addShop(shop.shop))
    }
  }, [shop])
  return (
    <>
      {children}
    </>
  )
}
