'use client'
import React, { useEffect, useState } from 'react';
import VoucherComponent from './voucher';
import { Button } from '@/components/ui/button';
import envConfig from '@/config';

const VoucherSection = () => {
  const [vouchers, setVouchers] = useState<any>([]);

  useEffect(() => {
    const getVoucherApi = async () => {
      try {
        const apiVoucher = await fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT_1}/api/voucher_main/client`).then(res => res.json());
        // console.log(apiVoucher.data);
        if (apiVoucher.data.length > 0) {
          setVouchers([...apiVoucher.data]);
        } else {
          throw new Error('Lỗi lấy Api rồi kìa');
        }
      } catch (error) {
        console.log(error);
      }
    }
    getVoucherApi()
  }, [])


  return (
    <div>
      <div className='section1 flex gap-10 justify-center items-center h-[50px]'>
        <div className='border-b-[1px] border-blue-500 text-blue-500 px-2 cursor-pointer'>Tất cả</div>
        <div className='border-b-[1px] border-blue-500  px-2 cursor-pointer'>Free Ship</div>
        <div className='border-b-[1px] border-blue-500  px-2 cursor-pointer'>Gần Hết Hạn</div>
        <div className='border-b-[1px] border-blue-500  px-2 cursor-pointer'>Khác</div>
      </div>
      <div className='w-full flex justify-center items-center pt-4'>
        <div className='w-[1000px] grid grid-cols-3 gap-5'>
          {
            vouchers.map((item: any, index: number) => (
              <VoucherComponent data={item} key={item} />
            ))
          }
        </div>
      </div>
      <div className='w-full flex justify-center pt-6'>
        <Button className='bg-blue-500'>Xem thêm</Button>
      </div>
    </div>
  );
};

export default VoucherSection;