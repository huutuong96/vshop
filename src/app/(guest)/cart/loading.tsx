import { Skeleton } from "@/components/ui/skeleton";

export default function CartPageLoading() {
  return (
    <div className="w-content border p-4 rounded-lg flex gap-4">
      {/* Skeleton cho ảnh */}
      <Skeleton className="w-16 h-16 rounded" />

      {/* Skeleton cho thông tin */}
      <div className="flex flex-1 flex-col gap-2">
        {/* Dòng tiêu đề */}
        <Skeleton className="h-4 w-3/4" />

        {/* Dòng phân loại */}
        <Skeleton className="h-4 w-1/2" />

        {/* Dòng giá */}
        <Skeleton className="h-4 w-1/4" />
      </div>

      {/* Skeleton cho nút tăng giảm */}
      <div className="flex flex-col items-center gap-2">
        <Skeleton className="w-8 h-8" />
        <Skeleton className="w-8 h-8" />
        <Skeleton className="w-8 h-8" />
      </div>
    </div>
  )
}
