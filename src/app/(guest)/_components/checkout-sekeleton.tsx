import { Skeleton } from "@/components/ui/skeleton";

export default function CheckoutSekeleton() {
  return (
    <>
      <div className="bg-white border rounded px-[30px] pt-7 pb-6 mt-5">
        <div className="w-[200px] h-[27px]">
          <Skeleton className="size-full rounded" />
        </div>
        <div className="w-full mt-4 flex items-center justify-between">
          <Skeleton className="w-[500px] h-6 rounded" />
          {/* <Skeleton className="w-[80px] h-6 rounded" /> */}
        </div>
      </div>
      <div className="w-full mt-3 rounded-sm bg-white">
        <div className="w-full pt-6 px-[30px] flex items-center">
          <div className="w-full h-[50px] flex items-center">
            <div className="w-[380px] flex-[4] text-left">
              <Skeleton className="w-[150px] h-6 rounded" />
            </div>
            <div className="flex-[2]"></div>
            <div className="flex-[2] flex justify-end">
            </div>
            <div className="flex-[2] flex justify-end">
            </div>
            <div className="flex-[2] flex justify-end">
            </div>
          </div>
        </div>
        <div className="w-full ">
          <div className="w-full">
            <div className="w-full">
              <div className="px-[30px] w-full h-[50px] flex items-center">
                <Skeleton className="w-[200px] h-6 rounded" />
              </div>
              <div className="w-full pb-5 border-b">
                <div className="flex items-center mx-[30px] mt-3">
                  <div className="flex items-center justify-start overflow-hidden flex-[4]">
                    <Skeleton className="size-10 rounded" />
                    <Skeleton className="w-[200px] h-6 rounded ml-4" />
                  </div>
                  <div className="flex-[2] text-sm flex justify-start text-[#929292]">

                  </div>
                  <div className="flex-[2] text-sm text-black flex justify-end">
                  </div>
                  <div className="flex-[2] text-sm text-black flex justify-end">
                  </div>
                  <div className="flex-[2] text-sm text-black flex justify-end">
                  </div>
                </div>

              </div>
              <div className="grid grid-cols-2 border-b border-dashed w-full">
                <div></div>
                <div className="p-[25px]">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                    </div>
                    <div className="flex items-center">
                      <Skeleton className="w-[200px] h-6 rounded" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-[#fafdff] w-full py-[15px] flex justify-end px-[25px]">
                <Skeleton className="w-[200px] h-6 rounded" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full mt-3 rounded-sm bg-white">
        <div className="w-full pt-6 px-[30px] flex items-center">
          <div className="w-full h-[50px] flex items-center">
            <div className="w-[380px] flex-[4] text-left">
              <Skeleton className="w-[150px] h-6 rounded" />
            </div>
            <div className="flex-[2]"></div>
            <div className="flex-[2] flex justify-end">
            </div>
            <div className="flex-[2] flex justify-end">
            </div>
            <div className="flex-[2] flex justify-end">
            </div>
          </div>
        </div>
        <div className="w-full ">
          <div className="w-full">
            <div className="w-full">
              <div className="px-[30px] w-full h-[50px] flex items-center">
                <Skeleton className="w-[200px] h-6 rounded" />
              </div>
              <div className="w-full pb-5 border-b">
                <div className="flex items-center mx-[30px] mt-3">
                  <div className="flex items-center justify-start overflow-hidden flex-[4]">
                    <Skeleton className="size-10 rounded" />
                    <Skeleton className="w-[200px] h-6 rounded ml-4" />
                  </div>
                  <div className="flex-[2] text-sm flex justify-start text-[#929292]">

                  </div>
                  <div className="flex-[2] text-sm text-black flex justify-end">
                  </div>
                  <div className="flex-[2] text-sm text-black flex justify-end">
                  </div>
                  <div className="flex-[2] text-sm text-black flex justify-end">
                  </div>
                </div>

              </div>
              <div className="grid grid-cols-2 border-b border-dashed w-full">
                <div></div>
                <div className="p-[25px]">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                    </div>
                    <div className="flex items-center">
                      <Skeleton className="w-[200px] h-6 rounded" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-[#fafdff] w-full py-[15px] flex justify-end px-[25px]">
                <Skeleton className="w-[200px] h-6 rounded" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
