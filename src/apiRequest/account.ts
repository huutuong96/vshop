import http from "@/lib/http";

const accountApiRequest = {
  meInserver: (accessToken: string) => http.get<any>('api/v1/auth/me', {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  }),
  me: () => http.get<any>('api/v1/auth/me')
}

export default accountApiRequest;