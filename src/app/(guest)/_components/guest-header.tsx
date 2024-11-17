'use client'
import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { BadgeCheck, BadgeDollarSign, LayoutGrid, Package, Search, ShoppingBag, Tag, Truck, Bell } from "lucide-react";
import Link from 'next/link';
import MiniCart from './MiniCart';
import Notifications from './MiniNotifications';
import { clientAccessToken } from '@/lib/http';
import { cookies } from 'next/headers';
import ButtonLogout from '@/app/(guest)/_components/button-logout';
import { useAppInfoDispatch, useAppInfoSelector } from '@/redux/stores/profile.store';
import { usePathname, useRouter } from 'next/navigation';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import LoadingScreen from '@/app/(guest)/_components/loading-screen';
import { addAccessToken, addCart, addInfo } from '@/redux/slices/profile.slice';
import envConfig from '@/config';


const tags: { title: string, icon: any }[] = [
  {
    title: 'Cam kết',
    icon: <BadgeCheck size={16} color="blue" />
  },
  {
    title: '100% Hàng thật',
    icon: <BadgeDollarSign size={16} color="blue" />
  },
  {
    title: 'Hoàn 200% nếu hàng giả',
    icon: <Package size={16} color="blue" />,
  },
  {
    title: '30 Ngày đổi trả',
    icon: <Truck size={16} color="blue" />
  }, {
    title: 'Giao nhanh 2h',
    icon: <Truck size={16} color="blue" />
  }, {
    title: 'Giá siêu rẻ',
    icon: <Tag size={16} color="blue" />
  }
]

function truncateText(text: string): string {
  // Kiểm tra nếu độ dài của chuỗi lớn hơn 16
  let length = 13;
  if (text.length > length) {
    // Trả về chuỗi cắt ngắn và thêm dấu '...'
    return text.substring(0, length) + '...';
  }
  // Nếu nhỏ hơn hoặc bằng 16 thì trả về chuỗi ban đầu
  return text;
}

