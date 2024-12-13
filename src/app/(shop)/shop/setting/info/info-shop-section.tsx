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
import { useAppDispatch } from '@/redux/store';
import { addShop } from '@/redux/slices/profile.slice';
import { useRouter } from 'next/navigation';
import Link from 'next/link';



import { Button } from "@/components/ui/button";
import { LoaderCircle, Store } from "lucide-react";



const ShopInfoSchema = z.object({
  image: z.string().min(0).refine(v => v.length > 0, { message: 'Lĩnh vực này là cần thiết' }),
  shop_name: z.string().min(6),
  description: z.string().min(6)
});

export type ShopInfo = z.infer<typeof ShopInfoSchema>;

const InfoShopSection = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const shop = useAppInfoSelector(state => state.profile.shop);
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
  });
  const dispatch = useAppDispatch();

  useEffect(() => {

    if (shop) {
      setValue('shop_name', shop.shop_name);
      setValue('description', shop.description);
      setValue('image', shop.image || '');
    }
  }, [shop]);



  const handleUploadAvatar = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const file = files[0];

      // Hiển thị ảnh blob tạm thời
      const blobUrl = URL.createObjectURL(file);
      setValue('image', blobUrl); // Cập nhật field image với URL blob
      setError('image', { message: undefined });

      try {
        setLoading(true);
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
          title: "Upload thành công!",
          variant: "success",
        });
      } catch (error) {
        console.error("Upload failed:", error);
        toast({
          title: "Upload thất bại!",
          variant: "destructive",
        });
      } finally {
        // Dọn dẹp URL blob khi hoàn tất
        URL.revokeObjectURL(blobUrl);
        setLoading(false);
      }
    }
  };

  const onsubmit = async (data: ShopInfo) => {
    try {
      setLoading(true);
      const res = await fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT_1}/api/shops/${shop.id}`, {
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
      dispatch(addShop({ ...shop, ...data }));
    } catch (error) {
      setValue('image', '')
      toast({
        title: 'Error',
        variant: 'destructive'
      })
    } finally {
      setLoading(false);
    }
  }


  return (
    <form onSubmit={handleSubmit(onsubmit)} className="w-full">
      {/* Tabs */}
      <div className="flex items-center justify-between">
        <button
          className={`py-2 text-xl font-semibold `}
        >
          Thông tin cơ bản
        </button>
        <Link target='_blank' href={`/vendors/${shop.id}`} className="bg-blue-800 text-white py-2 px-6 flex gap-2 items-center rounded-md hover:opacity-80 text-sm">
          <Store size={20} strokeWidth={1.25} />
          Xem Shop của tôi</Link>
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

                <div className="flex gap-4 mb-4">
                  <div className="text-sm font-semibold w-[150px]">Logo của Shop</div>
                  <div>
                    <div className="relative group">
                      {/* Container của ảnh */}
                      <img
                        src={watchedImage || '/placeholder-image.jpg'} // Placeholder nếu chưa có ảnh
                        alt="Shop Logo"
                        className={`w-32 h-32 object-cover rounded-full border ${loading ? "opacity-50" : ""
                          }`} // Làm mờ khi đang tải
                      />
                      {/* Spinner hiển thị khi loading */}
                      {loading && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <img
                            className="w-10 h-10 animate-spin"
                            src="https://www.svgrepo.com/show/199956/loading-loader.svg"
                            alt="Loading icon"
                          />
                        </div>
                      )}
                      {/* Nút cập nhật ảnh hiển thị khi hover */}
                      <div
                        className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-full cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => {
                          if (!loading) {
                            document.getElementById("file-upload")?.click();
                          }
                        }} // Chặn click khi đang tải
                      >
                        <span className="text-white text-sm font-semibold">
                          {loading ? "Đang tải..." : "Cập nhật ảnh"}
                        </span>
                      </div>
                    </div>
                    {/* Input file ẩn */}
                    <Input
                      id="file-upload"
                      type="file"
                      className="hidden"
                      onChange={(event) => {
                        if (!loading) {
                          handleUploadAvatar(event); // Chỉ cho phép khi không tải
                        }
                      }}
                    />
                    {errors?.image?.message && (
                      <div className="text-sm text-rose-600">{errors.image.message}</div>
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

      <div className="flex justify-end mt-6">
        {loading && (
          <Button type='button' disabled className='bg-blue-800'>
            <LoaderCircle
              className="-ms-1 me-2 animate-spin"
              size={16}
              strokeWidth={2}
              aria-hidden="true"
            />
            Chỉnh sửa
          </Button>
        )}
        {!loading && (
          <Button type='submit' className='bg-blue-800'>
            Chỉnh sửa
          </Button>
        )}

      </div>
    </form>
  );
};

export default InfoShopSection;