'use client'
import { Asterisk, ClipboardList, Shuffle, Truck } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, useWatch } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import CryptoJS from "crypto-js";
import envConfig from "@/config";
import { useAppInfoSelector } from "@/redux/stores/profile.store";
import { clientAccessToken } from "@/lib/http";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

const discountFormSchema = z.object({
  title: z.string().min(6, {
    message: "Vui lòng nhập từ 6 ký tự.",
  }),
  code: z.string().min(6, {
    message: "Vui lòng nhập từ 6 ký tự.",
  }),
  description: z.string().min(6, {
    message: "Vui lòng nhập từ 6 ký tự.",
  }),
  type: z.string().min(1),
  method: z.string().min(1),
  ratio: z.number({ message: "Vui lòng nhập số phần trăm giảm giá." }).nullable().refine((val) => val === null || (val >= 0 && val <= 99), {
    message: "Giá trị không hợp lệ",
  }),
  price: z.number({ message: "Vui lòng nhập số tiền giảm giá." }).nullable(),
  quantity: z.number({ message: "Vui lòng nhập số lượng." }).min(1, { message: "Vui lòng nhập số lượng." }),
  min: z.number({ message: "Vui lòng nhập số tiền tối thiểu đơn hàng." }),
  limitValue: z.number({ message: "Vui lòng nhập số tiền tối đa có thể giảm." }).nullable(),
  start: z.string(),
  end: z.string()
}).superRefine((data, ctx) => {
  if (data.method === '1') {
    // Khi method = 1: price bắt buộc, percent và max phải null
    if (data.price === null) {
      ctx.addIssue({
        path: ['price'],
        message: 'Giá tiền là bắt buộc khi giảm giá theo tiền.',
        code: z.ZodIssueCode.custom,
      });
    }
    if (data.ratio !== null) {
      ctx.addIssue({
        path: ['ratio'],
        message: 'Không được nhập phần trăm khi giảm giá theo tiền.',
        code: z.ZodIssueCode.custom,
      });
    }
    if (data.limitValue !== null) {
      ctx.addIssue({
        path: ['limitValue'],
        message: 'Không được nhập giá trị tối đa khi giảm giá theo tiền.',
        code: z.ZodIssueCode.custom,
      });
    }
  }

  if (data.method === '2') {
    // Khi method = 2: percent và max bắt buộc, price phải null
    if (data.price !== null) {
      ctx.addIssue({
        path: ['price'],
        message: 'Không được nhập giá tiền khi giảm giá theo phần trăm.',
        code: z.ZodIssueCode.custom,
      });
    }
    if (data.ratio === null) {
      ctx.addIssue({
        path: ['ratio'],
        message: 'Phần trăm giảm giá là bắt buộc.',
        code: z.ZodIssueCode.custom,
      });
    }
    if (data.limitValue === null) {
      ctx.addIssue({
        path: ['limitValue'],
        message: 'Giá trị tối đa giảm giá là bắt buộc.',
        code: z.ZodIssueCode.custom,
      });
    }
  }
  const startDate = new Date(data.start);
  const endDate = new Date(data.end);

  if (isNaN(startDate.getTime())) {
    ctx.addIssue({
      path: ['start'],
      message: 'Ngày bắt đầu không hợp lệ.',
      code: z.ZodIssueCode.custom,
    });
  }

  if (isNaN(endDate.getTime())) {
    ctx.addIssue({
      path: ['end'],
      message: 'Ngày kết thúc không hợp lệ.',
      code: z.ZodIssueCode.custom,
    });
  }

  if (startDate.getTime() > endDate.getTime()) {
    ctx.addIssue({
      path: ['end'],
      message: 'Ngày kết thúc phải sau hoặc bằng ngày bắt đầu.',
      code: z.ZodIssueCode.custom,
    });
  }
});

type DiscountFormData = z.infer<typeof discountFormSchema>


const randomCode = () => {
  const randomBytes = CryptoJS.lib.WordArray.random(3);

  const randomHex = randomBytes.toString(CryptoJS.enc.Hex).slice(0, 6).toUpperCase();

  return randomHex;
}

