'use client'

import LoadingScreen from "@/app/(guest)/_components/loading-screen"
import { useEffect } from "react"

export default function TestABX() {
  useEffect(() => {
    fetch(`/api/auth/logout`, {
      method: 'POST',
      body: JSON.stringify({})
    }).then(res => { window.location.href = '/' })
  }, [])
  return (
    <LoadingScreen />
  )
}
