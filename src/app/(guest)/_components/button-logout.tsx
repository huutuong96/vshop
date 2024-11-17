'use client'
import { Button } from '@/components/ui/button'
import { addAccessToken, addInfo } from '@/redux/slices/profile.slice';
import { useAppInfoDispatch } from '@/redux/stores/profile.store';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from 'react';
import LoadingScreen from '@/app/(guest)/_components/loading-screen';
import envConfig from '@/config';

export default function ButtonLogout({ }) {
  const router = useRouter();
  const dispatch = useAppInfoDispatch();
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogout = async () => {
    try {
      setLoading(true);
      const a = await fetch(`${envConfig.NEXT_PUBLIC_URL}/api/auth/logout`, {
        method: 'POST',
        body: JSON.stringify({})
      });
      if (a.ok) {
        const res = await a.json();
        dispatch(addAccessToken(''));
        dispatch(addInfo(null));
        router.push('/');
        console.log(1);
      }
    } catch (error) {
      setLoading(false);
    } finally {
      setLoading(false);
      console.log(2);
    }
  }

  return <>
    <li onClick={handleLogout} className='p-3 text-[14px] transition-all hover:text-blue-700 hover:bg-gray-50 cursor-pointer'>
      Đăng xuất
    </li>
    {loading && <LoadingScreen />}
  </>
}
