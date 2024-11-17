"use client";

import { clientAccessToken } from "@/lib/http";
import { useState } from "react";

export default function AppProvider({
  children,
  inittialAcessToken = ''
}: Readonly<{
  children: React.ReactNode;
  inittialAcessToken?: string
}>) {

  useState(() => {
    if (typeof window !== 'undefined') {
      clientAccessToken.value = inittialAcessToken;
    }
  })

  return (
    <div id="abx">
      {children}
    </div>
  )
}
