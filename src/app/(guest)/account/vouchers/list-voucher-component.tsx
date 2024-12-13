'use client'
import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import envConfig from '@/config';
import { clientAccessToken } from '@/lib/http';
import VouchersComponentGuest from '@/app/(guest)/account/vouchers/voucher-component-guest';

const ListVoucherComponent = () => {
  let keywords = useRef<any>('');

  const [typeVouchers, setTypeVouchers] = useState<string>('');
  const [fillVouchers, setFillVouchers] = useState<any>([]);
  const [vouchers, setVouchers] = useState<any>([]);

  const handleTypeVoucher = (typeVoucher: string) => {
    setTypeVouchers(typeVoucher);
  }

  useEffect(() => {
    const getVoucherApi = async () => {
      try {
        const apiVoucher = await fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT_1}/api/get/voucher`, {
          headers: {
            'Authorization': `Bearer ${clientAccessToken.value}`,
            'Content-Type': 'application/json',
          }
        }).then(res => res.json());
        console.log(apiVoucher);

        if (apiVoucher.data.length > 0) {
          setVouchers([...apiVoucher.data]);
          setFillVouchers([...apiVoucher.data]);
        } else {
          throw new Error('Lỗi lấy API rồi kìa');
        }
      } catch (error) {
        console.log(error);
      }
    }
    getVoucherApi()
  }, [])

  const handleFillVoucher = (e: any) => {
    e.preventDefault();
    const keyword = keywords.current.value.toLowerCase();

    const filteredVouchers = vouchers.filter((vc: any) =>
      vc.title.toLowerCase().includes(keyword)
    );

    if (filteredVouchers.length > 0) {
      setFillVouchers([...filteredVouchers]);
    } else {
      setFillVouchers([...vouchers]);
    }
  }

  return (
    <div className='listVoucher w-full flex flex-col gap-2 mt-6 '>
      <div>
        <form onChange={handleFillVoucher}>
          <div className='w-full h-[60px] md:h-[100px] lg:h-[100px] bg-gray-200 rounded flex justify-center gap-4 items-center'>
            <span className='text-[14px] md:text-[16px] lg:text-[16px] '>Mã Voucher</span>
            <input className='w-[200px] md:w-[350px] lg:w-[450px] h-[34px] md:h-[44px] lg:h-[44px] p-2 lg:p-6 outline-none border border-gray-300 rounded text-[14px] md:text-sm lg:text-sm' type="text" placeholder='Nhập mã voucher tại đây' ref={keywords} />
            <Button className='w-[50px] md:w-[100px] lg:w-[100px] h-[34px] md:h-[44px] lg:h-[44px] border bg-blue-500 text-white hover:bg-white hover:text-blue-500 hover:border-blue-500'>Tìm</Button>
          </div>
        </form>
      </div>
      <div className='navList w-full flex gap-3 lg:gap-4 justify-center items-center '>
        <div className='cursor-pointer'>
          <span className={` ${typeVouchers == '' ? 'text-blue-500 border-b-2 border-b-blue-500 ' : 'text-gray-400 border-b-2 border-b-gray-400'}py-1 px-2 md:py-2 md:px-3 lg:py-2 lg:px-4  text-[14px] md:text-sm lg:text-sm`} onClick={() => handleTypeVoucher('')}>Tất cả</span>
        </div>
        <div className='cursor-pointer'>
          <span className={` ${typeVouchers == 'main' ? 'text-blue-500 border-b-2 border-b-blue-500 ' : 'text-gray-400 border-b-2 border-b-gray-400'}py-1 px-2 md:py-2 md:px-3 lg:py-2 lg:px-4  text-[14px] md:text-sm lg:text-sm`} onClick={() => handleTypeVoucher('main')}>Sàn thương mại</span>
        </div>
        <div className='cursor-pointer'>
          <span className={` ${typeVouchers == 'shop' ? 'text-blue-500 border-b-2 border-b-blue-500 ' : 'text-gray-400 border-b-2 border-b-gray-400'}py-1 px-2 md:py-2 md:px-3 lg:py-2 lg:px-4  text-[14px] md:text-sm lg:text-sm`} onClick={() => handleTypeVoucher('shop')}>Shop</span>
        </div>
      </div>
      <div className='w-full '>
        <div>
          <div className='w-full flex justify-center items-center pt-4'>
            <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
              {
                typeVouchers === '' ?
                  fillVouchers.map((item: any, index: number) => (
                    <VouchersComponentGuest data={item} key={index} />
                  ))
                  :
                  fillVouchers.filter((fill: any) => fill.type === typeVouchers).map((item: any, index: number) => (
                    <VouchersComponentGuest data={item} key={index} />
                  ))
              }
            </div>
          </div>
          <div className='w-full flex justify-center pt-6'>
            <Button className='bg-blue-500'>
              <Link href={'../voucherList'}>Xem thêm</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListVoucherComponent;