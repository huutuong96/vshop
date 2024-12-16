'use client'
import React from 'react';
import { Bell } from 'lucide-react';
import { useNotification } from '@/context-apis/notification-provider';
import { useRouter } from 'next/navigation';
import { timeAgo } from '@/app/(shop)/_components/shop-header';

// interface Notification {
//   id: number;
//   icon: string;
//   title: string;
//   content: string;
// }

const notifications: any[] = [
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
  const { notifications } = useNotification();
  const router = useRouter();

  return (
    <div className="bg-white shadow-lg rounded-lg">
      <div className="flex items-center justify-between px-4 pb-2 pt-4 ">
        <h3 className="font-bold text-lg">Thông Báo Mới Nhận</h3>
        <Bell size={20} />
      </div>
      <ul className="">
        {notifications && notifications.data.length > 0 && notifications.data.map((n: any) => (
          <li key={n.id} className="flex items-start p-6 py-2 hover:bg-blue-50">
            <div className="flex gap-4">
              <div className=''>
                <img alt="" src={n.image || ''} className='size-10 border rounded-sm' />
              </div>
              <div>
                {/* Tiêu đề thông báo */}
                <p className="text-sm font-semibold mb-1">{n.title}</p>

                {/* Mô tả thông báo */}
                <p className="text-xs text-gray-600 mb-1">{n.description}</p>

                {/* Ngày tháng năm */}
                <p className="text-[10px] text-gray-400 mt-1">
                  {timeAgo(n.created_at)}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="py-4 text-center">
        <button onClick={() => {
          router.push('/account/notifications')
        }} className="text-blue-800 ">Xem tất cả</button>
      </div>
    </div>
  );
};

export default Notifications;
