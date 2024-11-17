import { Button } from "@/components/ui/button";
import { Flag, ThumbsUp } from "lucide-react";

export default function Comment() {
  return (
    <div className="w-full flex justify-between">
      <div className="flex gap-3">
        <div className="size-9 rounded-full">
          <img className="size-full object-cover" src="https://static-00.iconduck.com/assets.00/nextjs-icon-512x512-y563b8iq.png" alt="" />
        </div>
        <div className="w-[650px]">
          <div className="font-semibold text-[14px]">Khang</div>
          <div><span className="italic text-gray-400 text-[11px]">02:42 | 13/12/2023</span></div>
          <div className="w-full">
            <p>đã nhận hàng đúng như hình mình cao 1m55 cân nặng 54 kg mặc sai l rất vừa cảm ơn shop lần sau
              mình mua lại</p>
          </div>
          <div className="flex gap-4 mt-2">
            <Button className="bg-gray-100 w-12 h-8 hover:bg-gray-100 text-gray-500">M</Button>
            <span className="text-[20px] font-semibold text-gray-400">|</span>
            <Button className="bg-gray-100 w-12 h-8 hover:bg-gray-100 text-gray-500">Xanh</Button>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex"><span className="text-[#f0ce11]">★</span><span className="text-[#f0ce11]">★</span><span className="text-[#f0ce11]">★</span><span className="text-[#f0ce11]">★</span><span className="text-[#f0ce11]">★</span></div>
        <Flag size={20} />
        <ThumbsUp size={20} />
        <span className="text-gray-500 font-semibold text-[14px]">Hữu ích</span>
      </div>
    </div>
  )
}
