import { cookies } from "next/headers";
import { serialize } from 'cookie';
import Crypto from 'crypto-js'
import envConfig from "@/config";

export async function POST(request: Request) {
  const cookieStore = cookies();
  try {
    const res = await request.json();
    const accessToken = res.accessToken;
    const getMe = await fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT_1}/api/user/me`, {
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-type": "application/json"
      }
    })
    const payload = await getMe.json();

    if (getMe.ok) {
      cookieStore.set('accessToken', accessToken, { path: '/', httpOnly: true });
      cookieStore.set('info', JSON.stringify(payload.data), { path: '/', httpOnly: true });

      return Response.json(payload.data, {
        status: 200,
      });
    } else {
      throw 'Có lỗi xãy ra, xin vui lòng liên hệ admin của VNShop!'
    }
  } catch (error) {
    // console.log(error);
    return Response.json({ message: error }, {
      status: 400,
    });
  }
} 