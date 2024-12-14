import productApiRequest from "@/apiRequest/product";
import CardProduct from "@/app/(guest)/_components/card-product";
import Link from "next/link";


export default async function GoiYSection() {
  try {
    const data = await productApiRequest.productByViewCount();
    return (
      <div className="w-full">
        <div className="w-full py-2 flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <span className="text-[18px] font-bold">Sản phẩm xem nhiều</span>
          </div>
          <Link href={'/search?filter=view_count'} className="text-[13px] text-blue-500 cursor-pointer underline font-semibold">Xem tất cả</Link>
        </div>
        <div className="list-card-product py-3 grid grid-cols-5 gap-4">
          {data.payload.data.data.map((item: any, index: number) => (
            <CardProduct key={index} p={item} />
          ))}
        </div>
        <div className="mt-4 flex justify-center">
          Xem thêm
        </div>
      </div>
    )
  } catch (error) {
    console.log(error);
  }
}
