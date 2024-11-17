'use client'
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Apple } from 'lucide-react';
import { usePathname } from 'next/navigation';
import React from 'react';

const GuestFooter = () => {
  const pathname = usePathname();

  return (
    <>
      {!pathname.endsWith('verify') && (
        <div className='w-full flex justify-center'>
          <div className='w-content h-[430px]'>
            <div className="top-footer w-full h-[215px] flex justify-between items-center">
              <div className="section1 w-[151px] h-[172px] flex flex-col gap-2 text-[13px]">
                <span className='font-bold '>Về chúng tôi</span>
                <span>Giới thiệu về VNShop</span>
                <span>Quy chế hoạt động</span>
                <span>Chính sách bảo mật</span>
                <span>Giao hàng và nhận hàng</span>
                <span>Điều khoản sử dụng</span>
              </div>
              <div className="section2 h-[172px] flex flex-col gap-2 text-[13px]">
                <span className='font-bold'>Dành cho người mua</span>
                <span>Giải quyết khiếu nại</span>
                <span>Hướng dẫn mua hàng</span>
                <span>Chính đổi trả</span>
                <span>Chăm sóc khách hàng</span>
                <span>Nạp tiền điện thoại</span>
              </div>
              <div className="section3 h-[172px] flex flex-col gap-2 text-[13px]">
                <span className='font-bold'>Dành cho người bán</span>
                <span>Quy đính đối với người bán</span>
                <span>Chính sách bán hàng</span>
                <span>Hệ thống tiêu chí kiểm duyệt</span>
                <span>Mở shop trên VNShop</span>
              </div>
              <div className="section4 w-[248px] flex flex-col gap-2 ">
                <span className='font-bold'>Tải ứng dụng VNShop</span>
                <span>Mang thế giới mua sắm của VNShop trong tầm tay bạn</span>
                <div className="icon-footer-top flex  gap-1">
                  <div className='w-[120px] h-[40px]  bg-black rounded-[5px]'>
                    <div className="content flex justify-center items-center h-full w-full gap-1">
                      <Apple color='white' />
                      <div className='text-white flex flex-col items-center '>
                        <span className='text-[8px]'>Available on the</span>
                        <span className='text-[12px]'>App Store</span>
                      </div>
                    </div>
                  </div>
                  <div className='w-[120px] h-[40px]  bg-black rounded-[5px]'>
                    <div className="content flex justify-center items-center h-full w-full gap-1">
                      <Apple color='white' />
                      <div className='text-white flex flex-col items-center '>
                        <span className='text-[8px]'>Available on the</span>
                        <span className='text-[12px]'>App Store</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="icon-footer-bottom flex  gap-1">
                  <div className='w-[120px] h-[40px] bg-black rounded-[5px]'>
                    <div className="content flex justify-center items-center h-full w-full gap-1">
                      <Apple color='white' />
                      <div className='text-white flex flex-col items-center '>
                        <span className='text-[8px]'>Available on the</span>
                        <span className='text-[12px]'>App Store</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bottom-footer w-full h-[249px] border flex justify-around items-center bg-gray-800">
              <div className="bottom-footer-left text-white w-[545px] h-full flex flex-col text-[12px] gap-3 py-5">
                <h4 className='font-semibold'>Công ty Cổ phần Công nghê VNShop, thành viên của nhóm dự án tốt nghiệp</h4>
                <p>Số ĐKKD: 0312776486 - Ngày cấp: 13/05/2014, được sửa đổi lần thứ 20, ngày 26/04/2022.</p>
                <p>Cơ quan cấp: Sở Kế hoạch và Đầu tư TPHCM.</p>
                <p>Địa chỉ: Tầng 5, Tòa nhà A, Vườn Ươm Doanh Nghiệp, Lô D.01, Đường Tân Thuận, Khu chế xuất Tân
                  Thuận, Phường Tân Thuận Đông, Quận 7, Thành phố Hồ Chí Minh, Việt Nam.</p>
                <p>Email: lienhe@vnshop.vn</p>
                <div className="logo-footer flex w-[236px] h-[33px] gap-5">
                  <img src="" className='border w-[108px] h-full' />
                  <img src="" className='border w-[108px] h-full' />
                </div>
              </div>
              <div className="bottom-footer-right text-white w-[545px] h-full flex flex-col text-[12px] gap-3 py-5">
                <h4 className='font-semibold'>Đăng ký nhận bản tin ưu đãi khủng từ VNShop</h4>
                <div className="input-form-footer flex gap-1 w-full h-[32px] items-center">
                  <input type="text" placeholder="Email của bạn là" className="w-[327px] h-[32px] px-5 border rounded-[5px] outline-none bg-gray-50" />
                  <Button className='bg-blue-500 h-[32px]'>Đăng ký</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GuestFooter;