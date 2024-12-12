import { CalendarCheck, ChartArea, ClipboardCheck, DollarSign, MessageSquare, Settings, SquareUser, Tag, Tags } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";

type SidebarItem = {
  icon: any,
  title: string,
  path: string,
  subItems: {
    title: string,
    href: string
  }[]
}

const sidebarItems: SidebarItem[] = [
  {
    icon: <CalendarCheck strokeWidth={1.5} size={20} />,
    title: 'Quản Lý Đơn Hàng',
    path: 'order',
    // subItems: ['Tất Cả', 'Giao Hàng Loạt', 'Đơn Hủy', 'Trả Hàng/Hoàn Tiền', 'Cài Đặt Vận Chuyển', 'Bàn Giao Đơn Hàng']
    subItems: [
      {
        title: 'Tất cả',
        href: 'list'
      }
    ]
  },
  {
    icon: <ClipboardCheck strokeWidth={1.5} size={20} />,
    title: 'Quản Lý Sản Phẩm',
    path: 'product',
    subItems: [{
      title: 'Tất Cả Sản Phẩm',
      href: 'list'
    }, {
      title: 'Thêm Sản Phẩm',
      href: 'new'
    }]
  }, {
    icon: <Tags strokeWidth={1.5} size={20} />,
    title: 'Khuyến Mãi',
    path: 'discount',
    subItems: [{
      title: 'Tất Cả Khuyến Mãi',
      href: 'list'
    }, {
      title: 'Tạo Mã Giảm Giá',
      href: 'new'
    }]
  },
  {
    icon: <DollarSign strokeWidth={1.5} size={20} />,
    title: 'Quản Lý Tài Chính',
    path: 'finance',
    subItems: [{
      title: 'Doanh Thu',
      href: 'income'
    }, {
      title: 'Số Dư Tài Khoản',
      href: 'wallet'
    }]
  },
  {
    icon: <ChartArea strokeWidth={1.5} size={20} />,
    title: 'Dữ liệu',
    path: 'datacenter',
    subItems: [{
      title: 'Phân Tích Bán Hàng',
      href: 'overview'
    }]
  },
  {
    icon: <Settings strokeWidth={1.5} size={20} />,
    title: 'Cài Đặt',
    path: 'setting',
    // subItems: ['Kênh Marketing', 'Đấu Giá Rẻ Vô Địch', 'Quản Cáo VNShop', 'Tăng Đơn Cùng KOL', 'Live & Video', 'Kênh Khuyến Mãi Của Shop', 'Flash Sale của shop', 'Mã Giảm Giá Của Shop', 'Chương Trình VNShop']
    subItems: [{
      title: 'Thông Tin Shop',
      href: 'info'
    }]
  },

];

export default function ShopSidebar() {
  return (
    <div className="w-[292px] h-[calc(100vh-120px)] relative">
      <div className="w-[282px] h-[calc(100vh-120px)] shadow-sm fixed top-[65px] border bg-white rounded-sm py-4 px-2 flex flex-col">
        <ScrollArea className="w-full h-full">
          {sidebarItems.map((item, index: number) => (
            <Accordion key={index} type="single" collapsible className="w-full pr-4 mb-2">
              <AccordionItem value={index.toString()}>
                <AccordionTrigger className="">
                  <div className="flex items-center gap-4 py-2 ">
                    {item.icon}
                    <span className="text-[15px] font-semibold">{item.title}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pl-10">
                  {item.subItems.length > 0 && item.subItems.map((i, index) => (
                    <Link href={`/shop/${item.path}/${i.href}`} key={index} className="py-1.5 block">{i.title}</Link>
                  ))}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ))}


        </ScrollArea>
      </div>
    </div>
  )
}
