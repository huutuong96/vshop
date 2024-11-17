
import EmptyOrder from "@/app/(shop)/_components/empty-order";
import OrderItem from "@/app/(shop)/_components/order-item";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const status = [
  'Tất cả', 'Chờ xác nhận', 'Chờ Lấy hàng', 'Đang giao', 'Đã giao', 'Đơn hủy', 'Trả hàng/hoàn tiền', 'Giao không thành công'
]

const filters = [
  {
    id: '0',
    name: 'Mã đơn hàng',
    placehoder: 'Nhập mã đơn hàng'
  }, {
    id: '1',
    name: 'Mã vận đơn',
    placehoder: 'Nhập mã vận đơn'
  }, {
    id: '2',
    name: 'Tên người mua',
    placehoder: 'Nhập tên người mua'
  }, {
    id: '3',
    name: 'Sản phẩm',
    placehoder: 'Nhập tên sản phẩm/SKU'
  }
];

export default function ListOrderPage() {
  return (
    <div className="overflow-auto">
      <div className="flex p-2 items-center justify-between">
        <span className="text-[20px] font-bold">Tất Cả</span>
        <div className="flex items-center gap-2">
          <Button variant={"outline"}>Xuất</Button>
          <Button variant={"outline"}>Lịch sử Xuất Báo Cáo</Button>
        </div>
      </div>
      <div className="flex p-2 px-3 gap-2">
        {status.map((item => (
          <div key={item}
            className={`
                text-[14px] text-[#3e3e3e] font-semibold cursor-pointer px-5 border-b-white border-b-2
                 hover:text-blue-500 hover:border-b-blue-500
            `}
          >
            {item}
          </div>
        )))}
      </div>
      <div className="flex items-center justify-between w-full p-4 px-3">
        <div className="flex">
          <Select defaultValue={filters[0].id}>
            <SelectTrigger className="w-[250px] rounded-none rounded-tl rounded-bl">
              <SelectValue placeholder="Mã Đơn Hàng" className="text-[13px]" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {filters.map((item, index) => (
                  <SelectItem key={index} className="text-[13px]" value={item.id}>{item.name}</SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Input className="px-3 text-[14px] outline-none rounded-none rounded-tr rounded-br" placeholder="Nhập mã đơn hàng" />
        </div>
        <Select>
          <SelectTrigger className="w-[250px] outline-none">
            <SelectValue placeholder="Đơn Vị Vận Chuyển" className="text-[13px]" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem className="text-[13px]" value={'test'}>test</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <div className="flex gap-2">
          <button className="border-blue-500 text-blue-500 hover:border-blue-500 border text-[14px] p-2 rounded">Áp dụng</button>
          <Button variant={'default'}>Đặt lại</Button>
        </div>
      </div>
      <div className="px-4 py-2 text-[16px] font-semibold">2 Đơn hàng</div>
      <div className="px-4 py-2">
        <div className="w-full h-full border text-[14px] flex items-center rounded bg-[#F0F0F0] text-[#000000ba]">
          <div className="w-[364px] p-2">Sản phẩm</div>
          <div className="w-[200px] p-2">Tổng đơn hàng</div>
          <div className="w-[280px] p-2">Trạng thái</div>
          <div className="w-[200px] p-2">Đơn vị vận chuyển</div>
          <div className="">Thao tác</div>
        </div>
        {/* <div className="mt-4 border rounded-sm">
          <div className="p-2 flex items-center justify-between bg-[#F0F0F0] text-black text-[14px]">
            <span>Khách hàng: Test2</span>
            <span>Mã đơn hàng: 01234544ds5</span>
          </div>
          <div className="w-full h-full text-[14px] flex">
            <div className="w-[364px] p-2 pr-6">
              <div className="flex w-full justify-between mt-1">
                <div className="flex gap-2 items-center">
                  <div className="size-[92px]">
                    <img src="https://down-vn.img.susercontent.com/file/vn-11134207-7qukw-lk0onee5bmb8cc" className="size-full object-cover border" alt="" />
                  </div>
                  <div className="">
                    <button className="bg-[#FFE8E8] text-[#E12E2E] px-4 py-1 text-[12px] rounded-sm">Đã hủy đơn</button>
                    <div className="flex flex-col mt-1 ml-2">
                      <span className="font-bold">Áo màu vàng</span>
                      <span>Phân loại: màu vàng, size XL</span>
                    </div>
                  </div>
                </div>
                <div className="text-[12px]">x1</div>
              </div>
            </div>
            <div className="w-[200px] p-2">
              <div className="text-black font-medium">120.000đ</div>
              <div className="text-[#585858] mt-1">Thanh toán khi nhận hàng</div>
            </div>
            <div className="w-[280px] p-2">
              <div className="text-black font-medium">Đã hủy</div>
              <div className="text-[#585858] mt-1">Đã hủy bởi người mua</div>
            </div>
            <div className="w-[200px] p-2">
              <div className="text-black font-medium">Nhanh</div>
              <div className="text-[#585858] mt-1">GHTK</div>
            </div>
            <div className="p-2 text-blue-500 cursor-pointer">Xem chi tiết</div>
          </div>
        </div>
        <div className="mt-4 border rounded-sm">
          <div className="p-2 flex items-center justify-between bg-[#F0F0F0] text-black text-[14px]">
            <span>Khách hàng: Test2</span>
            <span>Mã đơn hàng: 01234544ds5</span>
          </div>
          <div className="w-full h-full text-[14px] flex">
            <div className="w-[364px] p-2 pr-6">
              <div className="flex w-full justify-between mt-1">
                <div className="flex gap-2 items-center">
                  <div className="size-[92px]">
                    <img src="https://down-vn.img.susercontent.com/file/vn-11134207-7qukw-lk0onee5bmb8cc" className="size-full object-cover border" alt="" />
                  </div>
                  <div className="">
                    <div className="flex flex-col mt-1 ml-2">
                      <span className="font-bold">Áo màu vàng</span>
                      <span>Phân loại: màu vàng, size XL</span>
                    </div>
                  </div>
                </div>
                <div className="text-[12px]">x1</div>
              </div>
              <div className="flex w-full justify-between mt-1">
                <div className="flex gap-2 items-center">
                  <div className="size-[92px]">
                    <img src="https://down-vn.img.susercontent.com/file/vn-11134207-7qukw-lk0onee5bmb8cc" className="size-full object-cover border" alt="" />
                  </div>
                  <div className="">
                    <div className="flex flex-col mt-1 ml-2">
                      <span className="font-bold">Áo màu vàng</span>
                      <span>Phân loại: màu vàng, size XL</span>
                    </div>
                  </div>
                </div>
                <div className="text-[12px]">x1</div>
              </div>
            </div>
            <div className="w-[200px] p-2">
              <div className="text-black font-medium">120.000đ</div>
              <div className="text-[#585858] mt-1">Thanh toán khi nhận hàng</div>
            </div>
            <div className="w-[280px] p-2">
              <div className="text-black font-medium">Đã giao</div>
              <div className="text-[#585858] mt-1">Giao hàng thành công</div>
            </div>
            <div className="w-[200px] p-2">
              <div className="text-black font-medium">Nhanh</div>
              <div className="text-[#585858] mt-1">GHTK</div>
            </div>
            <div className="p-2 text-blue-500 cursor-pointer">Xem chi tiết</div>
          </div>
        </div> */}
        {/* <OrderItem />
        <OrderItem /> */}
        <EmptyOrder />
      </div>
    </div>
  )
}
