'use client'
import LoadingScreen from "@/app/(guest)/_components/loading-screen";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useForm } from "react-hook-form";
import { toast } from "@/components/ui/use-toast";
import envConfig from "@/config";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";


function ButtonLoading(
) {
  return (
    <Button className='w-full py-5 bg-blue-700 text-white px-4 flex items-center justify-center gap-4 rounded-md hover:bg-blue-700' disabled>
      <LoaderCircle
        className="-ms-1 me-2 animate-spin"
        size={16}
        strokeWidth={2}
        aria-hidden="true"
      />
      Đăng ký
    </Button>
  );
}

const registerSchema = z.object({
  fullname: z.string().min(6, { message: "Tên phải từ 6 ký tự" }),
  email: z.string().email({ message: "Email không hợp lệ" }),
  phone: z.string(),
  password: z.string().min(6, { message: "Mật khẩu phải từ 6 ký tự" }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Mật khẩu không khớp",
  path: ["confirmPassword"],
});

type RegisterFormData = z.infer<typeof registerSchema>;


export default function RegisterForm() {
  const [fullname, setFullname] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [password1, setPassword1] = useState<string>('');
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [isVisiblePassword, setIsVisiblePassword] = useState<boolean>(false);
  const [isVisibleConfirmPassword, setIsVisibleConfirmPassword] = useState<boolean>(false);


  const toggleVisibilityPassword = () => setIsVisiblePassword((prevState) => !prevState);
  const toggleVisibilityConfirmPassword = () => setIsVisibleConfirmPassword((prevState) => !prevState);

  const [errorMessage, setErrorMessage] = useState<string>('');

  const { register, handleSubmit, setError, formState: { errors } } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: "all"
  });

  const onSubmit = async (dt: RegisterFormData) => {
    const data = { ...dt }
    try {
      setLoading(true);
      const registerUser = await fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT_1}/api/users/register`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          "Content-type": "application/json"
        }
      });
      if (!registerUser.ok) {
        throw 'Error'
      }
      const res = await registerUser.json();
      // console.log(res);
      router.push(`/auth/verify?email=${dt.email}`)

    } catch (error) {
      // setError('root', {
      //   type: "manual",
      //   message: error as string
      // })
      toast({ title: "error", variant: 'destructive' })
      setLoading(false);
    }
  };

  return (
    <>
      <div className="w-1/2 p-12 flex flex-col justify-center rounded">
        <div className="max-w-md w-full mx-auto">
          <h2 className="text-2xl font-semibold mb-6">Đăng ký tài khoản</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className=" mb-1">
              <Label >
                Họ tên <span className="text-destructive">*</span>
              </Label>
              <Input
                placeholder="Họ tên"
                className='bg-white'
                {...register('fullname')}
              />
              <p className="text-[12px] h-[18px] text-red-500 mt-1">{errors.fullname && errors.fullname.message}</p>
            </div>
            <div className=" mb-1">
              <Label >
                Email <span className="text-destructive">*</span>
              </Label>
              <Input
                placeholder="Email"
                type="email"
                className='bg-white'
                {...register('email')}
              />
              <p className="text-[12px] h-[18px] text-red-500 mt-1">{errors.email && errors.email.message}</p>
            </div>
            <div className=" mb-1">
              <Label >
                Số điện thoại <span className="text-destructive">*</span>
              </Label>
              <Input
                placeholder="Số điện thoại"
                className='bg-white'
                {...register('phone')}
              />
              <p className="text-[12px] h-[18px] text-red-500 mt-1">{errors?.phone && errors.phone.message}</p>
            </div>
            <div className=" mb-1">
              <Label>
                Mật khẩu <span className="text-destructive">*</span>
              </Label>
              <div className="relative">
                <Input
                  id="input-23"
                  className="pe-9 bg-white"
                  placeholder="Nhập mật khẩu"
                  type={isVisiblePassword ? "text" : "password"}
                  {...register('password')}
                />
                <button
                  className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg text-muted-foreground/80 outline-offset-2 transition-colors hover:text-foreground focus:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                  type="button"
                  onClick={toggleVisibilityPassword}
                  aria-label={isVisiblePassword ? "Hide password" : "Show password"}
                  aria-pressed={isVisiblePassword}
                  aria-controls="password"
                >
                  {isVisiblePassword ? (
                    <EyeOff size={16} strokeWidth={2} aria-hidden="true" />
                  ) : (
                    <Eye size={16} strokeWidth={2} aria-hidden="true" />
                  )}
                </button>
              </div>
              <p className="text-[12px] h-[18px] text-red-500 mt-1">{errors.password && errors.password.message}</p>
            </div>
            <div className=" mb-4">
              <Label>
                Mật khẩu <span className="text-destructive">*</span>
              </Label>
              <div className="relative">
                <Input
                  id="input-23"
                  className="pe-9 bg-white"
                  placeholder="Nhập mật khẩu"
                  type={isVisibleConfirmPassword ? "text" : "password"}
                  {...register('confirmPassword')}
                />
                <button
                  className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg text-muted-foreground/80 outline-offset-2 transition-colors hover:text-foreground focus:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                  type="button"
                  onClick={toggleVisibilityConfirmPassword}
                  aria-label={isVisibleConfirmPassword ? "Hide password" : "Show password"}
                  aria-pressed={isVisibleConfirmPassword}
                  aria-controls="password"
                >
                  {isVisibleConfirmPassword ? (
                    <EyeOff size={16} strokeWidth={2} aria-hidden="true" />
                  ) : (
                    <Eye size={16} strokeWidth={2} aria-hidden="true" />
                  )}
                </button>
              </div>
              <p className="text-[12px] h-[18px] text-red-500 mt-1">{errors.confirmPassword && errors.confirmPassword.message}</p>
            </div>
            {loading && (<ButtonLoading />)}
            {!loading && (
              <Button
                type="submit"
                className={`w-full bg-blue-700 text-white py-5 text-[14px] px-4 flex items-center justify-center gap-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`}
              >
                Đăng ký
              </Button>
            )}
            {errors.root && <p className="text-sm text-red-500">{errors.root.message}</p>}

          </form>
          <p className="mt-6 text-center text-sm text-gray-600">
            Bạn đã có tài khoản VNShop? Đăng nhập <Link href="/auth/login" className="text-blue-600 hover:underline">tại đây!</Link>
          </p>
        </div>
      </div>
    </>
  )
}
