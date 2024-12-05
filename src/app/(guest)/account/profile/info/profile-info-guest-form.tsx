'use client';

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState } from "react";
import { useAppInfoDispatch, useAppInfoSelector } from "@/redux/stores/profile.store";
import { addInfo } from "@/redux/slices/profile.slice";
import envConfig from "@/config";
import { clientAccessToken } from "@/lib/http";
import { toast } from "@/components/ui/use-toast";

const FormSchema = z.object({
  datebirth: z.string().min(1, { message: "Ngày sinh là bắt buộc" }),
  phone: z.string().regex(/^[0-9]{10}$/, "Số điện thoại không hợp lệ"),
  avatar: z.string(),
  fullname: z.string().min(1, { message: "Vui lòng nhập tên" }),
  genre: z.string(),
});

type FormData = z.infer<typeof FormSchema>;

const genres = [
  { label: "Nam", value: "1" },
  { label: "Nữ", value: "2" },
];

const formatDate = (date: Date | undefined) => {
  if (!date) return "";
  return date.toISOString().split("T")[0]; // Convert sang định dạng YYYY-MM-DD
};

export default function ProfileInfoGuestForm() {
  const profile = useAppInfoSelector((state) => state.profile.info);
  const dispatch = useAppInfoDispatch();
  const [loadingImage, setLoadingImage] = useState<boolean>(false);

  console.log(profile);
  const { control, register, handleSubmit, getValues, setValue, setError, formState: { errors }, watch } = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    mode: "all",
    defaultValues: {
      fullname: profile?.fullname || "",
      avatar: profile?.avatar || "",
      datebirth: profile?.datebirth
        ? formatDate(new Date(profile.datebirth))
        : formatDate(new Date()), // Mặc định là ngày hiện tại
      phone: profile?.phone || "",
      genre: profile?.genre || "1",
    },
  });

  const datebirthWatched = useWatch({ control, name: "datebirth" });
  const genre = watch("genre");
  const avatarWatched = useWatch({
    control,
    name: "avatar"
  })

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageClick = () => {
    fileInputRef.current?.click(); // Trigger sự kiện click của input file
  };

  const onSubmit = async (data: FormData) => {
    console.log(data);
    try {
      const res = await fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT_1}/api/user/update_profile`, {
        headers: {
          "Authorization": `Bearer ${clientAccessToken.value}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
        method: "POST"
      });
      if (!res.ok) {
        throw 'Error'
      }
      const resFromNextServer = await fetch(`/api/auth`, {
        method: "POST",
        body: JSON.stringify({ accessToken: clientAccessToken.value })
      });
      if (!resFromNextServer.ok) {
        throw 'Error'
      }
      dispatch(addInfo({ ...profile, ...data }));
      toast({
        title: "Thành công!",
        variant: "success"
      })
    } catch (error) {
      toast({
        title: "Error",
        variant: "destructive"
      })
    }
  };

  const handleUploadAvatar = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      try {
        setLoadingImage(true);

        const formData = new FormData();
        formData.append("images[]", files[0]);

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

        setValue('avatar', payload.images[0]);
        const profileData = getValues();
        toast({
          title: "Thành công!",
          variant: "success"
        })
      } catch (error) {

      }
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full flex">
      <div className="w-[calc(100%-280px)] pr-[30px]">
        <div className="w-full">
          {/* Email */}
          <div className="flex items-center">
            <div className="w-[100px] text-right pb-[30px] text-sm text-gray-500">Email</div>
            <div className="w-full pb-[30px] pl-[20px] text-sm ">
              <p className="text-sm font-semibold">{profile?.email || "khang"}</p>
            </div>
          </div>

          {/* Fullname */}
          <div className="flex items-center">
            <div className="w-[100px] text-right pb-[30px] text-sm text-gray-500">Tên</div>
            <div className="w-full pb-[30px] pl-[20px] text-sm ">
              <Input {...register("fullname")} type="text" className="text-sm w-full" />
            </div>
          </div>
          {errors?.fullname?.message && (
            <div className="-mt-6 mb-4 text-sm ml-[105px] text-red-500">{errors.fullname.message}</div>
          )}

          {/* Phone */}
          <div className="flex items-center">
            <div className="w-[100px] text-right pb-[30px] text-sm text-gray-500">Số điện thoại</div>
            <div className="w-full pb-[30px] pl-[20px] text-sm ">
              <Input {...register("phone")} type="text" className="text-sm w-full" />
            </div>
          </div>
          {errors?.phone?.message && (
            <div className="-mt-6 mb-4 text-sm ml-[105px] text-red-500">{errors.phone.message}</div>
          )}

          {/* Genre */}
          <div className="flex items-center">
            <div className="w-[100px] text-right pb-[30px] text-sm text-gray-500">Giới tính</div>
            <div className="w-full pb-[30px] pl-[20px] text-sm ">
              <RadioGroup
                value={genre}
                onValueChange={(value) => setValue("genre", value)}
                className="flex gap-4"
              >
                {genres.map((g) => (
                  <div key={g.value} className="flex items-center space-x-2 gap-1">
                    <RadioGroupItem value={g.value} />
                    <span className="font-semibold">{g.label}</span>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </div>

          {/* Datebirth */}
          <div className="flex items-center">
            <div className="w-[100px] text-right pb-[30px] text-sm text-gray-500">Ngày sinh</div>
            <div className="w-full pb-[30px] pl-[20px] text-sm">
              <Input
                {...register("datebirth")}
                type="date"
                value={datebirthWatched || formatDate(new Date())} // Giá trị theo dõi hoặc mặc định là ngày hiện tại
                onChange={(e) => setValue("datebirth", e.target.value)}
              />
            </div>
          </div>
          {errors?.datebirth?.message && (
            <div className="-mt-6 mb-4 text-sm ml-[105px] text-red-500">{errors.datebirth.message}</div>
          )}

          {/* Submit */}
          <div className="flex items-center justify-end">
            <Button type="submit">Lưu</Button>
          </div>
        </div>
      </div>
      {/* Avatar */}
      <div className="w-[280px] flex justify-center">
        <div className=" flex flex-col items-center">
          <div className="my-5 size-[100px]">
            <img
              src={avatarWatched || "https://via.placeholder.com/100"}
              alt="Avatar"
              className="border rounded-full size-full object-cover"
            />
          </div>
          <input type="file" ref={fileInputRef} onChange={handleUploadAvatar} hidden />
          <button onClick={handleImageClick} type="button" className="px-5 border rounded-sm text-sm py-2">
            Chọn ảnh
          </button>
        </div>
      </div>
    </form>
  );
}