export default function GuestHeader() {
  // const [hienThiMiniCart, setHienThiMiniCart] = useState(false);
  // const [hienThiThongBao, setHienThiThongBao] = useState(false);

  // const cookieStore = cookies();
  // const accessToken = cookieStore.get('accessToken')?.value
  // const info = cookieStore.get('info')?.value
  const pathname = usePathname();
  const [isShowUserDropdownMenu, setIsShowUserDropdownMenu] = useState<boolean>(false);
  const accessToken = useAppInfoSelector(state => state.profile.accessToken);
  const info = useAppInfoSelector(state => state.profile.info);
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useAppInfoDispatch();
  const router = useRouter();
  const cart = useAppInfoSelector(state => state.profile.cart?.cartInfo) as any[];


  const handleLogout = async () => {
    try {
      setLoading(true);
      const a = await fetch(`${envConfig.NEXT_PUBLIC_URL}/api/auth/logout`, {
        method: 'POST',
        body: JSON.stringify({})
      });
      if (a.ok) {
        const res = await a.json();
        // dispatch(addAccessToken(''));
        // dispatch(addInfo(null));
        // dispatch(addCart(null));
        // router.push('/');
        window.location.href = '/'
      }
    } catch (error) {
      setLoading(false);
    } finally {
      setLoading(false);
      console.log(2);
    }
  }




  return (
    <>
      {['verify', 'verify_email'].every(p => !pathname.endsWith(p)) && (
        <div className="w-full flex justify-center border-b sticky top-0 bg-white z-50 shadow-sm">
          <div className="w-content bg-white">
            <div className="top-nav w-full flex gap-4 pt-2 text-[13px] text-[#8E8181] font-normal">
              <Link href={'/shop'}>Kênh người bán</Link>
              <span>Chăm sóc khách hàng</span>
              <span>Nhà cung cấp</span>
            </div>
            <div className="mid-nav w-full h-[70px] flex items-center ">
              <div className="logo w-40 h-[48px]">
                <Link href={'/'}>
                  <img className="size-full object-cover" src="./images/logo.png" alt="" />
                </Link>
              </div>
              <div className="w-[calc(100%-10rem)] h-full flex items-center gap-5 justify-between pl-8">
                <div className="flex items-center gap-5">
                  <div className="icon-cate size-6 ">
                    <LayoutGrid />
                  </div>
                  <div className="input-nav h-10 flex">
                    <input type="text" placeholder="Tìm trên VNShop" className="w-[600px] h-full px-5 border rounded-tl-[16px] rounded-bl-[16px] outline-none text-[13px] bg-gray-50" />
                    <div className="icon-input flex items-center justify-center w-[42px] h-full border-b border-t border-r  rounded-tr-[16px] rounded-br-[16px] bg-gray-50">
                      <Search size={20} />
                    </div>
                  </div>
                </div>
                <div className="nav-dangnhap flex items-center justify-end w-[400px] h-full gap-6">
                  <div className="relative">
                    <Bell
                      className="cursor-pointer"
                      strokeWidth={1.5}
                      size={20}

                    />
                    {/* 
                {hienThiThongBao && (
                  <div className="absolute right-0 mt-2 z-50">
                    <Notifications />
                  </div>
                )} */}
                  </div>
                  <div className="relative">
                    <ShoppingBag
                      className="cursor-pointer"
                      strokeWidth={1.5}
                      size={20}
                      onClick={() => {
                        if (clientAccessToken.value) {
                          router.push('/cart')
                        }
                      }}
                    />
                    {cart && (
                      <div className='absolute -top-4 -right-4 text-[10px] w-6 h-4 p-1 flex items-center justify-center bg-red-500 rounded-xl text-white'>
                        {cart.reduce((acc: number, cur: any) => {
                          return acc + cur.items.reduce((a: number, c: any) => a + (+c.quantity), 0);
                        }, 0)}
                      </div>
                    )}
                    {/* {hienThiMiniCart && (
                  <div className="absolute right-[-150px] mt-2 z-50">
                    <MiniCart />
                  </div>
                )} */}
                  </div>
                  {accessToken ?
                    (
                      // <div
                      //   onMouseMove={() => setIsShowUserDropdownMenu(true)}
                      //   onMouseOut={() => setIsShowUserDropdownMenu(false)}
                      //   className='relative h-[50px] flex items-center'>
                      //   <div className='flex gap-1 cursor-pointer items-center'>
                      //     <div className='size-8'>
                      //       <img
                      //         className='size-full rounded-full'
                      //         src="https://images.unsplash.com/photo-1702478553542-3aa3c0148543?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                      //     </div>
                      //     <div className='text-[14px] max-w-[110px] '>{
                      //       truncateText(info.fullname)
                      //     }</div>
                      //   </div>
                      //   {
                      //     isShowUserDropdownMenu && (
                      //       <div className='bg-white rounded-sm border absolute right-0 top-12 '>
                      //         <ul className=' w-[180px]  '>
                      //           <li className='p-3 text-[14px] hover:text-blue-700 hover:bg-gray-50 cursor-pointer'>
                      //             Tài khoản của tôi
                      //           </li>
                      //           <li className='p-3 text-[14px] hover:text-blue-700 hover:bg-gray-50 cursor-pointer'>
                      //             Đơn mua
                      //           </li>
                      //           <ButtonLogout />
                      //         </ul>
                      //       </div>
                      //     )
                      //   }
                      // </div>

                      <div className='relative h-[50px] flex items-center'>
                        <HoverCard closeDelay={100} openDelay={200}>
                          <HoverCardTrigger>
                            <div className='flex gap-1 cursor-pointer items-center'>
                              <div className='size-8'>
                                <img
                                  className='size-full rounded-full'
                                  src="https://images.unsplash.com/photo-1702478553542-3aa3c0148543?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                              </div>
                              <div className='text-[14px] max-w-[110px] '>
                                {truncateText(info.fullname)}
                              </div>
                            </div>
                          </HoverCardTrigger>
                          <HoverCardContent className='p-0 w-[180px] rounded-sm'>
                            <ul className=' w-full'>
                              <li onClick={() => {
                                router.push('/account')
                              }} className='p-3 text-[14px] transition-all hover:text-blue-700 hover:bg-gray-50 cursor-pointer'>
                                Tài khoản của tôi
                              </li>
                              <li className='p-3 text-[14px] transition-all hover:text-blue-700 hover:bg-gray-50 cursor-pointer'>
                                Đơn mua
                              </li>
                              <li onClick={handleLogout} className='p-3 text-[14px] transition-all hover:text-blue-700 hover:bg-gray-50 cursor-pointer'>
                                Đăng xuất
                              </li>
                            </ul>
                          </HoverCardContent>
                        </HoverCard>
                        {loading && <LoadingScreen />}

                      </div>
                    ) :
                    (
                      <div className='flex gap-2 items-center'>
                        <Link className='text-[14px] text-[#3a3a3a] font-medium hover:text-blue-700' href={'/auth/register'}>Đăng ký</Link>
                        <span className='text-[14px] text-[#3a3a3a]'>|</span>
                        <Link className='text-[14px] text-[#3a3a3a] font-medium hover:text-blue-700' href={'/auth/login'}>Đăng nhập</Link>
                      </div>
                    )}
                </div>
              </div>
            </div>
            <div className="bottom-nav flex w-full h-[20px] items-center gap-4 py-4">
              {tags.map(item => (
                <div key={item.title} className="flex gap-2 items-center">
                  <span className="text-[14px] font-medium">{item.title}</span>
                  {item.icon}
                </div>
              ))}
              <Link href="/blog" className="text-[14px] font-medium">VNSHOP News</Link>
            </div>
          </div>
        </div>
      )}
    </>

  )
}
