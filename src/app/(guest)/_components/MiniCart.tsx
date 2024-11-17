import React from 'react';
import Image from 'next/image';
import { Button } from "@/components/ui/button";

interface SanPham {
  id: number;
  ten: string;
  gia: number;
  hinhAnh: string;
}

const sanPhamTrongGio: SanPham[] = [
  { id: 1, ten: "Vòi xịt rửa xe tăng áp-vòi tưới cây 2...", gia: 69000, hinhAnh: "/images/san-pham-1.jpg" },
  { id: 2, ten: "Chuột gaming không dây bluetoot...", gia: 127000, hinhAnh: "/images/san-pham-2.jpg" },
  { id: 3, ten: "Ốp Lưng iPhone Viền Camera Kim ...", gia: 16900, hinhAnh: "/images/san-pham-3.jpg" },
  { id: 4, ten: "Tai Nghe Không Dây S20 Bluetooth ...", gia: 74000, hinhAnh: "/images/san-pham-4.jpg" },
  { id: 5, ten: "Đồng Hồ quartz Chố...", gia: 51000, hinhAnh: "/images/san-pham-5.jpg" },
];

const MiniCart: React.FC = () => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-4 w-80">
      <h3 className="font-bold text-lg mb-4">Sản Phẩm Mới Thêm</h3>
      <ul className="space-y-4">
        {sanPhamTrongGio.map((sanPham) => (
          <li key={sanPham.id} className="flex items-center space-x-2">
            <Image src={sanPham.hinhAnh} alt={sanPham.ten} width={40} height={40} className="rounded" />
            <div className="flex-1">
              <p className="text-sm truncate">{sanPham.ten}</p>
              <p className="text-[#0E6AFF] font-semibold">{sanPham.gia.toLocaleString()}đ</p>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-4 text-center">
        <p className="mb-2">66 Thêm Hàng Vào Giỏ</p>
        <Button className="w-full bg-[#0E6AFF] hover:bg-[#0D5EE0] text-white">Xem Giỏ Hàng</Button>
      </div>
    </div>
  );
};

export default MiniCart;
