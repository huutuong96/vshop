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
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import ghnApiRequest from "@/apiRequest/ghn"
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Check } from "lucide-react"

const schema = z.object({
  province: z.number(),
  province_name: z.string(),
  district: z.number(),
  district_name: z.string(),
  ward: z.string(),
  ward_name: z.string(),
  location: z.string().min(1, 'Vui lòng nhập địa chỉ chi tiết'),
  name: z.string().min(1),
  phone: z.string().min(1),
});

type FormData = z.infer<typeof schema>;

const initialValues: FormData = {
  district: 0,
  province: 0,
  ward: "0",
  location: '',
  name: '',
  phone: '',
  district_name: '',
  province_name: "",
  ward_name: '',
}

const typeOfAddress = [{ label: 'Nhà riêng', value: 1 }, { label: 'Văn phòng', value: 2 }]

export default function CreateAddressForm({ handleCloseCreateAddressForm }: { handleCloseCreateAddressForm: () => void }) {
  const { register, handleSubmit, getValues, setValue, setError, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: 'all',
    defaultValues: initialValues
  });

  const [provinces, setProvinces] = useState<{ province_id: number, name: string }[]>([]);
  const [districts, setDistricts] = useState<{ district_id: number, name: string }[]>([]);
  const [wards, setWards] = useState<{ ward_id: string, name: string }[]>([]);
  const [tab, setTab] = useState<string>('province');
  const [open, setOpen] = useState<boolean>(false);
  const [selectedType, setSelectedType] = useState<number>(1)

  useEffect(() => {
    const getProvinces = async () => {
      const res = await ghnApiRequest.province();
      const provinces = (res as any).data as { ProvinceID: number, ProvinceName: string }[];
      setProvinces(provinces.map(p => ({ province_id: p.ProvinceID, name: p.ProvinceName })));
    }
    getProvinces()
  }, []);

  useEffect(() => {
    console.log({ open });
    if (!open) {
      if (!getValues('district_name') || !getValues('province_name') || !getValues('ward_name')) {
        setError('root', { message: 'error' });
      }
    } else {
      setError('root', { message: undefined });
    }
  }, [open])

  const handeChangeProvince = async (v: string, name: string) => {
    if (+v) {
      const b = await ghnApiRequest.district(+v);
      setDistricts((prev) => {
        const districts = (b as any).data.map((d: any) => ({ district_id: d.DistrictID, name: d.DistrictName })).filter((d: { district_id: number, name: string }) => d.district_id !== 3451)
        return districts;
      });
      setTab('district');
      setValue('province', +v);
      setValue('province_name', name);
      setValue('district_name', '');
      setValue('ward_name', '');
    } else {
      // setError('province', { message: "Vui lòng chọn tỉnh thành" })
      // setValue('province', 0);
    }
  }
  const handleChangeDistrict = async (v: string, name: string) => {
    if (+v) {

      const b = await ghnApiRequest.ward(+v);
      setWards((prev) => {
        const wards = (b as any).data.map((w: any) => ({ ward_id: w.WardCode, name: w.WardName }))
        return wards;
      });
      setTab('ward');
      setValue('district', +v);
      setValue('district_name', name);
      setValue('ward_name', '');
    } else {
    }
  }

  const handleChangeWard = (v: string, name: string) => {
    if (v !== '0') {
      setValue('ward', v);
      setOpen(false);
      setValue('ward_name', name);
    } else {
    }
  }

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <DialogHeader className=" px-6 py-4">
        <div className="text-[20px] font-medium">Cập nhật địa chỉ</div>
      </DialogHeader>
      <div className="w-full px-6 pb-[88px] overflow-scroll scrollbar-hidden">
        <div className="w-full h-[60px]  grid grid-cols-2 gap-4">
          <div className="mt-[6px] mb-[15px]">
            <div className="w-full relative h-10 border border-[#bebebe] rounded flex">
              <div className="absolute px-[3px] top-[-8px] text-gray-500 text-[12px] bg-white left-[10px]">Họ và tên</div>
              <input {...register('name')} type="text" className="w-full p-[10px] rounded border-none outline-none text-[14px]" />
            </div>
          </div>
          <div className="mt-[6px] mb-[15px]">
            <div className="w-full relative h-10 border border-[#bebebe] rounded flex">
              <div className="absolute px-[3px] top-[-8px] text-gray-500 text-[12px] bg-white left-[10px]">Số điện thoại</div>
              <input {...register('phone')} type="text" className="w-full p-[10px] rounded border-none outline-none text-[14px]" />
            </div>
          </div>
        </div>
        <div className="w-full h-[60px] ">
          <div className="mt-[6px] mb-[15px]">
            <DropdownMenu open={open} onOpenChange={setOpen}>
              <DropdownMenuTrigger className="w-full">
                <div className={`w-full relative h-10 border  rounded flex ${errors?.root?.message ? 'border-red-500' : 'border-[#bebebe]'}`}>
                  <div className={`absolute px-[3px] top-[-8px]  text-[12px] bg-white left-[10px] ${errors?.root?.message ? 'text-red-500' : 'text-gray-500'}`}>Tỉnh/ Thành phố, Quận/Huyện, Phường/Xã</div>
                  <div className="w-full text-left p-[10px] border-none rounded outline-none text-[14px] font-semibold" >
                    {getValues('province_name')}
                    {getValues('district_name') && ', ' + getValues('district_name')}
                    {getValues('ward_name') && ', ' + getValues('ward_name')}
                  </div>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-[450px] p-0 overflow-y-auto pointer-events-auto">
                <DropdownMenuLabel className="p-0">
                  <div className="w-full">
                    <Tabs value={tab} onValueChange={(v) => {
                      if (v === 'district') {
                        if (districts.length > 0) {
                          setTab(v);
                          return
                        }
                      } else if (v === 'ward') {
                        if (wards.length > 0) {
                          setTab(v);
                          return
                        }
                      } else {
                        setTab(v);
                        return
                      }

                    }} className="w-full p-0">
                      <TabsList className="bg-white w-full flex p-0">
                        <TabsTrigger key={1} className="w-1/3 border-b-2 py-[10px] transition-all data-[state=active]:border-blue-700 data-[state=active]:text-blue-700" value="province">Tỉnh/Thành phố</TabsTrigger>
                        <TabsTrigger key={2} className={`w-1/3 border-b-2 py-[10px] transition-all data-[state=active]:border-blue-700 data-[state=active]:text-blue-700 ${districts.length === 0 ? "cursor-not-allowed" : ''}`} value="district">Quận/Huyện</TabsTrigger>
                        <TabsTrigger key={3} className={`w-1/3 border-b-2 py-[10px] transition-all data-[state=active]:border-blue-700 data-[state=active]:text-blue-700 ${wards.length === 0 ? "cursor-not-allowed" : ''}`} value="ward">Phường/Xã</TabsTrigger>
                      </TabsList>
                      <TabsContent key={1} onWheel={(e) => e.stopPropagation()} value="province" className=" w-full h-[200px] overflow-y-auto pointer-events-auto">
                        <ScrollArea className="h-[200px] w-full">
                          <div className="">
                            {provinces.length > 0 && provinces.map((p, index) => (
                              <>
                                <div
                                  key={index}
                                  onClick={() => handeChangeProvince(p.province_id.toString(), p.name)}
                                  className={`text-sm p-[10px] cursor-pointer hover:bg-gray-100 flex justify-between items-center
                                    ${getValues('province') === p.province_id ? 'bg-gray-100' : ''}
                                    `}
                                >
                                  {p.name}
                                  {getValues('province') === p.province_id && (
                                    <Check size={18} color="#1839dc" strokeWidth={1.5} />
                                  )}
                                </div>
                              </>
                            ))}
                          </div>
                          {provinces.length === 0 && (
                            <div role="status">
                              <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                              </svg>
                              <span className="sr-only">Loading...</span>
                            </div>
                          )}
                        </ScrollArea>
                      </TabsContent>
                      <TabsContent key={2} onWheel={(e) => e.stopPropagation()} value="district" className=" w-full h-[200px] overflow-y-auto pointer-events-auto">
                        <ScrollArea className="h-[200px] w-full">
                          <div className="">
                            {districts.length > 0 && districts.map((d, index) => (
                              <>
                                <div
                                  key={index}
                                  id={d.district_id.toString()}
                                  onClick={() => handleChangeDistrict(d.district_id.toString(), d.name)}
                                  className={`text-sm p-[10px] cursor-pointer hover:bg-gray-100 flex justify-between items-center
                                  ${getValues('district') === d.district_id ? 'bg-gray-100' : ''}
                                  `}
                                >
                                  {d.name}
                                  {getValues('district') === d.district_id && (
                                    <Check size={18} color="#1839dc" strokeWidth={1.5} />
                                  )}
                                </div>
                              </>
                            ))}
                          </div>
                          {provinces.length === 0 && (
                            <div role="status">
                              <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                              </svg>
                              <span className="sr-only">Loading...</span>
                            </div>
                          )}
                        </ScrollArea>

                      </TabsContent>
                      <TabsContent key={3} onWheel={(e) => e.stopPropagation()} value="ward" className=" w-full h-[200px] overflow-y-auto pointer-events-auto">
                        <ScrollArea className="h-[200px] w-full">
                          <div className="">
                            {wards.length > 0 && wards.map((w, index) => (
                              <>
                                <div
                                  key={index}
                                  onClick={() => handleChangeWard(w.ward_id, w.name)}
                                  className={`text-sm p-[10px] cursor-pointer hover:bg-gray-100 flex justify-between items-center
                                    ${getValues('ward') === w.ward_id ? 'bg-gray-100' : ''}
                                    `}
                                >
                                  {w.name}
                                  {getValues('ward') === w.ward_id && (
                                    <Check size={18} color="#1839dc" strokeWidth={1.5} />
                                  )}
                                </div>
                              </>
                            ))}
                          </div>
                          {wards.length === 0 && (
                            <div role="status">
                              <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                              </svg>
                              <span className="sr-only">Loading...</span>
                            </div>
                          )}
                        </ScrollArea>

                      </TabsContent>
                    </Tabs>
                  </div>
                </DropdownMenuLabel>
              </DropdownMenuContent>
            </DropdownMenu>

          </div>
        </div>
        <div className="w-full h-[80px] ">
          <div className="mt-[6px] mb-[15px]">
            <div className="w-full relative h-[60px] border border-[#bebebe] rounded flex">
              <div className="absolute px-[3px] top-[-8px] text-gray-500 text-[12px] bg-white left-[10px]">Địa chỉ cụ thể</div>
              <input {...register('location')} type="text" className="w-full p-[10px] border-none rounded outline-none text-[14px]" />
            </div>
          </div>
        </div>
        <div>
          <div>Loại địa chỉ</div>
          <div className="flex gap-2 mt-1">
            {typeOfAddress.map((a) => (
              <div
                onClick={() => { setSelectedType(a.value) }}
                key={a.value}
                className={`px-3 flex items-center text-sm h-10 border cursor-pointer ${selectedType === a.value ? 'border-blue-700 text-blue-600' : ''} `}
              >
                {a.label}
              </div>
            ))}
          </div>
        </div>
        <button className="border" type="button" onClick={() => { console.log(getValues()); }}>log data</button>
        <button className="border" type="button" onClick={() => { console.log(errors); }}>log error</button>

      </div>
      <DialogFooter className="px-6 bg-white w-full h-16 flex items-center border-t left-0 absolute right-0 bottom-0">
        <Button className="w-[120px]" onClick={handleCloseCreateAddressForm} type="button">Trở lại</Button>
        <Button className="w-[120px]" type="submit">Hoàn thành</Button>
      </DialogFooter>
    </form>
  )
}
