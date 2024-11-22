'use client'
import { useAppInfoSelector } from "@/redux/stores/profile.store";
import { Bell, Calendar, Pencil, TicketIcon, UserRound } from "lucide-react"
import Link from "next/link";
import { usePathname } from "next/navigation";

const iconProfile: { title: string, icon: any, path: string }[] = [

  {
    title: 'Tài Khoản Của Tôi ',
    icon: <UserRound size={20} color='blue' />,
    path: 'profile'
  },
  {
    title: 'Đơn Mua',
    icon: <Calendar size={20} color='blue' />,
    path: 'orders'
  },
  {
    title: 'Thông Báo',
    icon: <Bell size={20} color='orange' />,
    path: 'notifications'
  },
  {
    title: 'Kho Voucher',
    icon: <TicketIcon size={20} color='orange' />,
    path: 'vouchers'
  }
]

export default function LeftSide() {
  const profile = useAppInfoSelector(state => state.profile.info);
  const pathname = usePathname();
  return (
    <div className='left-body flex flex-col items-center pt-4'>
      <div className='w-[240px] h-[80px] flex gap-5 items-center'>
        <img src={profile?.avatar || ''} className='size-14 rounded-full bg-slate-500' />
        <div className='w-[195px] h-full flex flex-col justify-center'>
          <div className='w-full h-[20px] flex justify-start gap-1'>
            <img src="./images/kimcuongRank.png" className='w-[20px] h-full' alt="Lỗi rank" />
            <div
              className='text-[16px] max-w-[120px] font-semibold truncate whitespace-nowrap overflow-hidden'
              title={profile.fullname} // Hiển thị đầy đủ tên khi hover
            >
              {profile.fullname}
            </div>
          </div>
          <div className='flex items-center gap-2 mt-1'>
            <Pencil size={16} color='#888888' />
            <span className='text-[#888888] cursor-pointer text-sm'>Sửa hồ sơ</span>
          </div>
        </div>
      </div>
      <div className='w-full flex flex-col mt-4 gap-3'>
        {iconProfile.map((it) => (
          <div className='flex gap-3 w-full items-center cursor-pointer' key={it.title}>
            <div className="pb-1">
              {it.icon}
            </div>
            <Link className={`text-sm font-medium pb-1 transition-all border-b-gray-100 border-b hover:text-blue-800 hover:border-b-blue-800  ${pathname.endsWith(it.path) ? 'text-blue-800 border-b-blue-800 border-b' : ''}`} href={it.path}>{it.title}</Link>
          </div>
        ))}
        {/* <div className='flex gap-3 w-full items-end cursor-pointer'>
          <img src="./images/quyenLoi.webp" className='w-[24px] h-[24px]' alt="Lỗi ảnh" />
          <p className='text-[14px]'>Quyền lợi về Rank</p>
        </div> */}
      </div>
    </div>
  )
}
