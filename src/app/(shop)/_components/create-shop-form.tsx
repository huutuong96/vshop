'use client'
import envConfig from "@/config";
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { FormEvent, useEffect, useRef, useState } from "react"
import ghnApiRequest from "@/apiRequest/ghn";
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
import { Input } from "@/components/ui/input";
import { useAppInfoSelector } from "@/redux/stores/profile.store";
import { toast } from "@/components/ui/use-toast";

export default function CreateShopForm({ info }: { info: any }) {
  const accessToken = useAppInfoSelector(state => state.profile.accessToken);
  const [provinces, setProvinces] = useState<any[]>([]);
  const [districts, setDistricts] = useState<any[]>([]);
  const [wards, setWards] = useState<any[]>([]);
  const [modal, setModal] = useState<boolean>(false);
  const [isConfirmAddress, setIsConfirmAddress] = useState<boolean>(false);
  const [address, setAddress] = useState<any[]>([]);
  const [addressDetail, setAddressDetail] = useState<string>('');
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [cccd, setCccd] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');


  const getProvinces = async () => {
    const res = await ghnApiRequest.province();
    const data = ((res as any).data as any[]).map(item => ({ province_id: item.ProvinceID, name: item.ProvinceName }));
    setProvinces([...data]);
    setDistricts(prev => []);
    setWards(prev => []);
  }
  const getDistrict = async (id: number) => {
    const res = await ghnApiRequest.district(id);
    const data = ((res as any).data as any[]).map(item => ({ district_id: item.DistrictID, name: item.DistrictName }));
    setDistricts([...data])
    setWards(prev => []);
  }
  const getWard = async (id: number) => {
    const res = await ghnApiRequest.ward(id);
    const data = ((res as any).data as any[]).map(item => ({ ward_id: item.WardCode, name: item.WardName }));
    setWards([...data])
  }

  const handleSelectProvince = async (id: number) => {
    const province = provinces.find(i => i.province_id === id);
    setAddress([province])
    await getDistrict(id)
    setIsConfirmAddress(false);
  }
  const handleSelectDistrict = async (id: number) => {
    const district = districts.find(i => i.district_id === id);
    setAddress(prev => {
      prev.splice(1, 10);
      prev[1] = district;
      return [...prev]
    })
    await getWard(id);
    setIsConfirmAddress(false);
  }
  const handleSelectWard = async (id: string) => {
    const ward = wards.find(i => i.ward_id === id);
    setAddress(prev => {
      prev.splice(2, 10);
      prev[2] = ward;
      return [...prev]
    })
    setIsConfirmAddress(false);
  }


  useEffect(() => {
    getProvinces()
  }, [])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const data = {
      shop_name: name,
      phone, cccd, description,
      province: address[0].name,
      province_id: address[0].province_id,
      district: address[1].name,
      district_id: address[1].district_id,
      ward: address[2].name,
      ward_id: address[2].ward_id,
      location: address[3].name,
    };
    console.log(data);


  }

  console.log({ address });


  return (
    <>
      <form onSubmit={handleSubmit} className="">
        <div className="p-4 py-12 w-full flex justify-center">
          <div className="">
            <div className="flex items-center gap-6 mb-6 -ml-10">
              <div className="text-[14px] w-[120px] text-right">Tên Shop</div>
              <input value={name} onChange={(e) => setName(e.target.value)} type="text" className="w-[360px] border rounded p-2 py-1 text-[14px]" />
            </div>
            <div className="flex items-center gap-6 mb-6 -ml-10">
              <div className="text-[14px] w-[120px] text-right">
                Địa chỉ lấy hàng
              </div>
              {/* <input type="text" className="w-[360px] border rounded p-2 py-1 text-[14px]" /> */}
              <Dialog open={modal} onOpenChange={setModal}>
                <DialogTrigger asChild className={`${isConfirmAddress ? 'hidden' : ''}`}>
                  <div className="w-[360px] text-[14px] p-2 py-1 border rounded-sm cursor-pointer">
                    Địa chỉ
                  </div>
                </DialogTrigger>
                <DialogContent className="min-w-[200px] max-w-[600px]">
                  <DialogHeader>
                    <DialogTitle className="mb-2">Thêm địa chỉ lấy hàng</DialogTitle>
                  </DialogHeader>
                  <div className="w-full">
                    <div className="mb-4">
                      <label htmlFor="" className="text-[14px]">Tỉnh</label>
                      <Select
                        value={address.length ? address[0].province_id : undefined}
                        onValueChange={async (value) => {
                          handleSelectProvince(+value)
                        }}>
                        <SelectTrigger className="w-full mt-2">
                          <SelectValue placeholder="Chọn Tỉnh thành" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup className="max-h-[200px]">
                            <SelectLabel>Tỉnh</SelectLabel>
                            <ScrollArea className="h-[200px]">
                              {provinces.map(it => (
                                <SelectItem className="hover:bg-gray-50 cursor-pointer" key={it.province_id} value={it.province_id}>{it.name}</SelectItem>
                              ))}
                            </ScrollArea>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="mb-4">
                      <label htmlFor="" className="text-[14px]">Quận/Huyện</label>
                      <Select
                        value={address.length > 1 ? address[1].district_id : undefined}
                        onValueChange={async (value) => {
                          handleSelectDistrict(+value);
                        }}>
                        <SelectTrigger className="w-full mt-2">
                          <SelectValue placeholder="Chọn Quận/Huyện" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup className="max-h-[200px] overflow-y-scroll">
                            <SelectLabel defaultValue={''}>Quận/Huyện</SelectLabel>
                            {districts.map(it => (
                              <SelectItem key={it.district_id} value={it.district_id}>{it.name}</SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="mb-4">
                      <label htmlFor="" className="text-[14px]">Phường/Xã</label>
                      <Select
                        value={address.length > 2 ? address[2].ward_id : undefined}
                        onValueChange={async (value) => {
                          handleSelectWard(value);
                        }}>
                        <SelectTrigger className="w-full mt-2">
                          <SelectValue placeholder="Chọn Phường/Xã" />
                        </SelectTrigger>
                        <SelectContent className="w-full">
                          <SelectGroup className="max-h-[200px] w-full overflow-y-scroll">
                            <SelectLabel defaultValue={''}>Phường/Xã</SelectLabel>
                            {wards.map(it => (
                              <SelectItem key={it.ward_id} value={it.ward_id}>{it.name}</SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label htmlFor="addressDetail" className="text-[14px]">Địa chỉ chi tiết</label>
                      <input ref={inputRef} onBlur={() => {
                        setIsConfirmAddress(true);
                        address[3] = { location: inputRef.current?.value, name: inputRef.current?.value }
                      }} className="w-full border mt-2 p-2 text-[14px]" name="" id="addressDetail"></input>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit">Save changes</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              <div className="text-[14px]">
                {isConfirmAddress && (
                  <>
                    {address.map((it, index) => (
                      <div key={index}>{it.name}</div>
                    ))}
                    <div className="text-blue-700 cursor-pointer mt-2" onClick={() => setModal(true)}>Chỉnh sửa</div>
                  </>
                )}
              </div>

            </div>
            <div className="flex items-center gap-6 mb-6 -ml-10">
              <div className="text-[14px] w-[120px] text-right">Email</div>
              <input type="text" readOnly defaultValue={info.email} disabled className="w-[360px] border rounded p-2 py-1 text-[14px] cursor-not-allowed" />
            </div>
            <div className="flex items-center gap-6 mb-6 -ml-10">
              <div className="text-[14px] w-[120px] text-right">Số điện thoại</div>
              <input value={phone} onChange={(e) => setPhone(e.target.value)} type="text" className="w-[360px] border rounded p-2 py-1 text-[14px]" />
            </div>
            <div className="flex items-center gap-6 mb-6 -ml-10">
              <div className="text-[14px] w-[120px] text-right">Căn cước công dân</div>
              <input value={cccd} onChange={(e) => setCccd(e.target.value)} type="text" className="w-[360px] border rounded p-2 py-1 text-[14px]" />
            </div>
            <div className="flex items-center gap-6 mb-6 -ml-10">
              <div className="text-[14px] w-[120px] text-right">Mô tả</div>
              <Input value={description} onChange={(e) => setDescription(e.target.value)} type="text" className="w-[360px] border rounded p-2 py-1 text-[14px]" />
            </div>
          </div>
        </div>
        <div className="relative p-6">
          <Button className="absolute bottom-10 right-10" type="submit">Đăng ký</Button>
        </div>
        {errorMessage && (
          <div className="text-sm text-red-500">{errorMessage}</div>
        )}
      </form>
    </>
  )
}
