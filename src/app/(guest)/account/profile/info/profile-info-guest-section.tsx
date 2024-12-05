'use client'

import ProfileInfoGuestForm from "@/app/(guest)/account/profile/info/profile-info-guest-form";
import envConfig from "@/config";
import { clientAccessToken } from "@/lib/http";
import { useAppInfoSelector } from "@/redux/stores/profile.store";
import { useEffect, useState } from "react";

export default function ProfileInfoGuestSection() {
  const [profile, setProfile] = useState<any>(null);
  useEffect(() => {
    const controller = new AbortController(); // Khởi tạo AbortController
    const signal = controller.signal;
    const getData = async () => {
      try {
        const res = await fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT_1}/api/user/me`, {
          headers: {
            "Authorization": `Bearer ${clientAccessToken.value}`,
            "Content-type": "application/json"
          },
          signal
        })
        if (!res.ok) {
          throw 'Error'
        }
        const payload = await res.json();
        setProfile({ ...payload.data })
      } catch (error) {

      }
    }
    // getData();

    return () => {
      controller.abort();
    };
  }, [])
  return (
    <ProfileInfoGuestForm />
  )
}
