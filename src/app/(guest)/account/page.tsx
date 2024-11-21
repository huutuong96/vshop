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
import { redirect } from 'next/navigation';

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

const gioiTinh: { title: string }[] = [
  { title: 'Nam' },
  { title: 'Nữ' },
  { title: 'Khác' }
]

const UserProfilePage = () => {
  return redirect('/account/profile');
};

export default UserProfilePage;