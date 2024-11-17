'use client'
import React, { useEffect, useState } from 'react';
import VoucherComponent from './voucher';
import CategoriesIconGuest from './categoriesIcon';
import CardProduct from './card-product';
import envConfig from '@/config';



const SaleProductSection = () => {
  const [products, setProducts] = useState<any>([]);

  useEffect(() => {
    const getProductSale = async () => {
      try {
        const apiProducts = await fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT_1}/api/products`);
        const payLoad = await apiProducts.json();
        if (apiProducts.ok) {
          setProducts([...payLoad.data.data])
        } else {
          throw new Error('Lấy api lỗi rồi kìa');
        }
      } catch (error) {
        console.log(error);
      }
    }
    getProductSale();
  }, [])



  return (
    <>
      <div className="section2 w-full h-auto mt-6">
        <h1 className='font-bold text-[28px] w-full h-[24px] text-[#FF0000] flex justify-center items-center pt-2'>ĐẠI HỘI SIÊU SALE</h1>
        <div className="sale-voucher-section grid grid-cols-3 w-full justify-center items-center mt-5 gap-3">
          {/* {
            Array.from({ length: 6 }, (_, i) => i + 1).map(item => (
              <VoucherComponent key={item} />
            ))
          } */}
        </div>
      </div>
      <CategoriesIconGuest />
      <div className='card-product w-full'>
        <div className="list-card-product py-3 grid grid-cols-6 gap-4">
          {
            products.filter((item: any) => item.sale_price > 0).map((item: any) => (
              <CardProduct key={item.id} p={item} />
            ))
          }
        </div>
      </div>
    </>
  );
};

export default SaleProductSection;