export default function NewDiscountSection() {
  const { control, handleSubmit, register, getValues, setValue, setError, formState: { errors }, trigger, clearErrors } = useForm<DiscountFormData>({
    resolver: zodResolver(discountFormSchema),
    defaultValues: {
      limitValue: null,
      ratio: null,
      price: null,
      type: '1',
      method: '1'
    },
    mode: 'all'
  });
  const profile = useAppInfoSelector(state => state.profile.info);
  const router = useRouter();


  const typeWatched = useWatch({
    control,
    name: 'type',
    defaultValue: '1'
  });
  const methodWatched = useWatch({
    control,
    name: 'method',
    defaultValue: '1'
  });
  const percentWatched = useWatch({
    control,
    name: 'ratio',
  });

  const onSubmit = async (data: DiscountFormData) => {
    try {
      const res = await fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT_1}/api/shop/voucher/${profile.shop_id}`, {
        headers: {
          'Authorization': `Bearer ${clientAccessToken.value}`,
          "Content-Type": 'Application/json'
        },
        method: 'POST',
        body: JSON.stringify({ ...data, method: data.method === '1' ? '2' : '1' })
      })
      if (!res.ok) {
        throw 'Error';
      }
      toast({ title: 'Thành công', variant: 'success' });
      router.push('/shop/discount/list')
    } catch (error) {
      toast({ title: 'Lỗi', variant: 'destructive' })
    }
  }

  const handleRandomCode = () => {
    let code = randomCode();
    setValue('code', code);
    trigger('code');
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="border w-full bg-white p-4 rounded-sm mb-4">
        <div className="font-semibold text-xl">Tổng Quan</div>
        <div className="text-[13px] text-gray-400 mb-4">Các thông tin cơ bản của mã giảm giá</div>
        <div className="space-y-2 mb-6">
          <div className="text-sm mb-2 font-semibold flex items-center gap-1">
            <Asterisk size={16} color="#e83030" strokeWidth={1.25} />
            Tiêu đề
          </div>
          <Input
            {...register('title')}
          />
        </div>
        {errors?.title?.message && <div className="text-sm text-red-500">{errors.title.message}</div>}
        <div className="space-y-2 mb-6">
          <div className="flex justify-between items-center">
            <div className="text-sm mb-2 font-semibold flex items-center gap-1">
              <Asterisk size={16} color="#e83030" strokeWidth={1.25} />
              Mã giảm giá
            </div>
            <button type="button" onClick={handleRandomCode} className="text-sm flex gap-1 items-center">
              Tạo mã ngẫu nhiên
              <Shuffle size={16} strokeWidth={1.25} />
            </button>
          </div>
          <Input
            {...register('code')}
          />
          {errors?.code?.message && <div className="text-sm text-red-500">{errors.code.message}</div>}

        </div>
        <div className="space-y-2 mb-6">
          <div className="text-sm mb-2 font-semibold flex items-center gap-1">
            <Asterisk size={16} color="#e83030" strokeWidth={1.25} />
            Mô tả
          </div>
          <Input
            {...register('description')}
          />
          {errors?.description?.message && <div className="text-sm text-red-500">{errors.description.message}</div>}
        </div>
        <div className="grid grid-cols-3 my-6 gap-x-3 gap-y-5">
          <div>
            <div className="text-sm mb-2 font-semibold flex items-center gap-1">
              <Asterisk size={16} color="#e83030" strokeWidth={1.25} />
              Loại giảm giá
            </div>
            <Select value={typeWatched} onValueChange={(v) => setValue('type', v)}>
              <SelectTrigger className="w-[260px]">
                <SelectValue placeholder="Loại giảm giá" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Loại giảm giá</SelectLabel>
                  <SelectItem value="1">
                    <div className="flex gap-2 items-center ">
                      Giảm giá đơn hàng
                      <ClipboardList size={16} strokeWidth={1.25} />
                    </div>
                  </SelectItem>
                  <SelectItem value="2" disabled>
                    <div className="flex gap-2 items-center">Giảm giá vận chuyển
                      <Truck size={16} strokeWidth={1.25} /></div>
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div>
            <div className="text-sm mb-2 font-semibold flex items-center gap-1">
              <Asterisk size={16} color="#e83030" strokeWidth={1.25} />
              Phương thức giảm giá
            </div>
            <Select
              value={methodWatched}
              onValueChange={(v) => {
                if (v === '1') {
                  setValue('ratio', null);
                  setValue('limitValue', null);
                  clearErrors(['ratio', 'limitValue']);
                } else {
                  setValue('price', null)
                  clearErrors(['price']);
                }
                setValue('method', v);
              }}>
              <SelectTrigger className="w-[250px]">
                <SelectValue placeholder="Phương thức giảm giá" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Phương thức giảm giá</SelectLabel>
                  <SelectItem value="1">Số tiền</SelectItem>
                  <SelectItem value="2">Phần trăm</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div>
            <div className="text-sm mb-2 font-semibold flex items-center gap-1">
              <Asterisk size={16} color="#e83030" strokeWidth={1.25} />
              Giảm Giá
            </div>
            {methodWatched === '1' ? (
              <div className="space-y-2">
                <div className="relative">
                  <Input
                    {...register('price', { valueAsNumber: true })}
                    className="peer pe-9" />
                  <div className="pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-muted-foreground/80 peer-disabled:opacity-50">
                    {/* <Mail size={16} strokeWidth={2} aria-hidden="true" /> */}
                    <span className="text-sm">VNĐ</span>
                  </div>
                </div>
                {errors?.price?.message && <div className="text-sm text-red-500">{errors.price.message}</div>}
              </div>
            ) : (
              <div className="space-y-2">
                <div className="relative">
                  <Input
                    {...register('ratio', {
                      valueAsNumber: true,
                    })}
                    className="peer pe-9" />
                  <div className="pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-muted-foreground/80 peer-disabled:opacity-50">
                    {/* <Mail size={16} strokeWidth={2} aria-hidden="true" /> */}
                    <span className="text-sm">%</span>
                  </div>
                </div>
                {errors?.ratio?.message && <div className="text-sm text-red-500">{errors.ratio.message}</div>}
              </div>
            )}

          </div>
          <div>
            <div className="text-sm mb-2 font-semibold flex items-center gap-1">
              <Asterisk size={16} color="#e83030" strokeWidth={1.25} />
              Số lượng
            </div>
            <div className="space-y-2">
              <div className="relative">
                <Input
                  {...register('quantity', { valueAsNumber: true })}
                  className="peer pe-9" />
              </div>
            </div>
            {errors?.quantity?.message && <div className="text-sm text-red-500">{errors.quantity.message}</div>}
          </div>
          <div>
            <div className="text-sm mb-2 font-semibold flex items-center gap-1">
              <Asterisk size={16} color="#e83030" strokeWidth={1.25} />
              Số tiền tối thiểu để áp dụng
            </div>
            <div className="space-y-2">
              <div className="relative">
                <Input {...register('min', { valueAsNumber: true })} className="peer pe-9" />
                <div className="pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-muted-foreground/80 peer-disabled:opacity-50">
                  {/* <Mail size={16} strokeWidth={2} aria-hidden="true" /> */}
                  <span className="text-sm">VNĐ</span>
                </div>
              </div>
              {errors?.min?.message && <div className="text-sm text-red-500">{errors.min.message}</div>}
            </div>
          </div>
          {methodWatched === '2' && (
            <div>
              <div className="text-sm mb-2 font-semibold flex items-center gap-1">
                <Asterisk size={16} color="#e83030" strokeWidth={1.25} />
                Số tiền tối đa có thể giảm giá
              </div>
              <div className="space-y-2">
                <div className="relative">
                  <Input {...register('limitValue', { valueAsNumber: true })} className="peer pe-9" />
                  <div className="pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-muted-foreground/80 peer-disabled:opacity-50">
                    <span className="text-sm">VNĐ</span>
                  </div>
                </div>
                {errors?.limitValue?.message && <div className="text-sm text-red-500">{errors.limitValue.message}</div>}

              </div>
            </div>
          )}

        </div>
      </div>
      <div className="border w-full bg-white p-4 rounded-sm mb-4">
        <div className="font-semibold text-xl">Ngày giờ</div>
        <div className="text-[13px] text-gray-400 mb-4">Chọn thời gian giảm giá</div>
        <div className="flex gap-4">
          <div className="flex-1">
            <div className="text-sm mb-2 font-semibold flex items-center gap-1">
              <Asterisk size={16} color="#e83030" strokeWidth={1.25} />
              Thời gian bắt đầu
            </div>
            <div className="space-y-2">
              <div className="relative">
                <Input {...register('start')} type="datetime-local" className=" w-auto" />
              </div>
            </div>
            {errors?.start?.message && <div className="text-sm text-red-500">{errors.start.message}</div>}

          </div>
          <div className="flex-1">
            <div className="text-sm mb-2 font-semibold flex items-center gap-1">
              <Asterisk size={16} color="#e83030" strokeWidth={1.25} />
              Thời gian kết thúc
            </div>
            <div className="space-y-2 w-full">
              <div className="relative">
                <Input {...register('end')} type="datetime-local" className=" w-auto" />
              </div>
            </div>
            {errors?.end?.message && <div className="text-sm text-red-500">{errors.end.message}</div>}
          </div>
        </div>
      </div>
      <div className="w-full flex justify-end gap-4">
        {envConfig.NEXT_PUBLIC_MODE === 'dev' && (
          <>
            <Button onClick={() => console.log(errors)} type="button">Log Error</Button>
            <Button onClick={() => console.log(getValues())} type="button">Log Data</Button>
          </>
        )}
        <Button className="bg-blue-800 hover:bg-blue-800 hover:opacity-80" type="submit">Gửi đi</Button>
      </div>
    </form>
  )
}
