'use client'
import React, { useEffect, useState } from 'react';
import { InfoIcon } from 'lucide-react';
import envConfig from '@/config';
import { useAppInfoSelector } from '@/redux/stores/profile.store';
import { clientAccessToken } from '@/lib/http';
import { formattedPrice } from '@/lib/utils';
import DashboardChart from '@/app/(shop)/_components/dashboard-chart';

type DashboardData = {
  total_order: number;
  total_product: number;
  total_revenue: string;
  total_follow: number;
  total_view: number;
  total_rating: number;
  orders_wait_confirm: number;
  orders_confirmed: number;
  orders_prepare: number;
  orders_packed: number;
  orders_handed_over: number;
  orders_shipping: number;
  orders_delivery_failed: number;
  orders_delivered: number;
  orders_complete: number;
  orders_refund: number;
  orders_canceled: number;
};


const Page: React.FC = () => {
  const info = useAppInfoSelector((state) => state.profile.info);
  const [data, setData] = useState<DashboardData | null>(null);
  const [todoItems, setTodoItems] = useState([
    { title: 'Chờ Xác Nhận', count: 0 },
    { title: 'Chờ Lấy Hàng', count: 0 },
    { title: 'Đã Xử Lý', count: 0 },
    { title: 'Đơn Hủy', count: 0 },
    { title: 'Trả Hàng / Hoàn Tiền Chờ Xử Lý', count: 0 },
    { title: 'Sản Phẩm Bị Tạm Khóa', count: 0 },
    { title: 'Sản Phẩm Hết Hàng', count: 0 },
    { title: 'Chương Trình Khuyến Mãi Chờ Xử Lý', count: 0 },
  ]);

  const [analyticItems, setAnalyticItems] = useState([
    { title: 'Doanh số', value: '0', info: 'Vs hôm qua 0,00% --' },
    { title: 'Lượt truy cập', value: '0', info: 'Vs hôm qua 0,00% --' },
    { title: 'Lượt xem', value: '0', info: 'Vs hôm qua 0,00% --' },
    { title: 'Đơn hàng', value: '0', info: 'Vs hôm qua 0,00% --' },
    { title: 'Tỷ lệ chuyển đổi', value: '0,00%', info: 'Vs hôm qua 0,00% --' },
  ]);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT_1}/api/shop/get_dashboard_shop/${info.shop_id}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${clientAccessToken.value}`,
            'Content-Type': 'application/json',
          },
        });


        if (!res.ok) {
          throw 'ERror'
        }
        const payload = await res.json();
        const data = payload.data || [];
        setData(data);
        setTodoItems([
          { title: 'Chờ Xác Nhận', count: data.orders_wait_confirm },
          { title: 'Chờ Lấy Hàng', count: data.orders_prepare },
          { title: 'Đã Xử Lý', count: data.orders_complete },
          { title: 'Đơn Hủy', count: data.orders_canceled },
          { title: 'Trả Hàng / Hoàn Tiền Chờ Xử Lý', count: data.orders_refund },
          { title: 'Sản Phẩm Bị Tạm Khóa', count: 1 },
          { title: 'Sản Phẩm Hết Hàng', count: 0 },
          { title: 'Chương Trình Khuyến Mãi Chờ Xử Lý', count: 0 },
        ]);

        setAnalyticItems([
          { title: 'Doanh số', value: data.total_revenue, info: 'Vs hôm qua 0,00% --' },
          { title: 'Lượt truy cập', value: `${data.total_follow}`, info: 'Vs hôm qua 0,00% --' },
          { title: 'Lượt xem', value: `${data.total_view}`, info: 'Vs hôm qua 0,00% --' },
          { title: 'Đơn hàng', value: `${data.total_order}`, info: 'Vs hôm qua 0,00% --' },
          { title: 'Tỷ lệ chuyển đổi', value: '0,00%', info: 'Vs hôm qua 0,00% --' },
        ]);
      } catch (error) {
        console.error(error);
      }
    };
    if (info.shop_id) {
      getData();
    }
  }, []);

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
                <p className="text-lg font-semibold">
                  {item.title === 'Doanh số' ? formattedPrice(+item.value) : item.value}</p>
                {/* <p className="text-xs text-gray-500">{item.info}</p> */}
              </div>
            ))}
          </div>
          <DashboardChart />
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
};

export default Page;
