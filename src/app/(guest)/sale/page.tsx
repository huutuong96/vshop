import React from 'react';
import BannerHomeGuest from '../_components/banner';
import { Button } from '@/components/ui/button';
import CategoriesIconGuest from '../_components/categoriesIcon';
import { array } from 'zod';
import CardProduct from '../_components/card-product';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import VoucherComponent from '../_components/voucher';
import SaleProductSection from '../_components/sale-product-section';

const SieuSalePage = () => {
  return (
    <div className='w-content h-auto '>
      <Breadcrumb className="pb-5">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Trang chủ</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className='font-semibold'>Sale</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="banner-sale w-[1179px] h-[247px] flex gap-3 mt-3">
        <div className="banner-left w-1/2  h-[247px] ">
          <img src="./images/banner1.webp" className="rounded-[5px] w-[587px] h-[247px]" />
        </div>
        <div className="banner-right w-1/2 h-[247px] ">
          <img src="./images/banner2.webp" className="rounded-[5px] w-[587px] h-[247px]" />
        </div>
      </div>
      <SaleProductSection/>
    </div>
  );
};

export default SieuSalePage;