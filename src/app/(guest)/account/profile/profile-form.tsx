'use client'
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { CalendarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useRef, useState } from "react"
import { useAppInfoDispatch, useAppInfoSelector } from "@/redux/stores/profile.store"
import envConfig from "@/config"
import { clientAccessToken } from "@/lib/http"
import { addInfo } from "@/redux/slices/profile.slice"


const FormSchema = z.object({
  datebirth: z.date(),
  phone: z.string().regex(/^[0-9]{10}$/, "Số điện thoại không hợp lệ"),
  avatar: z.string(),
  fullname: z.string().min(1, { message: 'Vui lòng nhập tên' }),
  genre: z.string()
}).superRefine((data, ctx) => {
  // if (!data.fullname) {
  //   ctx.addIssue({
  //     path: ['fullname'],
  //     code: z.ZodIssueCode.custom,
  //     message: 'Lĩnh vực này là bắt buộc'
  //   })
  // }
  if (!data.datebirth) {

  }
})

type FormData = z.infer<typeof FormSchema>;
const formatDate = (date: Date | undefined) => {
  if (!date) return "Pick a date"; // Nếu chưa chọn ngày
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date); // Định dạng dd-mm-yyyy
};

const genres: { label: string, value: '1' | '2' }[] = [
  {
    label: 'Nam',
    value: '1'
  }, {
    label: 'Nữ',
    value: '2'
  }
]

export default function ProfileForm() {
  let profile = useAppInfoSelector(state => state.profile.info);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  // const [genre, setGenre] = useState(profile.genre || '1');
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useAppInfoDispatch();

  const { register, handleSubmit, getValues, setValue, setError, formState: { errors }, watch } = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    mode: 'all',
    defaultValues: {
      fullname: profile?.fullname,
      avatar: profile?.avatar,
      datebirth: profile?.datebirth ? new Date(profile?.datebirth) : undefined,
      phone: profile?.phone,
      genre: profile?.genre || '1'
    }
  });
  const datebirth = watch("datebirth");
  const genre = watch('genre');

  const handleDateSelect = (date: Date | undefined) => {
    console.log(date?.toISOString());
    if (date) {
      setValue('datebirth', date);
      setError('datebirth', { message: undefined })
    }
  };
  const handleImageClick = () => {
    fileInputRef.current?.click(); // Trigger sự kiện click của input file
  };

  function onSubmit(data: FormData) {
    dispatch(addInfo({ ...profile, ...data, datebirth: datebirth.toISOString() }))
  }



  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full flex">
      <div className="w-[calc(100%-280px)] pr-[30px]">
        <div className="w-full">
          <div className="flex items-center">
            <div className="w-[100px] text-right pb-[30px] text-sm text-gray-500">Email</div>
            <div className="w-full pb-[30px] pl-[20px] text-sm ">
              <p className="text-sm font-semibold">{profile?.email || 'khang'}</p>
            </div>
          </div>
          <div className="flex items-center ">
            <div className="w-[100px] text-right pb-[30px] text-sm text-gray-500">Tên</div>
            <div className="w-full pb-[30px] pl-[20px] text-sm ">
              <div className="border rounded-sm">
                <input
                  {...register('fullname')}
                  type="text"
                  className="text-sm border-none rounded-sm outline-none p-3 w-full" />
              </div>
            </div>
          </div>
          {errors?.fullname?.message && (
            <div className="-mt-6 mb-4 text-sm ml-[105px] text-red-500">{errors.fullname.message}</div>
          )}

          <div className="flex items-center">
            <div className="w-[100px] text-right pb-[30px] text-sm text-gray-500">Số điện thoại</div>
            <div className="w-full pb-[30px] pl-[20px] text-sm ">
              <div className="border rounded-sm">
                <input
                  {...register('phone')}
                  type="text"
                  className="text-sm border-none rounded-sm outline-none p-3 w-full" />
              </div>
            </div>
          </div>
          {errors?.phone?.message && (
            <div className="-mt-6 mb-4 text-sm ml-[105px] text-red-500">{errors.phone.message}</div>
          )}
          <div className="flex items-center">
            <div className="w-[100px] text-right pb-[30px] text-sm text-gray-500">Giới tính</div>
            <div className="w-full pb-[30px] pl-[20px] text-sm ">
              <RadioGroup
                onValueChange={(value) => {
                  setValue('genre', value);
                }}
                value={genre}
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
          <div className="flex items-center">
            <div className="w-[100px] text-right pb-[30px] text-sm text-gray-500">Ngày sinh</div>
            <div className="w-full pb-[30px] pl-[20px] text-sm flex items-center gap-4">
              {datebirth && <span className="text-sm font-semibold">{formatDate(datebirth)}</span>}
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "text-left font-normal",
                    )}
                  >
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    selected={getValues('datebirth')}
                    onSelect={handleDateSelect}
                  // initialFocus={false}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          {errors?.datebirth?.message && (
            <div className="-mt-6 mb-4 text-sm ml-[105px] text-red-500">{errors.datebirth.message}</div>
          )}
          <div className="flex items-center">
            <div className="w-[100px] text-right pb-[30px] text-sm"></div>
            <div className="pl-5 pb-[30px] w-full flex justify-end">
              <Button type="button" onClick={() => {
                console.log(errors);
              }}>log errors</Button>
              <Button type="submit">Lưu</Button>
            </div>
          </div>
        </div>
      </div>
      <div className=" w-[280px] flex justify-center">
        <div className=" w-full">
          <div className="border-l flex flex-col items-center">
            <div className="my-5 size-[100px]">
              <img src={profile.avatar ? profile.avatar : "https://images.unsplash.com/photo-1702478553542-3aa3c0148543?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} className="border rounded-full size-full" />
            </div>
            <input type="file" ref={fileInputRef} hidden />
            <button onClick={handleImageClick} type="button" className="px-5 border text-sm py-2">Chọn ảnh</button>
          </div>
        </div>
      </div>
    </form>
  )
}
