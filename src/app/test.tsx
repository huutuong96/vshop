'use client'

import { useEffect } from "react"

export default function TestABX() {
  useEffect(() => {
    fetch(`http://localhost:3000/api/auth/logout`, {
      method: 'POST',
      body: JSON.stringify({})
    }).then(res => { window.location.href = '/' })
  }, [])
  return (
    null
  )
}
