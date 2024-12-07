'use client'

import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import redis from "@/lib/redis"

export default function TestPage() {

  const toastSuccess = () => {
    toast({ description: "ABX", title: 'ABX', variant: 'success' })
  }

  const set = async () => {
    // Đặt giá trị
    try {
      const res = await redis.set('khang', 'Hello, Khang!', { ex: 3600 }); // hết hạn sau 1 giờ
      console.log(res);
    } catch (error) {

    }

  }

  return (
    <>
      <div className="flex gap-4">
        <div onClick={toastSuccess}>success</div>
        <Button onClick={set}>set</Button>
      </div>
    </>
  )
}
