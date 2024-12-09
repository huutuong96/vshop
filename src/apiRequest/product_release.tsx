import http from "@/lib/http";

const productRecomend = {
  findAll: () => http.get<any>('api/recommendProducts', {
    cache: 'no-cache'
  }),
}

export default productRecomend;