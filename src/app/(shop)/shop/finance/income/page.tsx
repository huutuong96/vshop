export default function IncomePage() {
  return (
    <div>
      <div className="flex p-4 items-center justify-between">
        <span className="text-[20px] font-semibold">Thu Nhập Của Tôi</span>
      </div>
      <div className="w-full flex gap-4">
        <div className="flex-[3] p-6 mb-4 bg-white rounded-sm shadow">
          <div className="w-full">
            <div className="text-[18px] font-semibold mb-2">
              Tổng Quan
            </div>
            <div className="w-full py-4">
              <div className="w-full flex">
                <div className="flex-1">
                  <div className="text-[16px] font-semibold mb-4">
                    Chưa Thanh Toán
                  </div>
                  <div className="">
                    <div className="text-sm text-gray-500 mb-2">Tổng cộng</div>
                    <div className="text-2xl font-bold">0đ</div>
                  </div>
                </div>
                <div className="flex-1 pl-4 ml-4 border-l">
                  <div className="text-[16px] font-semibold mb-4">
                    Đã Thanh Toán
                  </div>
                  <div className="flex">
                    <div className="flex-[2]">
                      <div className="text-sm text-gray-500 mb-2">Tuần này</div>
                      <div className="text-2xl font-bold">0đ</div>
                    </div>
                    <div className="flex-1">
                      <div className="text-sm text-gray-500 mb-2">Tháng này</div>
                      <div className="text-sm font-bold">0đ</div>
                    </div>
                    <div className="flex-1">
                      <div className="text-sm text-gray-500 mb-2">Tổng cộng</div>
                      <div className="text-sm font-bold">0đ</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="flex-1 p-6 mb-4 bg-white rounded-sm shadow">he</div> */}
      </div>
    </div>
  )
}
