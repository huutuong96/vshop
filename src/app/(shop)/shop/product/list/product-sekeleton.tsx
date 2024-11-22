import { Skeleton } from "@/components/ui/skeleton";

export default function ProductSekeleton() {
  return (
    <div className="w-full text-[14px] flex py-4">
      {/* Checkbox */}
      <Skeleton className="ml-4 mr-2 mt-4 w-4 h-4" />

      {/* Thông tin sản phẩm */}
      <div className="flex-[2] p-2 flex items-center gap-4">
        <Skeleton className="size-14 w-14 h-14 rounded-sm" />
        <div className="flex flex-col gap-1">
          <Skeleton className="w-40 h-5" />
          <Skeleton className="w-32 h-4" />
          <Skeleton className="w-28 h-4" />
        </div>
      </div>

      {/* Số lượng */}
      <div className="flex-1 p-2 flex justify-end">
        <Skeleton className="w-8 h-5" />
      </div>

      {/* Giá */}
      <div className="flex-1 p-2 flex justify-end">
        <Skeleton className="w-12 h-5" />
      </div>

      {/* Số lượng tồn kho */}
      <div className="flex-1 p-2 flex justify-end">
        <Skeleton className="w-12 h-5" />
      </div>

      {/* Hành động */}
      <div className="text-blue-500 flex-1 items-end flex flex-col gap-2 p-2">
        <Skeleton className="w-16 h-5" />
        <Skeleton className="w-20 h-5" />
      </div>
    </div>
  )
}
