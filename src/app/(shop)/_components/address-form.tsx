'use client'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area";
export default function AddressForm() {
  return (
    <div className="w-full">
      <div className="mb-4">
        <label htmlFor="" className="text-[14px]">Tỉnh</label>
        <Select>
          <SelectTrigger className="w-full mt-2">
            <SelectValue placeholder="Chọn Tỉnh thành" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup className="max-h-[200px]">
              <SelectLabel>Tỉnh</SelectLabel>
              <ScrollArea className="h-[200px]">
                {/* {provinces.map(it => (
                                <SelectItem className="hover:bg-gray-50 cursor-pointer" key={it.province_id} value={it.province_id}>{it.name}</SelectItem>
                              ))} */}
              </ScrollArea>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="mb-4">
        <label htmlFor="" className="text-[14px]">Quận/Huyện</label>
        <Select>
          <SelectTrigger className="w-full mt-2">
            <SelectValue placeholder="Chọn Quận/Huyện" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup className="max-h-[200px] overflow-y-scroll">
              <SelectLabel defaultValue={''}>Quận/Huyện</SelectLabel>
              <SelectItem value={'1'}>1</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="mb-4">
        <label htmlFor="" className="text-[14px]">Phường/Xã</label>
        <Select >
          <SelectTrigger className="w-full mt-2">
            <SelectValue placeholder="Chọn Phường/Xã" />
          </SelectTrigger>
          <SelectContent className="w-full">
            <SelectGroup className="max-h-[200px] w-full overflow-y-scroll">
              <SelectLabel defaultValue={''}>Phường/Xã</SelectLabel>
              <SelectItem value={'1'}>1</SelectItem>

            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div>
        <label htmlFor="addressDetail" className="text-[14px]">Địa chỉ chi tiết</label>
        <input className="w-full border mt-2 p-2 text-[14px]" name="" id="addressDetail"></input>
      </div>
    </div>
  )
}
