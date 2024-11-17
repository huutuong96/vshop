import React from 'react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import VoucherComponent from '../_components/voucher';
import { Button } from '@/components/ui/button';
import VoucherSection from '../_components/voucher-section';


const VoucherPageGuest = () => {
  return (
    <div className='w-content h-[800px] '>
      <Breadcrumb className="pb-5">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Trang chủ</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className='font-semibold'>Danh sách voucher</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      {/* <div className='section1 flex gap-10 justify-center items-center h-[50px]'>
        <div className='border-b-[1px] border-blue-500 text-blue-500 px-2 cursor-pointer'>Tất cả</div>
        <div className='border-b-[1px] border-blue-500  px-2 cursor-pointer'>Free Ship</div>
        <div className='border-b-[1px] border-blue-500  px-2 cursor-pointer'>Gần Hết Hạn</div>
        <div className='border-b-[1px] border-blue-500  px-2 cursor-pointer'>Khác</div>
      </div>
      <div className='w-full flex justify-center items-center pt-4'>
        <div className='w-[1000px] grid grid-cols-3 gap-5'>
          {
            Array.from({ length: 12 }, (_, i) => i + 1).map(item => (
              <VoucherComponent key={item} />
            ))
          }
        </div>
      </div>
      <div className='w-full flex justify-center pt-6'>
        <Button className='bg-blue-500'>Xem thêm</Button>
      </div> */}
      <VoucherSection/>
    </div>
  );
};

export default VoucherPageGuest;