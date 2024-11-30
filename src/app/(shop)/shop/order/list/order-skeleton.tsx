import { Skeleton } from "@/components/ui/skeleton";

export default function OrderSkeleton({ count = 3 }) {
  return (
    <div>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="mt-4">
          {/* Header Skeleton */}
          <div className="px-4 h-10 flex rounded-tl-sm border border-blue-50 rounded-tr-sm items-center justify-between bg-[#f5f8fd] text-black text-[14px]">
            <div className="h-6 flex items-center text-black gap-2 font-semibold">
              <Skeleton className="h-6 w-24" />
            </div>
            <Skeleton className="h-6 w-32" />
          </div>

          {/* Body Skeleton */}
          <div className="w-full h-full text-[14px] flex p-4 border-t-0 border border-blue-50 rounded-bl-sm rounded-br-sm">
            <div className="w-full flex -mx-2">
              {/* Order Details */}
              <div className="flex-[2] px-2">
                {[...Array(2)].map((_, subIndex) => (
                  <div key={subIndex} className="-mx-2 mb-2">
                    <div className="flex w-full justify-between px-2">
                      <div className="flex gap-2 items-center">
                        <Skeleton className="size-[56px] mr-2 rounded-sm" />
                        <div className="h-full">
                          <Skeleton className="h-4 w-32 mb-1" />
                          <Skeleton className="h-4 w-24" />
                        </div>
                      </div>
                      <Skeleton className="h-4 w-12" />
                    </div>
                  </div>
                ))}
              </div>

              {/* Total Amount */}
              <div className="flex-1 px-2 flex flex-col">
                <Skeleton className="h-4 w-16 mb-1" />
                <Skeleton className="h-4 w-24" />
              </div>

              {/* Order Status */}
              <div className="flex-1 px-2 flex flex-col">
                <Skeleton className="h-4 w-20 mb-1" />
                <Skeleton className="h-4 w-24" />
              </div>

              {/* Shipping */}
              <div className="flex-1 px-2 flex flex-col">
                <Skeleton className="h-4 w-16" />
              </div>

              {/* Action */}
              <div className="px-2 flex-[0.5] flex flex-col">
                <Skeleton className="h-4 w-16" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};