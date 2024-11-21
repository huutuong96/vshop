'use client'
import { useAppInfoSelector } from "@/redux/stores/profile.store";
import { Bell, Calendar, Pencil, TicketIcon, UserRound } from "lucide-react"

const iconProfile: { title: string, icon: any }[] = [

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

export default function LeftSide() {
  const profile = useAppInfoSelector(state => state.profile.info);
  return (
    <div className='left-body w-[275px] flex flex-col items-center pt-4 '>
      <div className='w-[240px] h-[80px] flex gap-5 items-center'>
        <img src={profile?.avatar || ''} className='size-14 rounded-full bg-slate-500' />
        <div className='w-[195px] h-full flex flex-col justify-center'>
          <div className='w-full h-[20px] flex justify-start gap-1'>
            <img src="./images/kimcuongRank.png" className='w-[20px] h-full' alt="Lỗi rank" />
            <span className='text-[16px] font-semibold'>{profile.fullname}</span>
          </div>
          <div className='flex items-center gap-2 mt-1'>
            <Pencil size={16} color='#888888' />
            <span className='text-[#888888] cursor-pointer text-sm'>Sửa hồ sơ</span>
          </div>

        </div>
      </div>
      <div className='w-full flex flex-col mt-4 gap-4'>
        {
          iconProfile.map(it => (
            <div className='flex gap-2 w-full items-end cursor-pointer' key={it.title}>
              {it.icon}
              <p className='text-sm'>{it.title}</p>
            </div>
          ))
        }
        <div className='flex gap-3 w-full items-end cursor-pointer'>
          <img src="./images/quyenLoi.webp" className='w-[24px] h-[24px]' alt="Lỗi ảnh" />
          <p className='text-[14px]'>Quyền lợi về Rank</p>
        </div>
      </div>
    </div>
  )
}
