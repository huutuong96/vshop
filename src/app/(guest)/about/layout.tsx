import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  try {
    if (!accessToken) {
      throw 'Error';
    }
    return (
      { children }
    )
  } catch (error) {
    redirect('/')
  }



}
