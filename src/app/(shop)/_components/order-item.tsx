
export default function OrderItem() {
  return (
    <div className="mt-4 border rounded-sm">
      <div className="p-2 flex items-center justify-between bg-[#F0F0F0] text-black text-[14px]">
        <span>Khách hàng: Test2</span>
        <span>Mã đơn hàng: 01234544ds5</span>
      </div>
      <div className="w-full h-full text-[14px] flex">
        <div className="w-[364px] p-2 pr-6">
          <div className="flex w-full justify-between mt-1">
            <div className="flex gap-2 items-center">
              <div className="size-[92px]">
                <img src="https://down-vn.img.susercontent.com/file/vn-11134207-7qukw-lk0onee5bmb8cc" className="size-full object-cover border" alt="" />
              </div>
              <div className="">
                <button className="bg-[#FFE8E8] text-[#E12E2E] px-4 py-1 text-[12px] rounded-sm">Đã hủy đơn</button>
                <div className="flex flex-col mt-1 ml-2">
                  <span className="font-bold">Áo màu vàng</span>
                  <span>Phân loại: màu vàng, size XL</span>
                </div>
              </div>
            </div>
            <div className="text-[12px]">x1</div>
          </div>
        </div>
        <div className="w-[200px] p-2">
          <div className="text-black font-medium">120.000đ</div>
          <div className="text-[#585858] mt-1">Thanh toán khi nhận hàng</div>
        </div>
        <div className="w-[280px] p-2">
          <div className="text-black font-medium">Đã hủy</div>
          <div className="text-[#585858] mt-1">Đã hủy bởi người mua</div>
        </div>
        <div className="w-[200px] p-2">
          <div className="text-black font-medium">Nhanh</div>
          <div className="text-[#585858] mt-1">GHTK</div>
        </div>
        <div className="p-2 text-blue-500 cursor-pointer">Xem chi tiết</div>
      </div>
    </div>
  )
}
