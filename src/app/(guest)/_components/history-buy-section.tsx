'use client'
import React, { useEffect, useState } from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Bell, Calendar, MailPlus, Pencil, Store, TicketIcon, Truck, UserRound } from 'lucide-react';
import { cookies } from 'next/headers';
import envConfig from '@/config';

const HistoryBuySection = ({ token }: { token: any }) => {
  const tokenUser = token;
  const [orders, setOrders] = useState<any>([]);
  const [orderDetails, setOrderDetails] = useState<any>([]);
  const [shops, setShops] = useState<any>([]);
  const [products, setProducts] = useState<any>([]);

  useEffect(() => {
    const getApiOrder = async () => {
      try {
        const apiOrder = await fetch(`http://vnshop.top/api/order/user/history`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        });
        const payLoad = await apiOrder.json();
        if (apiOrder.ok) {
          setOrders([...payLoad.data])
        } else {
          throw new Error('Lỗi lấy Api kìa');
        }
      } catch (error) {
        console.log(error);
      }
    }
    getApiOrder();
  }, [orders])


  useEffect(() => {
    const getShop = async () => {
      try {
        const apiShop = await fetch(`http://vnshop.top/api/shops`);
        const payLoad = await apiShop.json();
        if (apiShop.ok) {
          setShops([...payLoad.data.shops]);
        } else {
          throw new Error('Lỗi api kìa')
        }
      } catch (error) {
        console.log(error);
      }
    }
    getShop();
  }, [orders])


  useEffect(() => {
    const getProduct = async () => {
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
    getProduct();
  }, [])




  return (
    <div>
      <div className='right-body w-[920px] h-auto'>
        <div className='nav-menu w-full h-[50px] flex items-center justify-around border rounded shadow'>
          <span className='border-b-2 border-b-blue-500 font-semibold text-blue-500 cursor-pointer'>Tất cả</span>
          <span className='border-b-2 border-b-blue-500 font-medium cursor-pointer'>Chờ thanh toán</span>
          <span className='border-b-2 border-b-blue-500 font-medium cursor-pointer'>Vận chuyển</span>
          <span className='border-b-2 border-b-blue-500 font-medium cursor-pointer'>Chờ giao hàng</span>
          <span className='border-b-2 border-b-blue-500 font-medium cursor-pointer'>Hoàn thành</span>
          <span className='border-b-2 border-b-blue-500 font-medium cursor-pointer'>Đã hủy</span>
          <span className='border-b-2 border-b-blue-500 font-medium cursor-pointer'>Trả hàng/Hoàn tiền</span>
        </div>
        {
          orders.map((item: any) => {
            const findShop = shops.find((fShop: any) => fShop.id == item.shop_id);

            return (
              <div className='listProduct w-full h-[475px] mt-2 border rounded shadow flex flex-col gap-3'>
                <div className='nav-list-product w-full h-[35px] flex justify-between mt-2 px-3'>
                  <div className='flex gap-3 items-end '>
                    <p className='font-semibold text-[16px]'>{findShop ? findShop.shop_name : 'Shop đã biến mất'}</p>
                    <div className='w-[76px] h-[31px] flex items-center justify-center gap-1 border bg-blue-500 rounded-[5px] text-white'>
                      <MailPlus size={20} />
                      <p>Chat</p>
                    </div>
                    <div className='w-[117px] h-[31px] flex items-center justify-center gap-1 border-[2px] rounded-[5px] text-gray-500 font-bold'>
                      <Store size={20} />
                      <p>Xem Shop</p>
                    </div>
                  </div>
                  <div className='flex gap-2 items-end font-semibold text-[#0A68FF]'>
                    <Truck />
                    <p>Giao hàng thành công</p>
                  </div>
                </div>
                <div className='w-full h-[350px] flex flex-col justify-between px-3'>
                  {
                    item.order_details.map((detail: any) => {
                      const findProduct = products.find((fProduct: any) => fProduct.id == detail.product_id)
                      return (
                        <div className='h-[165px] flex gap-3 pt-2'>
                          <img src={`${findProduct.image}`} className='w-[136px] h-full border object-cover' />
                          <div className='flex flex-col justify-center'>
                            <span >{findProduct ? findProduct.name : 'Sản phẩm không hoạt động'}</span>
                            <span className='text-[14px] text-gray-500'>Phân loại: Nano Bạc</span>
                            <span>x{detail.quantity}</span>
                            <div className='flex gap-1 text-red-500'>
                              <span>{findProduct.price}</span>
                              <span>đ</span>
                              <span className='text-[12px]'>-20%</span>
                            </div>
                            <span className='px-2 py-2 border border-[#4A4AFF] w-[190px] text-[14px] text-[#4A4AFF] '>Trả hàng miển phí 15 ngày</span>
                          </div>
                        </div>
                      )
                    })
                  }
                  <div className='w-full h-[1px] bg-gray-300'></div>
                </div>
                <div className='bottom-list-product w-full h-[47px] flex justify-around'>
                  <div className='w-[257px] flex flex-col gap-1 text-[14px] justify-center '>
                    <p>Đánh giá trước ngày 02 - 08- 2024</p>
                    <p className='text-[#7777FF]'>Đánh giá và nhận ngay voucher</p>
                  </div>
                  <div className='w-[334px] flex gap-5 items-center justify-center '>
                    <span className='px-4 py-2 border cursor-pointer bg-[#0A68FF] text-white  hover:bg-gray-400 hover:text-black'>Đánh giá</span>
                    <span className='px-4 py-2 border cursor-pointer text-[#4E4E4E] hover:bg-[#0A68FF] hover:text-white'>Liên hệ</span>
                    <span className='px-4 py-2 border cursor-pointer text-[#4E4E4E] hover:bg-[#0A68FF] hover:text-white'>Mua lại</span>
                  </div>
                </div>
              </div>
            )
          })
        }

      </div>
    </div>
  );
};

export default HistoryBuySection;