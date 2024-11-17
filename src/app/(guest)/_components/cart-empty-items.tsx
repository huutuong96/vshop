'use client'

import { useRouter } from "next/navigation"

export default function CartEmptyItems() {
  const router = useRouter()
  return (
    <div className='w-full h-[500px] flex items-center justify-center'>
      <div className='flex items-center justify-center flex-col'>
        <img className='size-[100px]' src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/cart/9bdd8040b334d31946f4.png" alt="" />
        <div className='mt-2 text-gray-500 font-semibold'>Giỏ hàng bạn đang trống</div>
        <button onClick={() => { router.push('/') }} className='w-[160px] border py-2 mt-2 bg-blue-700 rounded-lg text-white'>Mua ngay</button>
      </div>
    </div>
  )
}
