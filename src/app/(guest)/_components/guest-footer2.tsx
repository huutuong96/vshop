'use client'
import { Button } from '@/components/ui/button';
import { FaceIcon, InstagramLogoIcon } from '@radix-ui/react-icons';
import { CirclePlayIcon, Facebook, Instagram, MailboxIcon, Phone, PhoneCall, Send } from 'lucide-react';
import { usePathname } from 'next/navigation';
import React from 'react';

const GuestFooter2 = () => {
  const pathname = usePathname();

  return (
    <>
      {['verify', 'verify_email'].every(p => !pathname.endsWith(p)) && (
        <div className='w-full flex justify-center bg-[#101e41]'>
          <div className='w-content'>
            <div className='top w-full h-[250px] flex justify-between'>
              <div className='w-1/2 h-full border-r-[1.5px] border-gray-500  border-b-[1.5px] flex items-center justify-around text-white'>
                <div className="section1 w-[180px] h-[180px] flex flex-col gap-2 text-[14px]">
                  <span className='font-bold '>Về chúng tôi</span>
                  <span>Giới thiệu về VNShop</span>
                  <span>Quy chế hoạt động</span>
                  <span>Chính sách bảo mật</span>
                  <span>Giao hàng và nhận hàng</span>
                  <span>Điều khoản sử dụng</span>
                </div>
                <div className="section1 w-[180px] h-[180px] flex flex-col gap-2 text-[14px]">
                  <span className='font-bold'>Dành cho người mua</span>
                  <span>Giải quyết khiếu nại</span>
                  <span>Hướng dẫn mua hàng</span>
                  <span>Chính đổi trả</span>
                  <span>Chăm sóc khách hàng</span>
                  <span>Nạp tiền điện thoại</span>
                </div>
                <div className="section1 w-[180px] h-[180px] flex flex-col  gap-2 text-[14px] ">
                  <span className='font-bold'>Dành cho người bán</span>
                  <span>Quy định đối với người bán</span>
                  <span>Chính sách bán hàng</span>
                  <span>Hệ thống tiêu chí kiểm duyệt</span>
                  <span>Bảo mật doanh nghiệp</span>
                  <span>Mở shop trên VNShop</span>
                </div>
              </div>
              <div className='w-1/2 h-full border-b-[1.5px] border-gray-500 flex flex-col'>
                <div className='w-full h-[70px] bg-[#e40a3e] flex justify-center items-center gap-4'>
                  <div className='w-[40px] h-[40px] bg-white rounded-full flex items-center justify-center'>
                    <PhoneCall color='#e40a3e' />
                  </div>
                  <div className='text-white text-[18px] font-bold'>
                    <p className=''>Liên hệ với chúng tôi</p>
                  </div>
                </div>
                <div className='w-full h-[300px] flex flex-col items-center'>
                  <div className='w-[300px] h-[100px] flex items-center gap-2 '>
                    <MailboxIcon size={50} color='white' />
                    <div className='flex flex-col text-white text-[18px]'>
                      <p className='font-bold'>Giải quyết thắc mắc </p>
                      <p className='text-[16px]'>lienhe@vnshop.vn</p>
                    </div>
                  </div>
                  <div className='w-[300px] h-[100px] flex items-center gap-2 '>
                    <CirclePlayIcon size={50} color='white' />
                    <div className='flex flex-col text-white text-[18px]'>
                      <p className='font-bold'>Liên hệ quảng cáo</p>
                      <p className='text-[16px]'>quangcao@vnshop.vn</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='bottom w-full h-[50px] flex'>
              <div className='w-[800px] h-full border-r-[1.5px] border-gray-500 flex justify-center items-center'>
                <div className='w-[300px] text-white'>
                  <h4 className='font-semibold'>Đăng ký nhận ưu đãi từ VNShop</h4>
                </div>
                <div className="input-form-footer flex gap-1 w-[400px] h-[32px] items-center">
                  <input type="text" placeholder="Email của bạn là" className="w-[327px] h-[32px] px-5 border rounded-[5px] outline-none bg-gray-50" />
                  <Button className='bg-blue-500 h-[32px]'>Đăng ký</Button>
                </div>
              </div>
              <div className='w-[400px] h-full flex justify-center'>
                <div className='w-[200px] h-full flex justify-around items-center'>
                  <div className='w-[40px] h-[40px] rounded-full bg-white flex justify-center items-center cursor-pointer'>
                    <MailboxIcon />
                  </div>
                  <div className='w-[40px] h-[40px] rounded-full bg-white flex justify-center items-center  cursor-pointer'>
                    <Send />
                  </div>
                  <div className='w-[40px] h-[40px] rounded-full bg-white flex justify-center items-center  cursor-pointer'>
                    <Instagram />
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GuestFooter2;