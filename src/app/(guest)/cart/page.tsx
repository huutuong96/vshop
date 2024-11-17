import React from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import CartSection from '@/app/(guest)/_components/cart-section';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Giỏ hàng",
};

const CartPageGuest = () => {
  return (
    <div className='w-full'>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Trang chủ </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/components" className='text-black'>Giỏ hàng</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <CartSection />
    </div>
  );
};

export default CartPageGuest;