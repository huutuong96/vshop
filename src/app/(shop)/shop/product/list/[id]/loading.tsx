import { Skeleton } from "@/components/ui/skeleton";

export default function ProductDetailShopLoading() {
  return (
    <div className="w-full bg-white rounded animate-pulse">
      <div className="p-6 w-full">
        <div className="w-full">
          {/* Header */}
          <div className="text-xl font-semibold mb-4">
            Thông tin cơ bản
          </div>

          {/* Tên sản phẩm */}
          <div className="my-6">
            <div className="text-sm mb-2 font-semibold flex items-center gap-1">
              <Skeleton className="h-4 w-[100px]" />
            </div>
            <Skeleton className="h-[30px] w-1/2 rounded" />
          </div>

          {/* Section Category */}
          <div className="my-6">
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-[30px] w-1/2 rounded mt-2" />
          </div>

          {/* Ảnh sản phẩm */}
          <div className="my-6">
            <div className="text-sm mb-2 font-semibold flex items-center gap-1">
              <Skeleton className="h-4 w-1/4" />
            </div>
            <div className="w-full p-4 bg-[#f5f8fd] rounded flex gap-2">
              {/* Skeleton cho các ảnh */}
              <Skeleton className="h-20 w-20 rounded" />
            </div>
          </div>

          {/* Ảnh nền sản phẩm */}
          <div className="mt-6">
            <div className="text-sm mb-2 font-semibold flex items-center gap-1">
              <Skeleton className="h-4 w-1/4" />
            </div>
            <div className="w-1/2 p-4 bg-[#f5f8fd] rounded">
              <Skeleton className="h-20 w-20 rounded" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
