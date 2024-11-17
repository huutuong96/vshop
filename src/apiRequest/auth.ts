import http from "@/lib/http";
import { LoginBodyType, RegisterBodyType } from "@/schema/auth.schema";

const authApiRequest = {
  login: (body: LoginBodyType) =>
    http.post<any>('api/v1/auth/login', body),
  register: (body: RegisterBodyType) =>
    http.post<any>('api/v1/auth/register', body),
  auth: (body: any) => http.post<any>('api/auth', body, {
    baseUrl: ''
  }),
  logoutFromNextServerToServer: (accessToken: string) =>
    http.post<any>('api/v1/auth/logout', {}, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    }),
  logoutFromNextClientToNextServer: () =>
    http.post<any>('api/auth/logout', {}, {
      baseUrl: ''
    })
}

export default authApiRequest;