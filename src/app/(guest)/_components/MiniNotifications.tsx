import React from 'react';
import { Bell } from 'lucide-react';

interface Notification {
  id: number;
  icon: string;
  title: string;
  content: string;
}

const notifications: Notification[] = [
  {
    id: 1,
    icon: "🎫",
    title: "Voucher Mall 300k sắp hết hạn sử dụng!",
    content: "Voucher 300K đơn ShopeeMall sẽ hết hạn vào 19-09-2024! Xài sớm nha!"
  },
  {
    id: 2,
    icon: "📱",
    title: "iPhone 16 series chính thức xuất hiện",
    content: 'Đặt trước vào #20.9 trên Shopee 👉 Thiết kế titan tuyệt đẹp, nâng màu rực rỡ 💖Fan "nhà táo" ơi - Khám phá ngay đây!'
  },
  {
    id: 3,
    icon: "🚚",
    title: "ĐỔI NGAY MÃ FREESHIP 50K BẠN Ơ!!",
    content: "🟣 Giá ưu đãi chỉ 2.000 XU 🌟 Thứ hạng càng cao - Đặc quyền càng nhiều 🎉 Số lượng có hạn - Tranh thủ đổi ngay!"
  },
  {
    id: 4,
    icon: "🎂",
    title: "Cho Shopee biết Sinh Nhật của bạn nhé!",
    content: "🎉 lebasanh ơi! Nhớ điền Ngày Sinh chính xác để có cơ hội nhận nhiều ưu đãi hơn nha! 🎵 Chia sẻ ngay TẠI ĐÂY!"
  },
  {
    id: 5,
    icon: "💰",
    title: "VOUCHER GIẢM 100% TẶNG RIÊNG lebasanh",
    content: "Sử dụng trước 22-09-2024! Giảm 100% đến 20K cho đơn từ 0đ khi thanh toán bằng ShopeePay Số lượng có hạn - Dùng ngay bạn nhé!"
  }
];

const Notifications: React.FC = () => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-4 w-80">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-lg">Thông Báo Mới Nhận</h3>
        <Bell size={20} />
      </div>
      <ul className="space-y-4">
        {notifications.map((notification) => (
          <li key={notification.id} className="flex items-start space-x-2">
            <div className="text-2xl">{notification.icon}</div>
            <div className="flex-1">
              <p className="text-sm font-semibold">{notification.title}</p>
              <p className="text-xs text-gray-600">{notification.content}</p>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-4 text-center">
        <button className="text-[#0E6AFF] font-semibold">Xem tất cả</button>
      </div>
    </div>
  );
};

export default Notifications;
