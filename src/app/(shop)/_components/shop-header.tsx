'use client'
import './shop-header.css';
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

import { Bell, BookOpen, ChevronDown, ChevronUp, GripHorizontal, User } from "lucide-react"
import { useEffect, useState } from 'react';
import AccountInfo from '@/app/(shop)/_components/account-info';
import Notifications from '@/app/(shop)/_components/notifications';
import Image from 'next/image';
import { useAppInfoSelector } from '@/redux/stores/profile.store';
import { clientAccessToken } from '@/lib/http';
import envConfig from '@/config';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import Link from 'next/link';


export default function ShopHeader() {
  const info = useAppInfoSelector(state => state.profile.info);



  return (
    <header className="w-full h-[56px] bg-white sticky top-0 z-[100] shadow border-b">
      <div className="w-full h-full flex justify-between">
        <div className="flex items-center gap-4">
          <div className="logo w-40 h-[48px]">
            <Link href="/shop">
              <Image width={160} height={48} className="size-full object-cover" src="/images/logo.png" alt="" />
            </Link>
          </div>
          {info.shop_id && (
            <Breadcrumb>
              <BreadcrumbList className="text-[16px] font-normal">
                <BreadcrumbItem>
                  <Link href="/shop">Trang chủ</Link>
                </BreadcrumbItem>
                {/* <BreadcrumbSeparator /> */}

              </BreadcrumbList>
            </Breadcrumb>
          )}
          {!info.shop_id && (
            <div>Đăng ký trở thành Người bán VNShop</div>
          )}

        </div>
        <div className="flex items-center">
          <div className="flex h-full px-4 border-r-[2px] items-center">
            <HoverCard openDelay={200} closeDelay={100}>
              <HoverCardTrigger>
                <div className="relative">
                  <div className='px-3 hover:bg-gray-200'>
                    <Bell strokeWidth={1.5} className="h-[56px] w-6" />
                    <div className="absolute top-2 right-1 bg-blue-500 flex items-center justify-center text-white rounded-full text-[12px] size-4">0</div>
                  </div>
                </div>
              </HoverCardTrigger>
              <HoverCardContent align='end' className='bg-none p-0 w-80'>
                <Notifications />
                {/* <div>he</div> */}
              </HoverCardContent>
            </HoverCard>
          </div>
          <div className='h-full pl-4'>
            <HoverCard openDelay={200} closeDelay={100}>
              <HoverCardTrigger>
                <div className="flex w-full h-full px-4 items-center gap-2 hover:bg-gray-200" >
                  <div className="size-[30px] rounded-full flex items-center justify-center">
                    <img className='size-full object-cover rounded-full' src="https://phunuvietnam.mediacdn.vn/media/news/33abffcedac43a654ac7f501856bf700/anh-profile-tiet-lo-g-ve-ban-1.jpg" alt="" />
                  </div>
                  <span className="text-[14px] font-medium">{info.fullname}</span>
                </div>
              </HoverCardTrigger>
              <HoverCardContent>
                <AccountInfo />
              </HoverCardContent>
            </HoverCard>
          </div>

        </div>
      </div>
    </header>
  )
}
