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

import { BookOpen, ChevronDown, ChevronUp, GripHorizontal, User } from "lucide-react"
import { useEffect } from 'react';
import AccountInfo from '@/app/(shop)/_components/account-info';
import Notifications from '@/app/(shop)/_components/notifications';
import { useAppInfoSelector } from '@/redux/stores/profile.store';
import { clientAccessToken } from '@/lib/http';
import envConfig from '@/config';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import Link from 'next/link';
import { useNotification } from '@/context-apis/notification-provider';
import AccountShopInfoDropdown from '@/app/(shop)/_components/account-shop-info-dropdown';




import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Bell } from "lucide-react";
import Image from "next/image";
import { useState } from "react";


function timeAgo(inputTime: string): string {
  const now: Date = new Date();
  const time: Date = new Date(inputTime);
  const diff: number = Math.floor((now.getTime() - time.getTime()) / 1000); // Khoảng cách tính bằng giây

  if (diff < 60) {
    return `${diff} giây trước`;
  } else if (diff < 3600) {
    const minutes = Math.floor(diff / 60);
    return `${minutes} phút trước`;
  } else if (diff < 86400) {
    const hours = Math.floor(diff / 3600);
    return `${hours} giờ trước`;
  } else {
    const days = Math.floor(diff / 86400);
    return `${days} ngày trước`;
  }
}



function Dot({ className }: { className?: string }) {
  return (
    <svg
      width="6"
      height="6"
      fill="currentColor"
      viewBox="0 0 6 6"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <circle cx="3" cy="3" r="3" />
    </svg>
  );
}

function PopoverDemo() {
  const [notifications, setNotifications] = useState<any[]>([]);
  const unreadCount = notifications.filter((n) => n.unread).length;
  const { notifications: notifications1 } = useNotification();

  const handleMarkAllAsRead = () => {
    setNotifications(
      notifications.map((notification: any) => ({
        ...notification,
        unread: false,
      })),
    );
  };

  const handleNotificationClick = (id: number) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id ? { ...notification, unread: false } : notification,
      ),
    );
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size="icon" variant="outline" className="relative" aria-label="Open notifications">
          <Bell size={16} strokeWidth={2} aria-hidden="true" />
          <Badge className="absolute -top-2 left-full min-w-5 -translate-x-1/2 px-1 bg-rose-600">
            {notifications1 ? (notifications1.total > 9 ? "9+" : notifications1.total) : '0'}
          </Badge>
        </Button>
      </PopoverTrigger>
      <PopoverContent align='end' className="w-80 p-1">
        <div className="flex items-baseline justify-between gap-4 px-3 py-2">
          <div className="text-sm font-semibold">Thông báo</div>
          {unreadCount > 0 && (
            <button className="text-xs font-medium hover:underline" onClick={handleMarkAllAsRead}>
              Mark all as read
            </button>
          )}
        </div>
        <div
          role="separator"
          aria-orientation="horizontal"
          className="-mx-1 my-1 h-px bg-border"
        ></div>
        {notifications1 ? notifications1.data.map((notification: any) => (
          <div
            key={notification.id}
            className="rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent"
          >
            <div className="relative flex items-start gap-3 pe-3">
              <img
                className="size-9 rounded-md"
                src={notification.image}
                width={32}
                height={32}
                alt={notification.user}
              />
              <div className="flex-1 space-y-1">
                <button
                  className="text-left text-foreground/80 after:absolute after:inset-0"
                // onClick={() => handleNotificationClick(notification.id)}
                >
                  <span className="font-medium text-foreground hover:underline">
                    {notification.title}
                  </span>{" "}
                  <span className="font-medium text-foreground hover:underline">
                    {notification.description}
                  </span>
                  .
                </button>
                <div className="text-xs text-muted-foreground">{timeAgo(notification.created_at)}</div>
              </div>
              {/* {notification.unread && (
                <div className="self-center absolute end-0">
                  <Dot />
                </div>
              )} */}
            </div>
          </div>
        )) : ''}
      </PopoverContent>
    </Popover>
  );
}


const mockImg = 'https://phunuvietnam.mediacdn.vn/media/news/33abffcedac43a654ac7f501856bf700/anh-profile-tiet-lo-g-ve-ban-1.jpg'

export default function ShopHeader() {
  const info = useAppInfoSelector(state => state.profile.info);
  const { notifications } = useNotification();
  const shop = useAppInfoSelector(state => state.profile.shop);



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
            <PopoverDemo />
          </div>
          <div className='h-full pl-4'>
            {shop && (
              <HoverCard openDelay={200} closeDelay={100}>
                <HoverCardTrigger>
                  <div className="flex w-full h-full px-4 items-center gap-2 hover:bg-gray-200" >
                    <div className="size-[30px] rounded-full flex items-center justify-center">
                      <img className='size-full object-cover rounded-full' src={shop?.image || mockImg} alt="" />
                    </div>
                    <span className="text-[14px] font-medium">{shop.shop_name}</span>
                  </div>
                </HoverCardTrigger>
                <HoverCardContent className='p-0'>
                  <AccountShopInfoDropdown />
                </HoverCardContent>
              </HoverCard>
            )}

          </div>

        </div>
      </div>
    </header>
  )
}
