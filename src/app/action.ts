'use server'

import envConfig from '@/config';
import { cookies } from 'next/headers';

export async function handleLoginAction(data: { email: string; password: string }) {
  try {
    // Gửi yêu cầu đăng nhập
    const loginRes = await fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT_1}/api/users/login`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-cache',
    });

    if (!loginRes.ok) {
      const res = await loginRes.json();
      throw new Error(res.error);
    }

    const loginData: { message: string; status: boolean; data: { token: string } } = await loginRes.json();
    const accessToken = loginData.data.token;

    // Xác thực và lấy thông tin người dùng
    const getMeRes = await fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT_1}/api/user/me`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (!getMeRes.ok) {
      const errorPayload = await getMeRes.json();
      throw new Error(errorPayload.message || 'Failed to fetch user information.');
    }

    const userInfo = await getMeRes.json();

    // Set cookie cho token và thông tin người dùng
    const cookieStore = cookies();
    cookieStore.set('accessToken', accessToken, { path: '/', httpOnly: true });
    cookieStore.set('info', JSON.stringify(userInfo.data), { path: '/', httpOnly: true });

    // Trả về trạng thái thành công
    return { success: true };
  } catch (error: any) {
    return { success: false, errorMessage: error.message || 'Something went wrong' };
  }
}