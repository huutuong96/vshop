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

import { MapPinIcon, Plus } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { RadioGroup } from "@/components/ui/radio-group"
import CreateAddressForm from "@/app/(guest)/_components/create-address-form"
import { Skeleton } from "@/components/ui/skeleton"
import AddressItem from "@/app/(guest)/_components/address-item"


export default function AddressSection({ address, addresses, setAddress }: { address: any, setAddress: any, addresses: any[] }) {
  const [isShowListAddress, setIsShowListAddress] = useState<boolean>(false);
  const [isShowUpdateAddress, setIsShowUpdateAddress] = useState<boolean>(false);
  const [isShowCreateAddress, setIsShowCreateAdress] = useState<boolean>(false);
  const [address1, setAddress1] = useState<any>(null);
  const [valueAdressSelected, setValueAdressSelected] = useState(() => {
    if (address) return address.id.toString();
    else return null
  })



  const handleCloseCreateAddressForm = () => {
    setIsShowCreateAdress(false);
  }


  return (
    <>
      {address && (
        <div className="header bg-white border rounded  mt-5 text-[#000000]">
          <div style={{
            backgroundImage: 'repeating-linear-gradient(45deg, #6fa6d6, #6fa6d6 33px, transparent 0, transparent 41px, #f18d9b 0, #f18d9b 74px, transparent 0, transparent 82px)',
            backgroundPositionX: '-30px',
            backgroundSize: '116px 3px',
            height: '3px',
            width: '100%'
          }}></div>
          <div className="w-full px-[30px] pt-7 pb-6">
            <div className="title flex items-center" >
              <MapPinIcon color="#2969d1" strokeWidth={1.25} size={16} />
              <div className="ml-2 text-blue-700 text-[18px]">Địa Chỉ Nhận Hàng</div>
            </div>
            <div className="header-content flex items-center justify-between mt-4">
              <div className="flex items-center">
                <div className="text-[16px] font-bold">
                  {address?.name || 'khnag'} {address?.phone || '123'}
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
                  {isShowCreateAddress && (
                    <CreateAddressForm handleCloseCreateAddressForm={handleCloseCreateAddressForm} />
                  )}
                  {!isShowCreateAddress && (
                    <>
                      <DialogHeader className="border-b px-6 py-4">
                        <div className="text-[16px] font-semibold">Địa chỉ của tôi</div>
                      </DialogHeader>
                      <div className="w-full h-[456px] px-6 pb-[88px] overflow-scroll scrollbar-hidden">
                        <RadioGroup
                          value={valueAdressSelected}
                          onValueChange={(v) => setValueAdressSelected(v)}
                          className="w-full"
                        >
                          {addresses.map((a, index) => (
                            <AddressItem setIsShowListAddress={setIsShowListAddress} a={a} index={index} addresses={addresses} key={index} />
                          ))}

                        </RadioGroup>
                        <button onClick={() => setIsShowCreateAdress(true)} className="flex gap-2 p-[10px] rounded-sm border-[#8b8b8b] border text-sm text-gray-500 items-center">
                          <Plus size={24} className="flex items-center" color="#a3a3a3" strokeWidth={1.5} />
                          Thêm Địa chỉ Mới
                        </button>
                      </div>
                      <DialogFooter className="px-6 bg-white w-full h-16 flex items-center border-t left-0 absolute right-0 bottom-0">
                        <Button className="w-[120px]" onClick={() => {
                          setValueAdressSelected(address.id.toString())
                          setIsShowListAddress(false);
                        }} type="submit">Hủy</Button>
                        <Button className="w-[120px]" onClick={() => {
                          const ad = addresses.find((a: any) => +valueAdressSelected === a.id);
                          setAddress(ad);
                          setIsShowListAddress(false);
                        }} type="button">Xác nhận</Button>
                      </DialogFooter>
                    </>
                  )}

                </DialogContent>
              </Dialog>
            </div>
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
