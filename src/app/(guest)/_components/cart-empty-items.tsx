'use client'

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function CartEmptyItems() {
  const router = useRouter()
  return (
    <div className='w-full h-[500px] flex items-center justify-center'>
      <div className='flex items-center justify-center flex-col'>
        <img className='size-[100px]' src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/cart/9bdd8040b334d31946f4.png" alt="" />
        <div className='mt-2 text-black font-medium'>Giỏ hàng bạn đang trống</div>
        <Button onClick={() => { router.push('/') }} className='w-[160px] border py-2 mt-4 bg-blue-800 text-white'>Mua ngay</Button>
      </div>
    </div>
  )
}
