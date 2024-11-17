'use client'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MapPinIcon, Plus } from "lucide-react"
import { useEffect, useState } from "react"
import envConfig from "@/config"
import { clientAccessToken } from "@/lib/http"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import CreateAddressForm from "@/app/(guest)/_components/create-address-form"
import { Skeleton } from "@/components/ui/skeleton"


const tags = Array.from({ length: 50 }).map(
  (_, i, a) => `v1.2.0-beta.${a.length - i}`
)

export default function AddressSection() {
  const [addresses, setAddresses] = useState<any[]>([]);
  const [isShowListAddress, setIsShowListAddress] = useState<boolean>(false);
  const [isShowUpdateAddress, setIsShowUpdateAddress] = useState<boolean>(false);
  const [address, setAddress] = useState<any>();
  const [address1, setAddress1] = useState<any>(null);

  useEffect(() => {
    const controller = new AbortController(); // Khởi tạo AbortController
    const signal = controller.signal;

    const getData = async () => {
      try {
        const res = await fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT_1}/api/address`, {
          headers: {
            "Authorization": `Bearer ${clientAccessToken.value}`,
            "Content-Type": "application/json"
          },
          signal // Thêm signal để có thể hủy yêu cầu khi cần thiết
        });
        if (!res.ok) {
          throw 'Error';
        }
        const payload = await res.json();
        const data = payload.data;
        setAddress((prev: any) => {
          const a = data.find((a: any) => a.default === '1');
          return a;
        })
        setAddresses(data);

      } catch (error) {

      }
    }
    getData()
    return () => {
      controller.abort();
    };
  }, []);

  const handleCloseCreateAddressForm = () => {
    setIsShowUpdateAddress(false);
  }


  return (
    <>
      {address && (
        <div className="header  bg-white border rounded px-[30px] pt-7 pb-6 mt-5 text-[#000000]">
          <div className="title flex items-center" >
            <MapPinIcon color="#2969d1" strokeWidth={1.25} size={16} />
            <div className="ml-2 text-blue-700 text-[18px]">Địa Chỉ Nhận Hàng</div>
          </div>
          <div className="header-content flex items-center justify-between mt-4">
            <div className="flex items-center">
              <div className="text-[16px] font-bold">
                {address.name} {address.phone}
              </div>
              <div className="ml-4 text-[16px]">{addresses.length > 0 ? addresses[0].address : "null"}</div>
            </div>

            <Dialog open={isShowListAddress} onOpenChange={(o) => setIsShowListAddress(o)}>
              <DialogTrigger asChild>
                <div className="text-blue-700 cursor-pointer">
                  Thay đổi
                </div>
              </DialogTrigger>
              <DialogContent onInteractOutside={(e) => e.preventDefault()} className="w-[500px] p-0">
                {isShowUpdateAddress && (
                  <CreateAddressForm handleCloseCreateAddressForm={handleCloseCreateAddressForm} />
                )}
                {!isShowUpdateAddress && (
                  <>
                    <DialogHeader className="border-b px-6 py-4">
                      <div className="text-[16px] font-semibold">Địa chỉ của tôi</div>
                    </DialogHeader>
                    <div className="w-full h-[456px] px-6 pb-[88px] overflow-scroll scrollbar-hidden">
                      <RadioGroup value={address1 || address.default} onValueChange={(v) => {
                        setAddress1(v);
                      }} className="w-full" defaultValue="option-one">
                        {addresses.map((a, index) => (
                          <div key={a.id} className={`w-full py-4 flex ${addresses.length - 1 === index ? "" : "border-b"}`}>
                            <div className="w-[26px] pr-1">
                              <RadioGroupItem checked={address1 ? address1 === a.id : address.default === a.default} value={a.id} />
                            </div>
                            <div className="w-full">
                              <div className="w-full flex justify-between items-center mb-1">
                                <div className="flex items-center">
                                  <span className="text-black">{a.name}</span>
                                  <div className="border-l border-gray-300 h-[24.8px] mx-2"></div>
                                  <div className="text-sm font-normal text-gray-500">{a.phone}</div>
                                </div>
                                <div>
                                  <button className="text-blue-600 text-sm p-1">Cập nhật</button>
                                </div>
                              </div>
                              <div className="w-full mb-1">
                                <div className="text-sm text-gray-500">{a.address}</div>
                                <div className="text-sm text-gray-500">{a.ward}, {a.district}, {a.province}</div>
                              </div>
                              {a.default === '1' && (
                                <div className="mt-2">
                                  <span className="px-1 py-[2px] border border-blue-700 text-blue-700 text-sm">Mặc định</span>
                                </div>
                              )}

                            </div>
                          </div>
                        ))}

                      </RadioGroup>
                      <button onClick={() => setIsShowUpdateAddress(true)} className="flex gap-2 p-[10px] border-[#8b8b8b] border text-sm text-gray-500 items-center">
                        <Plus size={24} color="#a3a3a3" strokeWidth={1.5} />
                        Thêm Địa chỉ Mới
                      </button>
                    </div>
                    <DialogFooter className="px-6 bg-white w-full h-16 flex items-center border-t left-0 absolute right-0 bottom-0">
                      <Button className="w-[120px]" onClick={() => setIsShowListAddress(false)} type="submit">Hủy</Button>
                      <Button className="w-[120px]" onClick={() => {
                        const ad = addresses.find((a: any) => address1 === a.id);
                        if (ad) {
                          setAddress(() => {
                            return ad;
                          });
                          setIsShowListAddress(false);
                        }
                      }} type="button">Xác nhận</Button>
                    </DialogFooter>
                  </>
                )}

              </DialogContent>
            </Dialog>
          </div>
        </div>
      )}
      {!address && (
        <div className="bg-white border rounded px-[30px] pt-7 pb-6 mt-5">
          <div className="w-[200px] h-[27px]">
            <Skeleton className="size-full rounded" />
          </div>
          <div className="w-full mt-4 flex items-center justify-between">
            <Skeleton className="w-[500px] h-6 rounded" />
            {/* <Skeleton className="w-[80px] h-6 rounded" /> */}
          </div>
        </div>
      )}
    </>

  )
}
