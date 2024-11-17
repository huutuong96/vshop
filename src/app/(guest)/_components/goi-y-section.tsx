import productApiRequest from "@/apiRequest/product";
import CardProduct from "@/app/(guest)/_components/card-product";


export default async function GoiYSection() {
  // const data = await productApiRequest.findAll();
  // try {
  //   return (
  //     <div className="w-full">
  //       <div className="w-full py-2 flex justify-between items-center">
  //         <div className="flex gap-2 items-center">
  //           <span className="text-[18px] font-bold">Gợi ý hôm nay</span>
  //         </div>
  //         <div className="text-[13px] text-blue-500 cursor-pointer underline font-semibold">Xem tất cả</div>
  //       </div>
  //       <div className="list-card-product py-3 grid grid-cols-5 gap-4">
  //         {data.payload.data.data.sort(() => Math.random() - 0.5).map((item: any, index: number) => (
  //           <CardProduct key={index} p={item} />
  //         ))}
  //       </div>
  //     </div>
  //   )
  // } catch (error) {
  //   console.log(error);
  // }
  return <div>sp</div>
}
