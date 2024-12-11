'use client'
import { Button } from '@/components/ui/button';
import envConfig from '@/config';
import { FaceIcon, InstagramLogoIcon } from '@radix-ui/react-icons';
import { Description } from '@radix-ui/react-toast';
import { set } from 'lodash';
import { CirclePlayIcon, Facebook, Instagram, MailboxIcon, Phone, PhoneCall, Send } from 'lucide-react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import React from 'react';
import { useEffect, useState } from 'react';


interface GuestFooter2Props {
  logoFooter: string;
  description: string;
  mail: string;
  address: string;
}

const GuestFooter2: React.FC<GuestFooter2Props> = ({ logoFooter, description, mail, address }) => {
  const [infoFooter, setInfoFooter] = useState<any>();
  const pathname = usePathname();
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT_1}/api/main/config/client`);
        const payload = await res.json();
        if (!res.ok) {
          throw 'Error'
        }
        setInfoFooter({ ...payload.data });
      } catch (error) {
        console.log('Error');
      }
    }
    // getData()
  }, [])

  return (
    <>
      {['verify', 'verify_email'].every(p => !pathname.endsWith(p)) && (

        <div className='w-full flex justify-center bg-[#455B80]'>
          <div className='w-content'>
            <div className="bottom-footer w-full  flex justify-between items-start  py-2">
              <div className="bottom-footer-left text-white w-[345px] h-full flex flex-col gap-4 py-5 ">
                <img className='' src={logoFooter}></img>

                <h4 className='font-semibold pl-3 text-justify text-[14px]'>{description}</h4>
                <p className='pl-3 text-justify text-[14px]'><span className='font-bold '>Địa chỉ:</span>{address}</p>
                <p className='pl-3 text-[14px]'>Email: {mail}</p>
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