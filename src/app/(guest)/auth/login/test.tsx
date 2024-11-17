'use client'

import { useAppSelector } from "@/redux/stores/profile.store"
import { useRouter } from "next/navigation";

export default function TestWrap({ children }: { children: React.ReactNode }) {
  const accessToken = useAppSelector(state => state.profile.accessToken);
  const router = useRouter();

  if (accessToken) {
    router.push('/')
  }
  return <>
    {children}
  </>
}