'use client';

import React, { useState } from "react";
import { ChevronDown, ShoppingBag, Package, BarChart2, HeadphonesIcon, DollarSign, FileText, Store } from "lucide-react"

const menuItems = [
  {
    title: 'Quản Lý Đơn Hàng',
    icon: <ShoppingBag size={20} />,
    subItems: ['Tất cả', 'Giao Hàng Loạt', 'Đơn Hủy', 'Trả Hàng/Hoàn Tiền', 'Cài Đặt Vận Chuyển', 'Bản Giao Đơn Hàng']
  },
  {
    title: 'Quản Lý Sản Phẩm',
    icon: <Package size={20} />,
    subItems: ['Tất Cả Sản Phẩm', 'Thêm Sản Phẩm']
  },
  {
    title: 'Kênh Marketing',
    icon: <BarChart2 size={20} />,
  },
  {
    title: 'Chăm sóc khách hàng',
    icon: <HeadphonesIcon size={20} />,
  },
  {
    title: 'Tài Chính',
    icon: <DollarSign size={20} />,
  },
  {
    title: 'Dữ Liệu',
    icon: <FileText size={20} />,
  },
  {
    title: 'Quản Lý Shop',
    icon: <Store size={20} />,
  }
]

export default function AccountInfo() {
  const [openMenus, setOpenMenus] = useState<number[]>([]);

  const toggleMenu = (index: number) => {
    setOpenMenus(prev =>
      prev.includes(index)
        ? prev.filter(item => item !== index)
        : [...prev, index]
    );
  };

  return (
    <div className="w-full">
      <div className="w-full p-4 py-2 border-b">
        <div className="w-full flex flex-col items-center ">
          <img className='size-[48px] object-cover rounded-full border' src="https://phunuvietnam.mediacdn.vn/media/news/33abffcedac43a654ac7f501856bf700/anh-profile-tiet-lo-g-ve-ban-1.jpg" alt="" />
          <span className="mt-2 text-[14px] font-semibold">Tuan123</span>
        </div>
      </div>
      <div className="w-full px-4">
        {menuItems.map((item, index) => (
          <div key={index} className="py-2 border-b last:border-b-0">
            <div
              className="flex justify-between items-center cursor-pointer hover:bg-gray-100 px-2 py-1"
              onClick={() => item.subItems && toggleMenu(index)}
            >
              <div className="flex items-center gap-2">
                {item.icon}
                <span className="text-[14px]">{item.title}</span>
              </div>
              {item.subItems && (
                <ChevronDown
                  size={16}
                  className={`transition-transform duration-200 ${openMenus.includes(index) ? 'transform rotate-180' : ''}`}
                />
              )}
            </div>
            {item.subItems && openMenus.includes(index) && (
              <div className="ml-6 mt-1">
                {item.subItems.map((subItem, subIndex) => (
                  <div key={subIndex} className="text-[13px] py-1 cursor-pointer hover:text-blue-600">
                    {subItem}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}