'use client'

import LoadingScreen from '@/app/(guest)/_components/loading-screen';
import { toast } from '@/components/ui/use-toast';
import envConfig from '@/config';
import { addAccessToken, addInfo } from '@/redux/slices/profile.slice';
import { useAppInfoDispatch } from '@/redux/stores/profile.store';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';


export default function LoginForm() {
  const [email, setEmail] = useState<string>('khangnd1806@gmail.com');
  const [password, setPassword] = useState<string>('123456');
  const [loading, setLoading] = useState<boolean>(false);
  const [errrorMessage, setErrorMessage] = useState<string>('');
  const dispatch = useAppInfoDispatch();
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const data = { email, password }
    if (!loading) {
      try {
        setLoading(true);
        const loginRes = await fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT_1}/api/users/login`, {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json"
          },
          cache: 'no-cache'
        });
        if (loginRes.ok) {
          const res: { message: string, status: boolean, data: { token: string } } = await loginRes.json();
          const accessToken = res.data.token;
          const a = await fetch(`${envConfig.NEXT_PUBLIC_URL}/api/auth`, {
            method: "POST",
            body: JSON.stringify({ accessToken })
          });
          if (a.ok) {
            const info = await a.json();
            const e = await setTimeout(() => {
              window.location.href = '/'
            }, 500)
          } else {
            const resToNextServer = await a.json();
            throw resToNextServer.message;
          }

        } else {
          const res = await loginRes.json();
          throw res.error;
        }
      } catch (error) {
        setErrorMessage(error as string);
        // console.log({ error });
        setLoading(false);
      } finally {
        setLoading(false);
      }
    }

  }
  return (
    <>
      <div className="w-1/2 bg-gray-100 p-12 flex flex-col justify-center">
        <div className="max-w-md w-full mx-auto">
          <h2 className="text-2xl font-semibold mb-6">Đăng nhập</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 mb-2">Email/Số điện thoại/Tên đăng nhập</label>
              <input
                type="text"
                id="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Nhập email hoặc số điện thoại"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErrorMessage('')
                }}
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-700 mb-2">Mật khẩu</label>
              <input
                type="password"
                id="password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Nhập mật khẩu"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrorMessage('')
                }}
              />
            </div>
            <button
              type="submit"
              className={`w-full bg-blue-600 text-white py-2 px-4 flex items-center justify-center gap-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${loading ? 'opacity-60' : ''}`}
            >
              {/* {loading && (
                <div role="status">
                  <svg aria-hidden="true" className="size-6 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                  </svg>
                  <span className="sr-only">Loading...</span>
                </div>
              )} */}
              ĐĂNG NHẬP
            </button>
            {errrorMessage && (
              <div className='text-red-600 text-[14px] mt-4'>
                {errrorMessage}
              </div>
            )}
          </form>
          <div className="mt-4 flex justify-between items-center">
            <Link href="/forgot-password" className="text-sm text-blue-600 hover:underline">
              Quên mật khẩu?
            </Link>
            <Link href="/login-sms" className="text-sm text-blue-600 hover:underline">
              Đăng nhập với SMS
            </Link>
          </div>
          <div className="mt-6">
            <button className="w-full mb-2 py-2 px-4 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 flex items-center justify-center">
              <Image src="/images/facebook-icon.png" alt="Facebook" width={20} height={20} className="mr-2" />
              Facebook
            </button>
            <button className="w-full py-2 px-4 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 flex items-center justify-center">
              <Image src="/images/google-icon.png" alt="Google" width={20} height={20} className="mr-2" />
              Google
            </button>
          </div>
          <p className="mt-6 text-center text-sm text-gray-600">
            Bạn mới biết đến Shopee? <Link href="/seller-signup" className="text-blue-600 hover:underline">Đăng ký</Link>
          </p>
        </div>
      </div>
      {loading && <LoadingScreen />}
    </>
  )
}
