'use client'

import { useSearchParams } from "next/navigation"
import { useEffect } from "react";

export default function Google() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch(`/api/auth`, {
          method: "POST",
          body: JSON.stringify({ accessToken: token })
        });
        if (!res.ok) {
          const resToNextServer = await res.json();
          throw resToNextServer.message;
        }
        const info = await res.json();
        // const historyPath = localStorage.getItem('historyPath') ?? '/'
        window.location.href = '/';
      } catch (error) {
        console.log(error);
      }
    }
    if (token) {
      getData()
    }
  }, [token])

  return (
    null
  )
}
