import { cookies } from "next/headers";

export async function POST(request: Request) {
  const cookieStore = cookies();
  try {
    cookieStore.set('stateCheckout', "", { path: '/', httpOnly: true });
    return Response.json('OK', {
      status: 200,
    });
  } catch (error) {
    return Response.json({ message: 'Error' }, {
      status: 400,
    });
  }
}