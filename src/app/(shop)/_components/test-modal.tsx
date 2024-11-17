'use client'
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from "@/components/ui/input";
import ghnApiRequest from "@/apiRequest/ghn";
import { MapPinned, X } from "lucide-react";
import { CreateShopFormData } from "@/app/(shop)/_components/create-shop-form-test";

const schema = z.object({
  province: z.number().refine(v => +v !== 0, { message: "Vui lòng chọn tỉnh thành" }),
  district: z.number().refine(v => +v !== 0, { message: "Vui lòng chọn quận huyện" }),
  ward: z.string().refine(v => v !== '0', { message: "Vui lòng chọn quận huyện" }),
  location: z.string().min(1, 'Vui lòng nhập địa chỉ chi tiết')
});

type FormData = z.infer<typeof schema>;

const initialValues: FormData = {
  district: 0,
  province: 0,
  ward: "0",
  location: ''
}

export default function TestModal({ open, setModal, handleSetValueMainForm, children }: { open: boolean, setModal: Dispatch<SetStateAction<boolean>>, handleSetValueMainForm: (data: any) => void, children?: React.ReactNode }) {
  const { register, handleSubmit, getValues, setValue, setError, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: 'all',
    defaultValues: initialValues
  });
  const [provinces, setProvinces] = useState<{ province_id: number, name: string }[]>([]);
  const [districts, setDistricts] = useState<{ district_id: number, name: string }[]>([]);
  const [wards, setWards] = useState<{ ward_id: string, name: string }[]>([]);

  const onSubmit = (data: FormData) => {
    const newData = {
      province_id: data.province,
      province: provinces.find(p => p.province_id === data.province)?.name,
      district_id: data.district,
      district: districts.find(d => d.district_id === data.district)?.name,
      ward_id: data.ward,
      ward: wards.find(w => w.ward_id === data.ward)?.name,
      location: data.location
    }
    handleSetValueMainForm(newData);
    setModal(false);
  };

  useEffect(() => {
    const getProvinces = async () => {
      const res = await ghnApiRequest.province();
      const provinces = (res as any).data as { ProvinceID: number, ProvinceName: string }[];
      setProvinces(provinces.map(p => ({ province_id: p.ProvinceID, name: p.ProvinceName })));
    }
    getProvinces()
  }, []);

  const handeChangeProvince = async (v: string) => {
    if (+v) {
      setValue('province', +v);
      setError('province', { message: undefined });
      const b = await ghnApiRequest.district(+v);
      setDistricts((prev) => {
        const districts = (b as any).data.map((d: any) => ({ district_id: d.DistrictID, name: d.DistrictName }))
        return districts;
      });
      setValue('district', 0);
      setValue('ward', '0');
      console.log('province: =>>', b);
    } else {
      setError('province', { message: "Vui lòng chọn tỉnh thành" })
      setValue('province', 0);
    }
  }
  const handleChangeDistrict = async (v: string) => {
    if (+v) {
      setValue('district', +v);
      setError('district', { message: undefined });
      const b = await ghnApiRequest.ward(+v);
      setWards((prev) => {
        const wards = (b as any).data.map((w: any) => ({ ward_id: w.WardCode, name: w.WardName }))
        return wards;
      });
      setValue('ward', '0');
      console.log('district: =>>', b);
    } else {
      setError('district', { message: "Vui lòng chọn huyện quận" });
      setValue('district', 0);
    }
  }
  const handleChangeWard = (v: string) => {
    if (v !== '0') {
      setValue('ward', v);
      setError('ward', { message: undefined });

      console.log(getValues('ward'));
    } else {
      setError('ward', { message: "Vui lòng chọn xã phường" });
    }
  }

  return (
    <>
      {open && (
        <div className="relative z-20" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div onClick={() => setModal(false)} className="fixed z-10 inset-0 bg-gray-500 bg-opacity-50 transition-opacity" aria-hidden="true" />
          <div className="fixed inset-0 z-20 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all w-[600px]">
                {/* --------------------------------------------------------------form----------------------------------------- */}



                <div className="flex flex-col p-6 relative">
                  <div className="p-2 text-lg font-medium border-b pb-2 flex items-center gap-4">
                    <MapPinned size={20} strokeWidth={1.5} />
                    Địa chỉ chi tiết
                  </div>
                  <div onClick={() => setModal(false)} className="absolute top-4 right-6 cursor-pointer hover:bg-gray-200 hover:rounded">
                    <X size={24} color="#616161" strokeWidth={1.5} />
                  </div>
                  <div className="w-full">
                    <div className="flex gap-4 items-center mt-6">
                      <div className="text-sm w-[120px] flex justify-end">Tỉnh thành</div>
                      <Select value={getValues('province').toString()} onValueChange={handeChangeProvince}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Chọn tỉnh thành" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <ScrollArea className="h-[200px]">
                              <SelectItem value="0">Chọn tỉnh thành</SelectItem>
                              {provinces.map(p => (
                                <SelectItem key={p.province_id} value={p.province_id.toString()}>{p.name}</SelectItem>
                              ))}
                            </ScrollArea>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                    {errors.province && <p className="text-sm text-red-500 ml-28 mt-1">{errors.province.message}</p>}
                    <div className="flex gap-4 items-center mt-6">
                      <div className="text-sm w-[120px] flex justify-end">Quận huyện</div>
                      <Select value={getValues('district').toString()} onValueChange={handleChangeDistrict}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Chọn quận huyện" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <ScrollArea className="h-[200px]">
                              <SelectItem value="0">Quận huyện</SelectItem>
                              {districts.map(d => (
                                <SelectItem key={d.district_id} value={d.district_id.toString()}>{d.name}</SelectItem>
                              ))}
                            </ScrollArea>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                    {errors.district && <p className="text-sm text-red-500 ml-28 mt-1">{errors.district.message}</p>}

                    <div className="flex gap-4 items-center mt-6">
                      <div className="text-sm w-[120px] flex justify-end">Xã phường</div>
                      <Select key={2} onValueChange={handleChangeWard}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Xã phường" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <ScrollArea className="h-[200px]">
                              <SelectItem value="0">Xã phường</SelectItem>
                              {wards.map(w => (
                                <SelectItem key={w.ward_id} value={w.ward_id}>{w.name}</SelectItem>
                              ))}
                            </ScrollArea>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                    {errors.ward && <p className="text-sm text-red-500 ml-28 mt-1">{errors.ward.message}</p>}
                    <div className="flex gap-4 items-center mt-6">
                      <div className="text-sm w-[120px] flex justify-end">Địa chỉ chi tiết</div>
                      <textarea {...register("location")} className="w-full p-2 roun rounded-sm border text-sm" />
                    </div>
                    {errors.location && <p className="text-sm text-red-500 ml-28 mt-1">{errors.location.message}</p>}
                  </div>
                  <div className="border-t mt-4 pt-4 flex justify-end gap-4">
                    <button className="border px-4 py-1 rounded" type="button" onClick={() => setModal(false)}>cancel</button>
                    <button className="border px-4 py-1 rounded" type="button" onClick={handleSubmit(onSubmit)}>submit</button>
                  </div>
                </div>




                {/* --------------------------------------------------------------form----------------------------------------- */}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
