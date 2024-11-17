import { cookies } from "next/headers";

export async function POST(request: Request) {
  const cookieStore = cookies();
  cookieStore.set('accessToken', '', { path: '/', httpOnly: true });
  cookieStore.set('info', '', { path: '/', httpOnly: true });
  cookieStore.set('stateCheckout', '', { path: '/', httpOnly: true });
  return Response.json('OK', {
    status: 200,
  });
} 