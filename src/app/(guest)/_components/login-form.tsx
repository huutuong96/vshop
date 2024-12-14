'use client'

import LoadingScreen from '@/app/(guest)/_components/loading-screen';
import { toast } from '@/components/ui/use-toast';
import envConfig from '@/config';
import { addAccessToken, addInfo } from '@/redux/slices/profile.slice';
import { useAppInfoDispatch } from '@/redux/stores/profile.store';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RiFacebookFill, RiGithubFill, RiGoogleFill, RiTwitterXFill } from "@remixicon/react";

// Dependencies: pnpm install lucide-react

import { LoaderCircle } from "lucide-react";
import { handleLoginAction } from '@/app/action';
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
      Đăng nhập
    </Button>
  );
}


function InputEmail(
  { email, setEmail, setErrorMessage }: { email: string, setEmail: any, setErrorMessage: any }
) {
  return (
    <div className="space-y-2">
      <Label htmlFor="input-02">
        Email <span className="text-destructive">*</span>
      </Label>
      <Input
        value={email}
        placeholder="Email"
        type="email"
        className='bg-white'
        onChange={(e) => {
          setEmail(e.target.value);
          setErrorMessage('')
        }}
      />
    </div>
  );
}


function InputPassword(
  { password, setPassword, setErrorMessage }: { password: string, setPassword: any, setErrorMessage: any }
) {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const toggleVisibility = () => setIsVisible((prevState) => !prevState);

  return (
    <div className="space-y-2">
      <Label htmlFor="input-02">
        Mật khẩu <span className="text-destructive">*</span>
      </Label>
      <div className="relative">
        <Input
          id="input-23"
          className="pe-9 bg-white"
          placeholder="Nhập mật khẩu"
          type={isVisible ? "text" : "password"}
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setErrorMessage('')
          }}
        />
        <button
          className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg text-muted-foreground/80 outline-offset-2 transition-colors hover:text-foreground focus:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
          type="button"
          onClick={toggleVisibility}
          aria-label={isVisible ? "Hide password" : "Show password"}
          aria-pressed={isVisible}
          aria-controls="password"
        >
          {isVisible ? (
            <EyeOff size={16} strokeWidth={2} aria-hidden="true" />
          ) : (
            <Eye size={16} strokeWidth={2} aria-hidden="true" />
          )}
        </button>
      </div>
    </div>
  );
}

export default function LoginForm() {
  const [email, setEmail] = useState<string>('khangnd1806@gmail.com');
  const [password, setPassword] = useState<string>('123456');
  const [loading, setLoading] = useState<boolean>(false);
  const [errrorMessage, setErrorMessage] = useState<string>('');
  const dispatch = useAppInfoDispatch();
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const data = { email, password }
    try {
      setLoading(true);
      const loginRes = await fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT_1}/api/users/login`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json"
        },
        cache: 'no-cache'
      });

      if (loginRes.ok) {
        const res: { message: string, status: boolean, data: { token: string } } = await loginRes.json();
        const accessToken = res.data.token;
        const a = await fetch(`/api/auth`, {
          method: "POST",
          body: JSON.stringify({ accessToken })
        });
        if (a.ok) {
          const info = await a.json();
          const historyPath = localStorage.getItem('historyPath') ?? '/'
          window.location.href = historyPath;
          // const e = await setTimeout(() => {

          // }, 10000)
        } else {
          const resToNextServer = await a.json();
          throw resToNextServer.message;
        }

      } else {
        const res = await loginRes.json();
        throw res.error;
      }
    } catch (error) {
      // console.log('check: ', error);
      setErrorMessage(error as string);
      // console.log({ error });
      setLoading(false);
    } finally {
      // setLoading(false);
    }
    // try {
    //   const res = await handleLoginAction(data);
    //   if (!res.success) {
    //     throw res.errorMessage
    //   }
    //   const historyPath = localStorage.getItem('historyPath') ?? '/'
    //   router.push(historyPath)
    //   router.refresh();
    // } catch (error) {
    //   setErrorMessage(error as string);
    // }

  }

  const handleLoginWithGoogle = () => {
    const popup = window.open(
      "https://vnshop.top/auth/google",
      "Google Login",
      "width=500,height=600"
    );

  }

  return (
    <>
      <div className="w-1/2 bg-white p-12 flex flex-col justify-center">
        <div className="max-w-md w-full mx-auto">
          <h2 className="text-2xl font-semibold mb-6">Đăng nhập</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <InputEmail setEmail={setEmail} setErrorMessage={setErrorMessage} email={email} />
            </div>
            <div className="mb-6">
              <InputPassword password={password} setErrorMessage={setErrorMessage} setPassword={setPassword} />
            </div>
            {loading && (<ButtonLoading />)}
            {!loading && (
              <Button
                type="submit"
                className={`w-full bg-blue-700 text-white py-5 text-[14px] px-4 flex items-center justify-center gap-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`}
              >
                Đăng nhập
              </Button>
            )}
            {errrorMessage && (
              <div className='text-red-600 text-[14px] mt-4'>
                {errrorMessage}
              </div>
            )}
          </form>
          <div className="mt-4 flex items-center">
            <Link href="/forgot-password" className="text-sm text-blue-600 hover:underline">
              Quên mật khẩu?
            </Link>
          </div>
          <div className="mt-6">
            <div className="flex flex-col gap-2">
              <Button type='button' onClick={() => {
                window.location.href = 'https://vnshop.top/auth/google'
              }} variant="outline">
                <RiGoogleFill
                  className="me-3 text-[#DB4437] dark:text-white/60"
                  size={16}
                  aria-hidden="true"
                />
                Đăng nhập với tài khoản Google
              </Button>
              {/* <Button type='button' onClick={handleLoginWithGoogle} variant="outline">
                <RiGoogleFill
                  className="me-3 text-[#DB4437] dark:text-white/60"
                  size={16}
                  aria-hidden="true"
                />
                Đăng nhập với tài khoản Google
              </Button> */}
              {/* <Button variant="outline">
                <RiFacebookFill
                  className="me-3 text-[#1877f2] dark:text-white/60"
                  size={16}
                  aria-hidden="true"
                />
                Đăng nhập với tài khoản Facebook
              </Button> */}

            </div>
          </div>
          <p className="mt-6 text-center text-sm text-gray-600">
            Bạn mới biết đến VNShop? <Link href="/auth/register" className="text-blue-600 hover:underline">Đăng ký</Link>
          </p>
        </div>
      </div>
    </>
  )
}
