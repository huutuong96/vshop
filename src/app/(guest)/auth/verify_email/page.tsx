
import envConfig from "@/config";
import { CircleCheckBig, Mail } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation"
import { useEffect } from "react";

export default async function VerifyEmail1Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const token = searchParams.token;
  if (token && typeof token === 'string') {
    const res = await fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT_1}/api/confirm`, {
      method: 'POST',
      body: JSON.stringify({ token }),
      headers: {
        'Content-type': "application/json"
      }
    })
    const payload = await res.json();
    if (!res.ok) {
      console.log(payload);
      return <div>Error</div>
    } else {
      console.log(payload);
      return <div className="h-screen w-full bg-gray-100 flex justify-center py-[100px] absolute top-0 left-0">
        <div>
          <div className='bg-white border w-[400px] h-auto p-10'>
            <div className='w-full flex justify-center mb-4'>
              <CircleCheckBig color="#1c76ca" strokeWidth={1.5} className='size-[56px]' />
            </div>
            <h1 className="text-center text-lg font-medium text-gray-900 mb-2">Kích hoạt tài khoản thành công!</h1>
            <div className="flex justify-center gap-4">
              <button className="items-center justify-center gap-2 outline-none rounded-md text-sm font-medium text-primary bg-white hover:bg-primary-50 focus-visible:outline-primary-50 ring-[1.1px] ring-primary px-4 py-2 hidden">Gửi lại email</button>
              <button className="inline-flex items-center justify-center gap-2 outline-none rounded-md text-sm font-medium text-white bg-primary hover:bg-primary-900 focus-visible:outline-primary-900 px-4 py-2">
                <Link href={'/auth/login'}>Quay lại đăng nhập</Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    }
  } else {
    return <div>ko co token</div>
  }
}





//   return (
//     <div>page</div>
//   )
// }
