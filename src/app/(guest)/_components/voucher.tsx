'use client';
import { Button } from '@/components/ui/button';
import React from 'react';

const VoucherComponent = ({data}:{data:any}) => {
  console.log(data);
  
  return (
    <div className='flex justify-center '>
      <div className='w-[318px] flex'>
        <div className='w-[212px] h-full shadow border-y-2 border-l-2'>
          <div className='top w-full h-[60px] flex justify-between  px-1 rounded-l-[5px]'>
            <div className='w-[157px] flex flex-col font-bold text-[15px] justify-center text-[#D5600C]'>
              <span>{data.title}</span>
              <span>{data.limitValue}</span>
            </div>
            <div className='w-[48px] h-[38px] text-[12px] flex items-center justify-end'>
              <span className='text-[#0F62FE]'>Chi tiết</span>
            </div>
          </div>
          <div className='bottom w-full h-[32px] flex gap-2 px-1 items-center '>
            <span className='text-[11px] font-semibold text-gray-400'>HSD</span>
            <span className='text-[12px] font-bold text-[#3F4B53]'>16:59 31/08/2024</span>
          </div>
        </div>
        <div className='w-[16px] h-full flex flex-col'>
          <div className='border-b-4  w-[16px] h-[10px] rounded-b-[44px]'>

          </div>
          <div className=' w-[16px] h-[72px]  rounded-t-[-24px]'>

          </div>
          <div className='border-t-4 w-[16px] h-[10px] rounded-t-[44px]'>

          </div>
        </div>
        <div className='w-[90px] h-full flex items-center justify-center rounded-r-[5px] shadow border-y-2 border-r-2'>
          <Button className='bg-blue-600'>Lưu</Button>
        </div>
      </div>
    </div>

  );
};

export default VoucherComponent;