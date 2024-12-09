import productRecomend from "@/apiRequest/product_release";
import CardProduct from "@/app/(guest)/_components/card-product";


export default async function GoiYSanPhamSection() {
  try {
    const data = await productRecomend.findAll();
    return (
      <div className="w-full">
        <div className="w-full py-2 flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <span className="text-[18px] font-bold">Gợi ý hôm nay</span> 
            {/* Hàm này dùng thuật toán dự đoán dựa trên đơn hàng mà user đã mua để đề xuất sản phẩm cho user */}
            {/* Mỗi user sẽ đề xuất sản phẩm khác nhau dựa trên phân tích hành vi người dùng, không hiểu hỏi em */}
          </div>
          <div className="text-[13px] text-blue-500 cursor-pointer underline font-semibold">Xem tất cả</div>
        </div>
        <div className="list-card-product py-3 grid grid-cols-5 gap-4">
          {data.payload.data.slice(0, 5).map((item: any, index: number) => (
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
