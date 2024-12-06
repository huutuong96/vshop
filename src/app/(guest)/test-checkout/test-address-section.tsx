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
import { useAppInfoSelector } from "@/redux/stores/profile.store";
import { MapPinIcon } from "lucide-react";
import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ScrollArea } from "@/components/ui/scroll-area"
import TestAddressItem from "@/app/(guest)/test-checkout/test-address-item";
import TestCreateAddressForm from "@/app/(guest)/test-checkout/test-create-address-form";

export default function TestAddressSection() {
  const addresses = useAppInfoSelector(state => state.profile.addresses);
  const [addressIdSelected, setAddressIdSelected] = useState<number>(() => {
    if (addresses) {
      let a = addresses.find(a => +a.default)
      return a ? +a.id : 0
    } else {
      return 0
    }
  });
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = (o: boolean) => {
    setOpen(o);
  }

  return (
    <>
      {addresses && (
        <div className="header bg-white border rounded  mt-5 text-[#000000]">
          <div style={{
            backgroundImage: 'repeating-linear-gradient(45deg, #6fa6d6, #6fa6d6 33px, transparent 0, transparent 41px, #f18d9b 0, #f18d9b 74px, transparent 0, transparent 82px)',
            backgroundPositionX: '-30px',
            backgroundSize: '116px 3px',
            height: '3px',
            width: '100%'
          }}></div>
          <div className="w-full px-[30px] pt-7 pb-6">
            <div className="flex justify-between items-center pr-4">
              <div className="title flex items-center" >
                <MapPinIcon className="text-blue-700" strokeWidth={1.25} size={16} />
                <div className="ml-3 text-[18px] font-medium">Địa Chỉ Nhận Hàng</div>
              </div>
              <Dialog open={open} onOpenChange={(o) => setOpen(o)}>
                <DialogTrigger asChild>
                  <div className="text-sm cursor-pointer text-blue-700">Thêm địa chỉ mới</div>
                </DialogTrigger>
                <DialogContent onInteractOutside={(e) => e.preventDefault()} className="w-[500px] p-0">
                  <TestCreateAddressForm onOpen={handleOpen} />
                </DialogContent>
              </Dialog>

            </div>
            <div className="header-content flex items-center justify-between mt-4">
              {/* <div className="flex items-center">
              <div className="text-[16px] font-bold">
                {address?.name || 'khnag'} {address?.phone || '123'}
              </div>
              <div className="ml-4 text-[16px]">{address?.address || '123'}</div>
            </div> */}
              <ScrollArea className="h-40 w-full pr-4">
                <RadioGroup
                  className="w-full"
                  value={addressIdSelected.toString()}
                  onValueChange={(v) => {
                    setAddressIdSelected(+v)
                  }}
                >
                  {addresses?.map(a => (
                    <TestAddressItem key={a.id} a={a} />
                  ))}

                </RadioGroup>
              </ScrollArea>


            </div>
          </div>
        </div>
      )}
    </>

  )
}
