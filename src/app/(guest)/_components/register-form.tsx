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

const registerSchema = z.object({
  fullname: z.string().min(6, { message: "Tên phải từ 6 ký tự" }),
  email: z.string().email({ message: "Email không hợp lệ" }),
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

  const [errorMessage, setErrorMessage] = useState<string>('');

  const { register, handleSubmit, setError, formState: { errors } } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: "all"
  });

  const onSubmit = async (dt: RegisterFormData) => {
    const data = { ...dt, role_id: 5 }
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
      <div className="w-1/2 bg-gray-100 p-12 flex flex-col justify-center rounded">
        <div className="max-w-md w-full mx-auto">
          <h2 className="text-2xl font-semibold mb-6">Đăng ký tài khoản</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-1">
              <label htmlFor="email" className="block text-gray-700 mb-2">Họ tên</label>
              <input
                type="text"
                id="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Nhập họ tên"
                {...register("fullname")}
              />
            </div>
            {errors.fullname && <p className="text-sm text-red-500">{errors.fullname.message}</p>}
            <div className="mt-4 mb-1">
              <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
              <input
                type="text"
                id="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Nhập email"
                {...register("email")}
              />
            </div>
            {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
            <div className="mt-4 mb-1">
              <label htmlFor="password" className="block text-gray-700 mb-2">Mật khẩu</label>
              <input
                type="password"
                id="password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Nhập mật khẩu"
                {...register("password")}
              />
            </div>
            {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
            <div className="mt-4 mb-1">
              <label htmlFor="password" className="block text-gray-700 mb-2">Nhập lại mật khẩu</label>
              <input
                type="password"
                id="password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Xác thực mật khẩu"
                {...register("confirmPassword")}
              />
            </div>
            {errors.confirmPassword && <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>}
            <button
              type="submit"
              className="w-full mt-4 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Đăng ký
            </button>
            {errors.root && <p className="text-sm text-red-500">{errors.root.message}</p>}

          </form>
          <div className="mt-4 flex justify-end items-center">
            <Link href="/forgot-password" className="text-sm text-blue-600 hover:underline">
              Quên mật khẩu?
            </Link>
          </div>
          <div className="mt-6">
            <button className="w-full mb-2 py-2 px-4 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 flex items-center justify-center">
              <Image src="/images/facebook-icon.png" alt="Facebook" width={20} height={20} className="mr-2" />
              Facebook
            </button>
            <button className="w-full py-2 px-4 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 flex items-center justify-center">
              <Image src="/images/google-icon.png" alt="Google" width={20} height={20} className="mr-2" />
              Google
            </button>
          </div>
          <p className="mt-6 text-center text-sm text-gray-600">
            Bạn mới biết đến Shopee? <Link href="/seller-signup" className="text-blue-600 hover:underline">Đăng ký</Link>
          </p>
        </div>
      </div>
      {loading && <LoadingScreen />}
    </>
  )
}
