'use client'
import { Button } from '@/components/ui/button';
import { FaceIcon, InstagramLogoIcon } from '@radix-ui/react-icons';
import { CirclePlayIcon, Facebook, Instagram, MailboxIcon, Phone, PhoneCall, Send } from 'lucide-react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import React from 'react';

const GuestFooter2 = () => {
  const pathname = usePathname();

  return (
    <>
      {['verify', 'verify_email'].every(p => !pathname.endsWith(p)) && (
        // <div className='w-full flex justify-center bg-[#101e41]'>
        //   <div className='w-content'>
        //     <div className='top w-full h-[250px] flex justify-between'>
        //       <div className='w-1/2 h-full border-r-[1.5px] border-gray-500  border-b-[1.5px] flex items-center justify-around text-white'>
        //         <div className="section1 w-[180px] h-[180px] flex flex-col gap-2 text-[14px]">
        //           <span className='font-bold '>Về chúng tôi</span>
        //           <span>Giới thiệu về VNShop</span>
        //           <span>Quy chế hoạt động</span>
        //           <span>Chính sách bảo mật</span>
        //           <span>Giao hàng và nhận hàng</span>
        //           <span>Điều khoản sử dụng</span>
        //         </div>
        //         <div className="section1 w-[180px] h-[180px] flex flex-col gap-2 text-[14px]">
        //           <span className='font-bold'>Dành cho người mua</span>
        //           <span>Giải quyết khiếu nại</span>
        //           <span>Hướng dẫn mua hàng</span>
        //           <span>Chính đổi trả</span>
        //           <span>Chăm sóc khách hàng</span>
        //           <span>Nạp tiền điện thoại</span>
        //         </div>
        //         <div className="section1 w-[180px] h-[180px] flex flex-col  gap-2 text-[14px] ">
        //           <span className='font-bold'>Dành cho người bán</span>
        //           <span>Quy định đối với người bán</span>
        //           <span>Chính sách bán hàng</span>
        //           <span>Hệ thống tiêu chí kiểm duyệt</span>
        //           <span>Bảo mật doanh nghiệp</span>
        //           <span>Mở shop trên VNShop</span>
        //         </div>
        //       </div>
        //       <div className='w-1/2 h-full border-b-[1.5px] border-gray-500 flex flex-col'>
        //         <div className='w-full h-[70px] bg-[#e40a3e] flex justify-center items-center gap-4'>
        //           <div className='w-[40px] h-[40px] bg-white rounded-full flex items-center justify-center'>
        //             <PhoneCall color='#e40a3e' />
        //           </div>
        //           <div className='text-white text-[18px] font-bold'>
        //             <p className=''>Liên hệ với chúng tôi</p>
        //           </div>
        //         </div>
        //         <div className='w-full h-[300px] flex flex-col items-center'>
        //           <div className='w-[300px] h-[100px] flex items-center gap-2 '>
        //             <MailboxIcon size={50} color='white' />
        //             <div className='flex flex-col text-white text-[18px]'>
        //               <p className='font-bold'>Giải quyết thắc mắc </p>
        //               <p className='text-[16px]'>lienhe@vnshop.vn</p>
        //             </div>
        //           </div>
        //           <div className='w-[300px] h-[100px] flex items-center gap-2 '>
        //             <CirclePlayIcon size={50} color='white' />
        //             <div className='flex flex-col text-white text-[18px]'>
        //               <p className='font-bold'>Liên hệ quảng cáo</p>
        //               <p className='text-[16px]'>quangcao@vnshop.vn</p>
        //             </div>
        //           </div>
        //         </div>
        //       </div>
        //     </div>
        //     <div className='bottom w-full h-[50px] flex'>
        //       <div className='w-[800px] h-full border-r-[1.5px] border-gray-500 flex justify-center items-center'>
        //         <div className='w-[300px] text-white'>
        //           <h4 className='font-semibold'>Đăng ký nhận ưu đãi từ VNShop</h4>
        //         </div>
        //         <div className="input-form-footer flex gap-1 w-[400px] h-[32px] items-center">
        //           <input type="text" placeholder="Email của bạn là" className="w-[327px] h-[32px] px-5 border rounded-[5px] outline-none bg-gray-50" />
        //           <Button className='bg-blue-500 h-[32px]'>Đăng ký</Button>
        //         </div>
        //       </div>
        //       <div className='w-[400px] h-full flex justify-center'>
        //         <div className='w-[200px] h-full flex justify-around items-center'>
        //           <div className='w-[40px] h-[40px] rounded-full bg-white flex justify-center items-center cursor-pointer'>
        //             <MailboxIcon />
        //           </div>
        //           <div className='w-[40px] h-[40px] rounded-full bg-white flex justify-center items-center  cursor-pointer'>
        //             <Send />
        //           </div>
        //           <div className='w-[40px] h-[40px] rounded-full bg-white flex justify-center items-center  cursor-pointer'>
        //             <Instagram />
        //           </div>
        //         </div>

        //       </div>
        //     </div>
        //   </div>
        // </div>
        <div className='w-full flex justify-center bg-[#455B80]'>
          <div className='w-content'>
            <div className="bottom-footer w-full  flex justify-between items-start  py-2">
              <div className="bottom-footer-left text-white w-[345px] h-full flex flex-col gap-4 py-5 ">
                <Image
                  src="/images/logo3.png"
                  alt="Lỗi hình ảnh"
                  width={200}
                  height={100}
                  quality={100}
                />
                <h4 className='font-semibold pl-3 text-justify text-[14px]'>Công ty Cổ phần Công nghê VNShop, thành viên của nhóm dự án tốt nghiệp</h4>
                <p className='pl-3 text-justify text-[14px]'><span className='font-bold '>Địa chỉ:</span> Tầng 5, Tòa nhà A, Vườn Ươm Doanh Nghiệp, Lô D.01, Đường Tân Thuận, Khu chế xuất Tân
                  Thuận, Phường Tân Thuận Đông, Quận 7, Thành phố Hồ Chí Minh, Việt Nam.</p>
                <p className='pl-3 text-[14px]'>Email: lienhe@vnshop.vn</p>
              </div>
              <div className='flex flex-col w-[150px] py-8 text-white gap-2'>
                <h4 className='text-[16px] font-bold stroke-1 stroke-black'>Gợi ý trang Website</h4>
                <span className='text-[14px]'>Trang Chủ</span>
                <span className='text-[14px]'>Danh Mục Sản Phẩm</span>
                <span className='text-[14px]'>Tin Tức</span>
                <span className='text-[14px]'>Về Chúng Tôi</span>
                <span className='text-[14px]'>Sản Phẩm Giá Sốc</span>
                <span className='text-[14px]'>Mã Giảm Giá</span>
                <span className='text-[14px]'>Mua Hàng</span>
                <span className='text-[14px]'>Đăng Nhập / Đăng Ký</span>
              </div>
              <div className="bottom-footer-right text-white w-[345px] h-full flex flex-col text-[12px] gap-3 py-8">
                <div className='w-full h-[100px] flex flex-col gap-2'>
                  <h4 className='font-bold text-[16px]'>Theo dõi chúng tôi</h4>
                  <div className='w-full h-[60px] flex justify-start items-center gap-4'>
                    <div className='flex justify-center items-center size-[40px] border rounded bg-white'>
                      <img src="./images/logofb1.webp" alt="" className='size-[40px]' />
                    </div>
                    <div className='flex justify-center items-center size-[40px] border rounded bg-white'>
                      <img src="./images/logotw.png" alt="" className='h-[30px] w-[40px]' />
                    </div>
                    <div className='flex justify-center items-center size-[40px] border rounded bg-white'>
                      <img src="./images/logoit.webp" alt="" className='h-[30px] w-[30px]' />
                    </div>
                    <div className='flex justify-center items-center size-[40px] border rounded bg-white'>
                      <img src="./images/logogm.png" alt="" className='size-[40px]' />
                    </div>
                    <div className='flex justify-center items-center size-[40px] border rounded bg-white'>
                      <img src="./images/logopin.png" alt="" className='size-[20px]' />
                    </div>
                  </div>
                </div>
                <h4 className='font-semibold text-[16px]'>Đăng ký nhận bản tin ưu đãi khủng từ VNShop</h4>
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

export default GuestFooter2;