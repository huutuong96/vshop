'use client'
import { Input } from '@/components/ui/input';
import { useAppInfoSelector } from '@/redux/stores/profile.store';
import React, { useEffect, useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, UseFieldArrayReturn, useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import envConfig from '@/config';
import { clientAccessToken } from '@/lib/http';
import { toast } from '@/components/ui/use-toast';

const ShopInfoSchema = z.object({
  image: z.string().min(0).refine(v => v.length > 0, { message: 'Lĩnh vực này là cần thiết' }),
  shop_name: z.string().min(6),
  description: z.string().min(6)
});

export type ShopInfo = z.infer<typeof ShopInfoSchema>;

const InfoShopSection = () => {
  const [shop, setShop] = useState<any>();
  const [activeTab, setActiveTab] = useState<string>('basic'); // Để quản lý tab hiện tại
  const info = useAppInfoSelector(state => state.profile.info);
  const { register, control, setValue, formState: { errors }, setError, getValues, handleSubmit } = useForm<ShopInfo>({
    resolver: zodResolver(ShopInfoSchema),
    mode: 'all',
    defaultValues: {
      image: '',
      description: '',
      shop_name: ''
    }
  })
  const watchedImage = useWatch({
    control,
    name: 'image'
  })

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT_1}/api/shops/${info.shop_id}`, {
          headers: {
            'Authorization': `Bearer ${clientAccessToken.value}`
          }
        });
        if (!res.ok) {
          throw 'Error';
        }
        const payload = await res.json();
        setValue('shop_name', payload.data.shop.shop_name);
        setValue('description', payload.data.shop.description);
        setValue('image', payload.data.shop.image || '');
        setShop(payload.data.shop);
      } catch (error) {

      }
    }
    if (info) {
      getData()
    }
  }, []);



  const handleUploadAvatar = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const file = files[0];

      // Hiển thị ảnh blob tạm thời
      const blobUrl = URL.createObjectURL(file);
      setValue('image', blobUrl); // Cập nhật field image với URL blob
      setError('image', { message: undefined });

      try {
        // Tải ảnh lên server
        const formData = new FormData();
        formData.append("images[]", file);

        const res = await fetch(
          `${envConfig.NEXT_PUBLIC_API_ENDPOINT_1}/api/product/uploadImage`,
          {
            method: "POST",
            body: formData,
            headers: {
              Authorization: `Bearer ${clientAccessToken.value}`,
            },
          }
        );
        if (!res.ok) {
          throw new Error("Failed to upload images");
        }
        const payload = await res.json();

        // Cập nhật URL thực từ server
        setValue('image', payload.images[0]);
        toast({
          title: 'OK'
        })
      } catch (error) {
        console.error("Upload failed:", error);
      } finally {
        // Dọn dẹp URL blob nếu không còn cần thiết
        URL.revokeObjectURL(blobUrl);
      }
    }
  };

  const onsubmit = async (data: ShopInfo) => {
    try {
      const res = await fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT_1}/api/shops/${info.shop_id}`, {
        headers: {
          'Authorization': `Bearer ${clientAccessToken.value}`,
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({ ...shop, ...data })
      });
      if (!res.ok) {
        throw 'Error';
      }
      toast({
        title: 'success',
        variant: 'success'
      })
    } catch (error) {
      setValue('image', '')
      toast({
        title: 'Error',
        variant: 'destructive'
      })
    }
  }

  console.log({ watchedImage });

  return (
    <form onSubmit={handleSubmit(onsubmit)} className="w-full">
      {/* Tabs */}
      <div className="flex">
        <button
          className={`py-2 text-xl font-semibold `}
        >
          Thông tin cơ bản
        </button>
      </div>

      {/* Tab Content */}
      <div className="mt-6 bg-white w-full rounded-sm border shadow-sm p-4">
        {activeTab === 'basic' && (
          <div>
            <h2 className="text-lg font-semibold">Thông tin cơ bản</h2>
            <div className="space-y-4 mt-4 flex flex-col items-center">
              <div>
                <div className=" mb-4">
                  <div className='flex  gap-4'>
                    <div className="text-sm font-semibold w-[150px] mt-2">Tên Shop</div>
                    <div>
                      <Input className='w-[400px]' {...register('shop_name')} />
                      {errors.shop_name?.message && (
                        <div className='text-sm text-rose-600'>{errors.shop_name?.message}</div>
                      )}
                    </div>

                  </div>

                </div>

                <div className='flex gap-4 mb-4'>
                  <div className="text-sm font-semibold w-[150px]">Logo của Shop</div>
                  <div>
                    <div className="flex items-center gap-4">
                      <img
                        src={watchedImage || ''} // Link tới ảnh logo
                        alt="Shop Logo"
                        className="size-20 object-cover rounded-full border"
                      />
                      <div>
                        <Input type='file' onChange={handleUploadAvatar} />
                      </div>
                    </div>

                    {errors?.image?.message && (
                      <div className='text-sm text-rose-600'>{errors.image.message}</div>
                    )}
                  </div>
                </div>

                <div className='flex items-center gap-4 mb-4'>
                  <div className="text-sm font-semibold w-[150px]">Mô tả Shop</div>
                  <div>
                    <Input  {...register('description')} className='text-sm w-[400px] border outline-none p-2 rounded-sm' />
                    {errors?.description?.message && (
                      <div className='text-sm text-rose-600'>{errors.description.message}</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'tax' && (
          <div>
            <h2 className="text-lg font-semibold">Thông tin Thuế</h2>
            {/* Nội dung thông tin Thuế */}
            <p>Thông tin thuế của shop sẽ hiển thị tại đây.</p>
          </div>
        )}

        {activeTab === 'identity' && (
          <div>
            <h2 className="text-lg font-semibold">Thông tin Định Danh</h2>
            {/* Nội dung thông tin Định Danh */}
            <p>Thông tin định danh của shop sẽ hiển thị tại đây.</p>
          </div>
        )}
      </div>

      {/* Footer buttons */}
      <div className="flex justify-between mt-6">
        <button className="bg-blue-500 text-white py-2 px-6 rounded-md">Xem Shop của tôi</button>
        <button type='button' onClick={() => {
          console.log(getValues());
        }} className="bg-gray-200 text-gray-700 py-2 px-6 rounded-md">log data</button>
        <button type='submit' className="bg-gray-200 text-gray-700 py-2 px-6 rounded-md">Chỉnh sửa</button>
      </div>
    </form>
  );
};

export default InfoShopSection;