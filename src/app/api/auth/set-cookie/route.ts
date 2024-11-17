import { cookies } from "next/headers";

export async function POST(request: Request) {
  const cookieStore = cookies();
  try {
    const res = await request.json();
    const stateCheckout = res.stateCheckout;
    if (!stateCheckout) {
      throw 'Error';
    }
    cookieStore.set('stateCheckout', stateCheckout, { path: '/', httpOnly: true, maxAge: 60 * 60 });
    return Response.json('OK', {
      status: 200,
    });
  } catch (error) {
    return Response.json({ message: 'Error' }, {
      status: 400,
    });
  }
}