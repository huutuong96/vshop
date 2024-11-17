import React from 'react';
import { InfoIcon } from 'lucide-react';

const todoItems = [
  { title: 'Chờ Xác Nhận', count: 0 },
  { title: 'Chờ Lấy Hàng', count: 0 },
  { title: 'Đã Xử Lý', count: 0 },
  { title: 'Đơn Hủy', count: 0 },
  { title: 'Trả Hàng / Hoàn Tiền Chờ Xử Lý', count: 0 },
  { title: 'Sản Phẩm Bị Tạm Khóa', count: 1 },
  { title: 'Sản Phẩm Hết Hàng', count: 0 },
  { title: 'Chương Trình Khuyến Mãi Chờ Xử Lý', count: 0 },
];

const analyticItems = [
  { title: 'Doanh số', value: '0', info: 'Vs hôm qua 0,00% --' },
  { title: 'Lượt truy cập', value: '0', info: 'Vs hôm qua 0,00% --' },
  { title: 'Lượt xem', value: '0', info: 'Vs hôm qua 0,00% --' },
  { title: 'Đơn hàng', value: '0', info: 'Vs hôm qua 0,00% --' },
  { title: 'Tỷ lệ chuyển đổi', value: '0,00%', info: 'Vs hôm qua 0,00% --' },
];

export default function DashboardContent() {
  return (
    <div className="flex gap-4 bg-gray-100 p-4">
      <div className="flex-grow space-y-4">
        <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
          <h2 className="text-lg font-semibold mb-2">Danh sách cần làm</h2>
          <p className="text-xs text-gray-500 mb-3">Những việc bạn sẽ phải làm</p>
          <div className="grid grid-cols-4 gap-2">
            {todoItems.map((item, index) => (
              <div key={index} className="border border-gray-200 rounded p-2 text-center bg-gray-50 hover:bg-gray-100 transition-colors">
                <p className="text-lg font-semibold text-blue-600">{item.count}</p>
                <p className="text-xs mt-1">{item.title}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
          <div className="flex justify-between items-center mb-3">
            <div>
              <h2 className="text-lg font-semibold">Phân Tích Bán Hàng</h2>
              <p className="text-xs text-gray-500">Hôm nay 00:00 GMT+7 13:00</p>
            </div>
            <a href="#" className="text-blue-600 text-xs hover:underline">Xem thêm &gt;</a>
          </div>
          <p className="text-xs text-gray-500 mb-3">Tổng quan dữ liệu của shop đối với đơn hàng đã xác nhận</p>
          <div className="grid grid-cols-3 gap-4 mb-4">
            {analyticItems.map((item, index) => (
              <div key={index} className="border-r last:border-r-0 px-2">
                <div className="flex items-center gap-1 mb-1">
                  <span className="text-xs font-medium">{item.title}</span>
                  <InfoIcon size={12} className="text-gray-400" />
                </div>
                <p className="text-lg font-semibold">{item.value}</p>
                <p className="text-xs text-gray-500">{item.info}</p>
              </div>
            ))}
          </div>
          <div className="h-32 bg-gray-100 rounded flex items-center justify-center text-gray-400 text-xs border border-gray-200">
            Chart placeholder
          </div>
        </div>
      </div>

      <div className="w-64 space-y-4">
        <div className="bg-blue-500 text-white rounded-lg shadow-md p-4">
          <h3 className="font-bold mb-2">SPX</h3>
          <p className="text-sm mb-2">LÊN ĐƠN ƯU ĐÃI</p>
          <p className="text-xl font-bold mb-1">ĐỒNG GIÁ 15.000Đ</p>
          <p className="text-xs">*Áp dụng đơn từ 1kg</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold">Thông Báo</h3>
            <a href="#" className="text-blue-600 text-xs hover:underline">Xem thêm &gt;</a>
          </div>
          <div className="text-sm">
            <p className="font-semibold mb-1">AN TÂM LÊN ĐƠN - GIAO HÀNG ĐÚNG HẸN</p>
            <p className="text-xs text-gray-600 mb-2">
              SPX ĐỒNG GIÁ 15.000Đ TOÀN QUỐC 🌈 ÁP DỤNG CHO TẤT CẢ ĐƠN HÀNG DƯỚI 1KG
              🔥 ƯU ĐÃI từ 15.09 - 31.09 👉 LÊN ĐƠN NGAY TẠI WEBSITE SPX.VN
            </p>
            <p className="font-semibold mb-1">Nhà bán hàng chiến lược Shopee</p>
            <p className="text-xs text-gray-600">
              Học ngay chiến lược tối ưu gian hàng với chi phí chỉ 0Đ! Mở cửa hàng trên Shopee rất dễ dàng, 
              đăng bán sản phẩm cũng đơn giản nhưng ra đơn nhiều mỗi ngày là một yếu tố không phải 
              chủ shop nào cũng làm được. Đăng ký nhận tư vấn ngay 👉
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}