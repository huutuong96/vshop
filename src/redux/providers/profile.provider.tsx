'use client'

import { toast } from "@/components/ui/use-toast"
import envConfig from "@/config"
import { clientAccessToken, shop_id } from "@/lib/http"
import { addAccessToken, addCart, addInfo } from "@/redux/slices/profile.slice"
import { ProfileStore, profileStore } from "@/redux/stores/profile.store"
import { useEffect, useRef } from "react"
import { Provider } from "react-redux"

export default function ProfileProvider({
  children,
  accessToken = '',
  info = null,
  cart = null
}: {
  children: React.ReactNode,
  accessToken?: string
  info?: any
  cart?: any | null
}) {
  const storeRef = useRef<ProfileStore>()
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = profileStore()
    storeRef.current.dispatch(addAccessToken(accessToken));
    clientAccessToken.value = accessToken;
    if (accessToken) {
      storeRef.current.dispatch(addInfo(info));
      storeRef.current.dispatch(addCart(cart));
      shop_id.value = info.shop_id;
    }
    // if (typeof window !== 'undefined') {
    //   clientAccessToken.value = accessToken;
    // }
  }

  return (
    <Provider store={storeRef.current}>{children}</Provider>
  )
}

