'use client';

import LoadingScreen from "@/app/(guest)/_components/loading-screen";
import { useAppInfoSelector } from "@/redux/stores/profile.store";
import { LogOut, Settings, Store } from "lucide-react";
import Link from "next/link";
import { memo, useState } from "react";


const mockImg = 'https://phunuvietnam.mediacdn.vn/media/news/33abffcedac43a654ac7f501856bf700/anh-profile-tiet-lo-g-ve-ban-1.jpg';


function AccountShopInfoDropdown({ onLogout }: { onLogout: any }) {

  const shop = useAppInfoSelector(state => state.profile.shop);
  return (
    <div className="w-full">
      {shop && (
        <>
          <div className="w-full p-4 py-2 border-b">
            <div className="w-full flex flex-col items-center ">
              <img className='size-[48px] object-cover rounded-full border' src={shop?.image || mockImg} alt="" />
              <span className="mt-2 text-[14px] font-semibold">{shop.shop_name}</span>
            </div>
          </div>
          <div className="w-full my-2">
            <Link href={'/shop/setting/info'}>
              <div className="w-full py-2 px-4 hover:bg-gray-50 cursor-pointer">
                <div className="flex gap-3 items-center">
                  <Store size={16} color="#303030" strokeWidth={1.25} />
                  <span className="text-sm">Hồ sơ shop</span>
                </div>
              </div>
            </Link>
            <Link href={'/shop/setting/all-setting'}>
              <div className="w-full py-2 px-4 hover:bg-gray-50 cursor-pointer">
                <div className="flex gap-3 items-center">
                  <Settings size={16} color="#303030" strokeWidth={1.25} />
                  <span className="text-sm">Thiết lập shop</span>
                </div>
              </div>
            </Link>

            <div onClick={onLogout} className="w-full py-2 px-4 hover:bg-gray-50 cursor-pointer">
              <div className="flex gap-3 items-center">
                <LogOut size={16} color="#303030" strokeWidth={1.25} />
                <span className="text-sm">Đăng xuất</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default memo(AccountShopInfoDropdown)