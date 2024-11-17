'use client'

import LoadingScreen from '@/app/(guest)/_components/loading-screen';
import { Mail } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { FormEvent, useState } from 'react';

export default function VerifyForm() {
  const searchParams = useSearchParams();
  const email = searchParams.get('email');

  return (
    <>
      <div className="h-screen w-full bg-gray-100 flex justify-center py-[100px] absolute top-0 left-0">
        <div>
          <div className='bg-white border w-[400px] h-auto p-10'>
            <div className='w-full flex justify-center mb-4'>
              <Mail color="#056ad6" strokeWidth={1.5} className='size-[56px]' />
            </div>
            <h1 className="text-center text-lg font-medium text-gray-900 mb-2">Kiểm tra email của bạn</h1>
            <p className="text-sm text-center text-gray-500 mb-6">
              VNShop đã gửi 1 email tới&nbsp;
              <span className="text-blue-600">{email}</span>
              . Nhấn vào link đính kèm trong email để xác thực tài khoản của bạn.
            </p>
            <div className="flex justify-center gap-4">
              <button className="items-center justify-center gap-2 outline-none rounded-md text-sm font-medium text-primary bg-white hover:bg-primary-50 focus-visible:outline-primary-50 ring-[1.1px] ring-primary px-4 py-2 hidden">Gửi lại email</button>
              <button className="inline-flex items-center justify-center gap-2 outline-none rounded-md text-sm font-medium text-white bg-primary hover:bg-primary-900 focus-visible:outline-primary-900 px-4 py-2">
                <Link href={'/auth/login'}>Quay lại đăng nhập</Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
