

export default function TestPage() {

  return (
    <>
      <div className="border w-content bg-white p-2 rounded-sm">
        <div className="font-semibold text-xl">Tổng Quan</div>
        <div className="text-[13px] text-gray-400">Các thông tin cơ bản của mã giảm giá</div>
        <div>
          <label>Tiêu đề</label>
          <input type="text" />
        </div>
        <div>
          <div className="flex justify-between items-center">
            <label>Mã giảm giá</label>
            <button>Tạo mã ngẫu nhiên</button>
          </div>
          <input type="text" />
        </div>
        <div>
          <label>Mô tả</label>
          <input type="text" />
        </div>
        <div className="grid grid-cols-3">
          <div>
            <label>Loại giảm giá</label>
            <select name="" id="">
              <option value="1">Giảm giá đơn hàng</option>
              <option value="2">Giảm giá vận chuyển</option>
            </select>
          </div>
          <div>
            <label>Phương thức giảm giá</label>
            <select name="" id="">
              <option value="1">Số tiền</option>
              <option value="2">Phần trăm</option>
            </select>
          </div>
          <div>
            <label>Giảm giá</label>
            <input type="text" />
          </div>
          <div>
            <label>Số lượng</label>
            <input type="text" />
          </div>
          <div>
            <label>Sử dụng tối đa</label>
            <input type="text" />
          </div>
        </div>
      </div>
      <div className="border w-content bg-white p-2 rounded-sm">
        <div>Ngày giờ</div>
        <div>Chọn thời gian giảm giá</div>
        <div className="flex">
          <div className="flex-1">
            <label>Thời gian bắt đầu</label>
            <input type="datetime" name="" id="" />
          </div>
          <div className="flex-1">
            <label>Thời gian kết thúc</label>
            <input type="datetime" name="" id="" />
          </div>
        </div>
      </div>
    </>
  )
}
