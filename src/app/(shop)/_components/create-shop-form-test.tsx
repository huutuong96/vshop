'use client'
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Input } from "@/components/ui/input";
import { useAppInfoSelector } from "@/redux/stores/profile.store";
import TestModal from "@/app/(shop)/_components/test-modal";
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from "@/components/ui/use-toast";
import LoadingScreen from "@/app/(guest)/_components/loading-screen";
import envConfig from "@/config";


const schema = z.object({
  shop_name: z.string().min(1, 'Vui lòng nhập tên shop'),
  address: z.any().refine(val => val !== null, { message: "Vui lòng chọn địa chỉ" }),
  phone: z.string().min(1, 'Vui lòng nhập số điện thoại'),
  cccd: z.string().min(1, 'Vui lòng nhập căn cước công dân'),
  description: z.string().min(1, 'Vui lòng nhập mô tả shop'),
});

export type CreateShopFormData = z.infer<typeof schema>;

const initialValues: CreateShopFormData = {
  shop_name: "",
  address: null,
  phone: "",
  cccd: "",
  description: ""
}


export default function CreateShopFormTest({ info }: { info: any }) {
  const accessToken = useAppInfoSelector(state => state.profile.accessToken);
  const [modal, setModal] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [cccd, setCccd] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const { register, handleSubmit, getValues, setValue, setError, formState: { errors } } = useForm<CreateShopFormData>({
    resolver: zodResolver(schema),
    mode: 'all',
    defaultValues: initialValues
  });
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = async (data: CreateShopFormData) => {
    const newData = { ...data, address: undefined, ...data.address };
    try {
      setLoading(true);
      const resToServer = await fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT_1}/api/shops`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          "Authorization": `Bearer ${accessToken}`
        },
        body: JSON.stringify(newData)
      });
      const payload = await resToServer.json();
      if (resToServer.ok) {
        const resToNextServer = await fetch(`${envConfig.NEXT_PUBLIC_URL}/api/auth`, {
          method: 'POST',
          body: JSON.stringify({ accessToken })
        })
        if (!resToNextServer.ok) {
          throw 'Có lỗi xãy ra, xin vui lòng liên hệ admin VNShop!'
        }
        toast({
          variant: "success",
          title: "success",
          description: "Tạo shop thành công"
        })
        window.location.href = '/shop';
        setLoading(false);
      } else {
        throw 'Có lỗi xãy ra, xin vui lòng liên hệ admin VNShop!'
      }

    } catch (error) {
      setLoading(false);
      setErrorMessage(error as string);
    }


  };

  const handleSetValueMainForm = (data: any) => {
    console.log(data);
    setValue('address', data);
    setError('address', { message: undefined })
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="">
        <div className="p-4 py-12 w-full flex justify-center">
          <div className="">
            <div className="flex items-center gap-6 -ml-10">
              <div className="text-[14px] w-[120px] text-right">Tên Shop</div>
              <input {...register('shop_name')} type="text" className="w-[360px] border rounded p-2 py-1 text-[14px]" />
            </div>
            {errors.shop_name && <p className="text-sm text-red-500 ml-[102px] mt-1 -mb-4">{errors.shop_name.message}</p>}
            <div className="flex items-center gap-6 mt-6 -ml-10">
              <div className="text-[14px] w-[120px] text-right">
                Địa chỉ lấy hàng
              </div>
              {!getValues('address') && (
                <div onClick={() => setModal(true)}>click</div>
              )}
              {getValues('address') && (
                <div className="text-sm flex flex-col gap-1 mb-2">
                  <div>{getValues('address')?.province}</div>
                  <div>{getValues('address')?.district}</div>
                  <div>{getValues('address')?.ward}</div>
                  <div>{getValues('address')?.location}</div>
                  <div onClick={() => setModal(true)} className="text-blue-700 font-medium cursor-pointer">Chỉnh sửa</div>
                </div>
              )}
              <TestModal open={modal} setModal={setModal} handleSetValueMainForm={handleSetValueMainForm} />
            </div>
            {errors.address && <p className="text-sm text-red-500 ml-[102px] mt-1 -mb-4">{errors.address.message?.toString()}</p>}
            <div className="flex items-center gap-6 mt-6 -ml-10">
              <div className="text-[14px] w-[120px] text-right">Email</div>
              <input type="text" readOnly defaultValue={info.email} disabled className="w-[360px] border rounded p-2 py-1 text-[14px] cursor-not-allowed" />
            </div>
            <div className="flex items-center gap-6 mt-6 -ml-10">
              <div className="text-[14px] w-[120px] text-right">Số điện thoại</div>
              <input {...register('phone')} type="text" className="w-[360px] border rounded p-2 py-1 text-[14px]" />
            </div>
            {errors.phone && <p className="text-sm text-red-500 ml-[102px] mt-1 -mb-4">{errors.phone.message?.toString()}</p>}

            <div className="flex items-center gap-6 mt-6 -ml-10">
              <div className="text-[14px] w-[120px] text-right">Căn cước công dân</div>
              <input {...register('cccd')} type="text" className="w-[360px] border rounded p-2 py-1 text-[14px]" />
            </div>
            {errors.cccd && <p className="text-sm text-red-500 ml-[102px] mt-1 -mb-4">{errors.cccd.message?.toString()}</p>}

            <div className="flex items-center gap-6 mt-6 -ml-10">
              <div className="text-[14px] w-[120px] text-right">Mô tả</div>
              <Input {...register('description')} type="text" className="w-[360px] border rounded p-2 py-1 text-[14px]" />
            </div>
            {errors.description && <p className="text-sm text-red-500 ml-[102px] mt-1 -mb-4">{errors.description.message?.toString()}</p>}

          </div>
        </div>
        <div className="relative p-6">
          <Button className="absolute bottom-10 right-10" type="submit">Đăng ký</Button>
        </div>
        {errorMessage && (
          <div className="text-sm text-red-500">{errorMessage}</div>
        )}
      </form>
      {loading && <LoadingScreen />}
    </>
  )
}
