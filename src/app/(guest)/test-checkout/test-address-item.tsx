import { RadioGroupItem } from "@/components/ui/radio-group";

export default function TestAddressItem({ a }: { a: any }) {
  return (
    <div className="flex justify-between items-center p-4 border rounded-sm w-full">
      <div className="flex gap-3 items-center">
        <RadioGroupItem value={a.id.toString()} id="r1" />
        <div className="flex items-center">
          <div className="text-[16px] font-bold flex gap-2">
            <span>{a.name}</span>
            <span>{a.phone}</span>
          </div>
          <div className="ml-4 text-[16px]">{a.address}</div>
        </div>
      </div>
      <div className="flex gap-4 items-center">
        {+a.default ? <div className="border p-2 text-sm rounded-sm">Mặc định</div> : ''}
        <div className="text-sm text-blue-700 cursor-pointer">Chỉnh sửa</div>
      </div>
    </div>
  )
}
