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

import UpdateAddressForm from "@/app/(guest)/_components/update-address-form";
import { RadioGroupItem } from "@/components/ui/radio-group"
import { useEffect, useState } from "react";

export default function AddressItem({ a, addresses, index, setIsShowListAddress }: { a: any, addresses: any[], index: number, setIsShowListAddress: any }) {
  const [isShowUpdateAddress, setIsShowUpdateAddress] = useState<boolean>(false);


  return (
    <>
      <div key={a.id} className={`w-full py-4 flex ${addresses.length - 1 === index ? "" : "border-b"}`}>
        <div className="w-[26px] pr-1">
          <RadioGroupItem value={a.id.toString()} />
        </div>
        <div className="w-full">
          <div className="w-full flex justify-between items-center mb-1">
            <div className="flex items-center">
              <span className="text-black">{a.name}</span>
              <div className="border-l border-gray-300 h-[24.8px] mx-2"></div>
              <div className="text-sm font-normal text-gray-500">{a.phone}</div>
            </div>
            <div>
              {/* <button type="button" onClick={() => {
                  setIsShowUpdateAddress(true);
                }} className="text-blue-600 text-sm p-1">Cập nhật</button> */}
              <Dialog open={isShowUpdateAddress} onOpenChange={(o) => setIsShowUpdateAddress(o)}>
                <DialogTrigger asChild>
                  <div className="text-blue-700 cursor-pointer">
                    Thay đổi
                  </div>
                </DialogTrigger>
                <DialogContent onInteractOutside={(e) => e.preventDefault()} className="w-[500px] p-0">
                  <UpdateAddressForm setIsShowUpdateAddress={setIsShowUpdateAddress} key={1} address={a} />
                </DialogContent>
              </Dialog>
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
    </>
  )
}
