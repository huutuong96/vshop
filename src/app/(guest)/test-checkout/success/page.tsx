import { CircleCheckIcon } from "lucide-react";
import Link from "next/link";

export default function SuccessCheckoutPage({ searchParams }: { searchParams: any }) {
  let id = searchParams.id || null;

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="flex flex-col items-center justify-center space-y-2 border bg-white rounded px-6 py-[160px]">
        <CircleCheckIcon className="size-16 text-green-500 dark:text-gray-400" />
        <p className="text-3xl font-bold tracking-tighter">Đặt hàng thành công</p>
        <p className="max-w-[600px] text-center text-gray-500  dark:text-gray-400">
          Bạn có thể kiểm tra thông tin chi tiết về đơn hàng ở gmail hoặc ở tài khoản của bạn! {id ? id : "abx"}
        </p>
        <Link
          href="/"
          className="flex-1 inline-flex px-2 py-1 items-center justify-center rounded-md border border-gray-200 border-gray-200 bg-white hover:bg-gray-100 hover:text-gray-900 dark:border-gray-800 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50"
          prefetch={false}
        >
          Trang chủ
        </Link>
      </div>
      <div className="flex flex-col gap-2 min-[400px]:flex-row">

      </div>
    </div>
  )
}
