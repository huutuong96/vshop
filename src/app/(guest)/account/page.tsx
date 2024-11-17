import React from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Bell, Calendar, Facebook, Mail, MailPlus, Pencil, Phone, RefreshCcw, Star, Store, TicketIcon, Truck, UserRound, Wrench } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@radix-ui/react-checkbox';
import { Button } from '@/components/ui/button';

const iconProfile: { title: string, icon: any }[] = [
  {
    title: 'Đại Hội Siêu Sale',
    icon: <UserRound color='blue' />
  },
  {
    title: 'Tài Khoản Của Tôi ',
    icon: <UserRound color='blue' />
  },
  {
    title: 'Đơn Mua',
    icon: <Calendar color='blue' />
  },
  {
    title: 'Thông Báo',
    icon: <Bell color='orange' />
  },
  {
    title: 'Kho Voucher',
    icon: <TicketIcon color='orange' />
  }
]

const gioiTinh: { title: string }[] = [
  { title: 'Nam' },
  { title: 'Nữ' },
  { title: 'Khác' }
]

const UserProfilePage = () => {
  return (
    <div className='w-content h-auto bg-white'>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Trang chủ</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Hồ sơ cá nhân</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className='body-page w-full flex justify-between gap-1 mt-4'>
        <div className='left-body w-[275px] h-[340px] border shadow rounded flex flex-col items-center  pt-4 '>
          <div className='w-[240px] h-[80px] flex gap-5 '>
            <img src="" className='w-[80px] h-full rounded-[60px] bg-slate-500' />
            <div className='w-[195px] h-full flex flex-col justify-center'>
              <div className='w-full h-[20px] flex justify-start gap-1'>
                <img src="./images/kimcuongRank.png" className='w-[20px] h-full' alt="Lỗi rank" />
                <span className='text-[18px] font-semibold'>Tuân Nguyễn</span>
              </div>
              <div className='flex items-center gap-2'>
                <Pencil size={16} color='#888888' />
                <span className='text-[#888888] cursor-pointer'>Sửa hồ sơ</span>
              </div>
            
            </div>
          </div>
          <div className='w-full h-[202px] flex flex-col mt-2 gap-4 pl-5'>
            {
              iconProfile.map(it => (
                <div className='flex gap-3 w-full items-end cursor-pointer' key={it.title}>
                  {it.icon}
                  <p className='text-[14px]'>{it.title}</p>
                </div>
              ))
            }
            <div className='flex gap-3 w-full items-end cursor-pointer'>
              <img src="./images/quyenLoi.webp" className='w-[24px] h-[24px]' alt="Lỗi ảnh" />
              <p className='text-[14px]'>Quyền lợi về Rank</p>
            </div>
          </div>
        </div>
        <div className='right-body w-[920px] h-[500px] border flex'>
          <div className='w-[570px] h-auto border-r-2 flex flex-col gap-4 items-center'>
            <div className='w-full h-[140px] flex gap-2 items-center justify-center'>
              <img src="./images/banner1.webp" className='w-[124px] h-[124px] rounded-[50%] object-cover' />
              <div className='flex flex-col w-[185px] h-[67px] gap-4'>
                <h1 className='text-[20px] font-semibold'>Tuân Nguyễn</h1>
                <div className='flex items-center gap-2'>
                  <Pencil size={16} color='#888888' />
                  <span className='text-[#888888] cursor-pointer'>Sửa Ảnh</span>
                </div>
              </div>
            </div>
            <div className='w-[400px] flex justify-between items-center'>
              <span className='font-bold'>Họ và Tên</span>
              <Input className='w-[270px] border-blue-500 outline-none' placeholder='Tuân Nguyễn'></Input>
            </div>
            <div className='w-[400px] flex justify-between items-center'>
              <span className='font-bold'>Nick Name</span>
              <Input className='w-[270px] border-blue-500 outline-none' placeholder='Thêm Nick Name'></Input>
            </div>
            <div className='w-[400px] flex justify-between items-center'>
              <span className='font-bold'>Ngày sinh</span>
              <div className='w-[275px] flex justify-around items-center'>
                <Select >
                  <SelectTrigger className="w-[80px] border-blue-500">
                    <SelectValue placeholder="Ngày" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 31 }, (_, index) => (
                      <SelectItem key={index + 1} value={`${index + 1}`}>
                        {index + 1}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger className="w-[80px] border-blue-500">
                    <SelectValue placeholder="Tháng" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 12 }, (_, index) => (
                      <SelectItem key={index + 1} value={`${index + 1}`}>
                        {index + 1}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger className="w-[80px] border-blue-500">
                    <SelectValue placeholder="Năm" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 75 }, (_, index) => {
                      const year = 1950 + index; // Bắt đầu từ năm 1900
                      return (
                        <SelectItem key={year} value={`${year}`}>
                          {year}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className='w-[400px] flex justify-between items-center'>
              <span className='font-bold'>Giới tính</span>
              <div className='w-[270px] flex justify-center items-center'>
                <Select>
                  <SelectTrigger className="w-[270px] border-blue-500 outline-none">
                    <SelectValue placeholder="Nam" />
                  </SelectTrigger>
                  <SelectContent>
                    {
                      gioiTinh.map(it => (
                        <SelectItem key={it.title} value={`${it.title}`}>
                          {it.title}
                        </SelectItem>
                      ))
                    }
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className='w-[400px] flex justify-between items-center'>
              <span className='font-bold'>Quốc tịch</span>
              <Input className='w-[270px] border-blue-500 outline-none' placeholder='Việt Nam'></Input>
            </div>
            <Button className='bg-blue-500 w-[150px]'>Lưu thay đổi</Button>
          </div>
          <div className='w-[350px] h-auto flex flex-col items-center gap-4 pt-4'>
            <div className='w-[320px] flex flex-col justify-center items-start gap-3 h-auto'>
              <h1 className='font-semibold text-[18px]'>Số điện thoại và Email</h1>
              <div className='w-full flex gap-2 justify-between items-center'>
                <Phone />
                <div className='flex flex-col items-center justify-center'>
                  <p>Số điện thoại</p>
                  <span>0123456789</span>
                </div>
                <Button className='bg-white border-blue-500 text-black border hover:bg-blue-500 hover:text-white'>Cập nhật</Button>
              </div>
              <div className='w-full border'></div>
              <div className='w-full flex gap-2 justify-between items-center'>
                <Mail />
                <div className='flex flex-col items-center justify-center'>
                  <p>Email cá nhân</p>
                  <span>example@gmail.com</span>
                </div>
                <Button className='bg-white border-blue-500 text-black border hover:bg-blue-500 hover:text-white'>Cập nhật</Button>
              </div>
            </div>
            <div className='w-[320px] flex flex-col justify-center items-start gap-3 h-auto'>
              <h1 className='font-semibold text-[18px]'>Bảo mật</h1>
              <div className='w-full flex gap-2 justify-between items-center'>
                <RefreshCcw />
                <p>Đổi mật khẩu</p>
                <Button className='bg-white border-blue-500 text-black border hover:bg-blue-500 hover:text-white'>Cập nhật</Button>
              </div>
              <div className='w-full border'></div>
              <div className='w-full flex gap-2 justify-between items-center'>
                <Wrench />
                <p>Thiết lập mã Pin</p>
                <Button className='bg-white border-blue-500 text-black border hover:bg-blue-500 hover:text-white'>Thiết lập</Button>
              </div>
              <div className='w-full border'></div>
              <div className='flex w-full justify-center'>
                <Button className='bg-white border-blue-500 text-black border hover:bg-blue-500 hover:text-white'>Yêu cầu xóa tài khoản</Button>
              </div>
            </div>
            <div className='w-[320px] flex flex-col justify-center items-start gap-3 h-auto'>
              <h1 className='font-semibold text-[18px]'>Liên kết mạng xã hội</h1>
              <div className='w-full flex gap-2 justify-between items-center'>
                <Facebook />
                <p>Liên kết FaceBook</p>
                <Button className='bg-white border-blue-500 text-black border hover:bg-blue-500 hover:text-white'>Cập nhật</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;