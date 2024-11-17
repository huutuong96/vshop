import { CalendarCheck, ClipboardCheck, MessageSquare, SquareUser, Tag } from "lucide-react";
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
  },
  {
    icon: <Tag strokeWidth={1.5} size={20} />,
    title: 'Kênh Marketing',
    path: 'marketing',
    // subItems: ['Kênh Marketing', 'Đấu Giá Rẻ Vô Địch', 'Quản Cáo VNShop', 'Tăng Đơn Cùng KOL', 'Live & Video', 'Kênh Khuyến Mãi Của Shop', 'Flash Sale của shop', 'Mã Giảm Giá Của Shop', 'Chương Trình VNShop']
    subItems: []
  },
  {
    icon: <SquareUser strokeWidth={1.5} size={20} />,
    title: 'Quản Lý Khách Hàng',
    path: 'customer',
    // subItems: ['Quản Lý Chat']
    subItems: []
  }
];

export default function ShopSidebar() {
  return (
    <div className="w-[292px] h-[calc(100vh-120px)] relative">
      <div className="w-[282px] h-[calc(100vh-120px)] fixed top-[65px] bg-white rounded-sm py-4 px-2 flex flex-col">
        <ScrollArea className="w-full h-full">
          {sidebarItems.map((item, index: number) => (
            <Accordion key={index} type="single" collapsible className="w-full pr-4 mb-2">
              <AccordionItem value="item-1">
                <AccordionTrigger className="">
                  <div className="flex items-center gap-4 py-2 ">
                    {item.icon}
                    <span className="text-[15px] font-semibold">{item.title}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pl-10">
                  {item.subItems.length && item.subItems.map((i, index) => (
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
