'use client'
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function GeustAuthLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="w-content">
      <div className="flex bg-white rounded">
        {/* Left side - Introduction */}
        {['verify', 'verify_email', 'verify_google'].every(p => !pathname.endsWith(p)) && (
          <div className="abx w-1/2 p-12 flex flex-col justify-center items-center">
            <h1 className="text-3xl font-bold text-blue-600 mb-4">Bán hàng chuyên nghiệp</h1>
            <p className="text-gray-600 mb-8 text-center max-w-md">
              Quản lý shop của bạn một cách hiệu quả hơn trên VNShop với VNShop - Kênh Người Bán
            </p>
            <img src="https://octopod.co.in/slink/images/login.svg" className="size-[300px] mb-8" alt="" />
          </div>
        )}


        {/* Right side - Login form */}
        {/* <LoginForm /> */}
        {children}
      </div>
    </div>
  )
}
