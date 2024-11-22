import { Skeleton } from "@/components/ui/skeleton"

export default function OrderSkeleton() {
  return (
    <>
      <div className="my-3 ">
        <div className=' w-full  flex flex-col gap-3 p-6 border border-b-0 rounded bg-white ' >
          <div className="w-full">
            <div className='nav-list-product w-full h-[35px] flex justify-between pb-3 border-b'>
              <div className='flex gap-3 items-end '>
                <Skeleton className="h-6 w-[200px]" />
              </div>
            </div>
            <div className='w-full flex flex-col justify-between'>
              <div className={`w-full flex items-center gap-3 py-3 `}>
                <div className=''>
                  <Skeleton className="size-20" />
                </div>
                <div className='w-full flex gap-6 justify-between'>
                </div>
              </div>
            </div>

          </div>
        </div>
        <div className='flex gap-5 items-center justify-center border-t border-dashed rounded bg-[#fffefb] '>
          <div className="w-full px-6 pt-6 py-6">
            <div className="w-full h-[30px] ">
              <div className="size-full flex justify-end items-center gap-2">
                <Skeleton className="w-[100px] h-6" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
