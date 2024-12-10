import http from "@/lib/http";

const config_main = {
  findAll: () => http.get<any>('api/main/config/client', {
    cache: 'no-cache'
  }),
}

export default config_main;