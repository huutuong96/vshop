import React from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Bell, Calendar, MailPlus, Pencil, Store, TicketIcon, Truck, UserRound } from 'lucide-react';
import WaitDeliveryBuySection from '../_components/wait-delivery-section';
import { cookies } from 'next/headers';

const iconProfile: { title: string, icon: any }[] = [
  {
    title: 'Đại Hội Siêu Sale',
    icon: <UserRound color='blue' />
  },
  {
    title: 'Tài Khoản Của Tôi ',
    icon: <UserRound color='blue' />
  },
  {
    title: 'Đơn Mua',
    icon: <Calendar color='blue' />
  },
  {
    title: 'Thông Báo',
    icon: <Bell color='orange' />
  },
  {
    title: 'Kho Voucher',
    icon: <TicketIcon color='orange' />
  }
]
const DeliveryPage = async() => {
  const cookieToken = await cookies();
  const tokenUser = cookieToken.get('accessToken');

  return (
    <div className='w-content h-auto bg-white'>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Trang chủ</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Đang chờ giao hàng</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className='body-page w-full flex justify-between gap-1 mt-4'>
        <div className='left-body w-[275px] h-[318px] border shadow rounded flex flex-col items-center justify-center pt-4 '>
          <div className='w-[240px] h-[80px] flex gap-5 '>
            <img src="" className='w-[80px] h-full rounded-[60px] bg-slate-500' />
            <div className='w-[195px] h-full flex flex-col justify-center'>
              <span className='text-[18px] font-semibold'>Tuân Nguyễn</span>
              <div className='flex items-center gap-2'>
                <Pencil size={16} color='#888888' />
                <span className='text-[#888888] cursor-pointer'>Sửa Hồ Sơ</span>
              </div>
            </div>
          </div>
          <div className='w-full h-[202px] flex flex-col mt-2 gap-4 pl-5'>
            {
              iconProfile.map(it => (
                <div className='flex gap-3 w-full items-end cursor-pointer' key={it.title}>
                  {it.icon}
                  <p className='text-[14px]'>{it.title}</p>
                </div>
              ))
            }
          </div>
        </div>
        <WaitDeliveryBuySection token={tokenUser?.value}/>
      </div>
    </div>
  );
};

export default DeliveryPage;