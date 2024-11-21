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
import LeftSide from "@/app/(guest)/account/left-side";

export default function AccountGuestLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='w-content'>
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
      <div className='body-page w-full flex gap-1 mt-4'>
        <LeftSide />
        <div className='right-body w-full flex'>
          {children}
        </div>
      </div>
    </div>
  )
}

