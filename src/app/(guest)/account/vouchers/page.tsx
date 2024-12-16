import { Button } from '@/components/ui/button';
import React from 'react';
import VoucherSection from '../../_components/voucher-section';
import VoucherComponent from '../../_components/voucher';
import { cookies } from 'next/headers';
import ListVoucherComponent from '@/app/(guest)/account/vouchers/list-voucher-component';

const VoucherPageGuest = async () => {
  const cookieToken = await cookies();
  const tokenUser = cookieToken.get('accessToken');

  return (
    <div className='w-full bg-white'>
      <div className='w-full py-2 px-2 lg:py-4 lg:px-6'>
        <div className='topVoucher w-full flex flex-col gap-2'>
          <div className='w-full h-[50px] flex justify-between items-center'>
            <div className='w-2/5 h-full flex items-center'>
              <h1 className='text-[16px] md:text-[22px] lg:text-[22px] font-bold'>Kho Voucher</h1>
            </div>
            <div className='w-3/5 h-full flex justify-end items-center gap-2'>
              <span className='text-blue-500 text-[14px] md:text-[16px] lg:text[18px] pr-2 border-r-2'>Xem lịch sử voucher</span>
              <span className='text-gray-500 text-[14px] md:text-[16px] lg:text[18px]'>Tìm hiểu</span>
            </div>
          </div>
          <ListVoucherComponent />
        </div>
      </div>
    </div>
  );
};

export default VoucherPageGuest;