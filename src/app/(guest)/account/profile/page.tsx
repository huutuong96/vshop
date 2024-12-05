import { redirect } from "next/navigation";


export default function ProfileGuestPage() {
  return redirect('/account/profile/info')
}
