import { formattedPrice } from "@/lib/utils";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function CardProduct({ p }: { p: any }) {
  let length = (p.show_price as string).split(' - ').length;
  let show_price = ''
  if (length > 1) {
    show_price = (p.show_price as string).split(' - ').map((p: any) => formattedPrice(+p)).join(' - ');
  } else {
    show_price = formattedPrice(+p.show_price)
  }

  return (
    <div className="card-product py-1 shadow rounded border bg-white">
      <div className="img w-full px-5 pt-2 h-[200px]">
        <Link href={`/products/${p.slug}`}>
          <img className="size-full object-contain " src={p.image ? p.image : 'https://images.unsplash.com/photo-1517037673086-5d09c5e1a537?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'} alt="" />
        </Link>
      </div>
      <div className="p-2 flex flex-col gap-0.5">
        <span className="text-[16px] font-medium">{p.name}</span>
        <span className="text-[16px] font-semibold text-red-600">{show_price}</span>
        <div className="inline">
          <span className="text-[13px] bg-gray-100 rounded-sm px-2">Trả góp Muadee</span>
        </div>
        <div className="text-[12px]">Đã bán 128</div>
        <div className="flex justify-between items-center text-[12px]">
          <div className="flex gap-1 items-center">
            <div className="leading-4">5/5</div>
            <Star size={12} className="text-yellow-500" />
          </div>
          <span>Đồng Nai</span>
        </div>
      </div>
    </div>
  )
}
