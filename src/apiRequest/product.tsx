import http from "@/lib/http";

const productApiRequest = {
  findAll: () => http.get<any>('api/products', {
    cache: 'no-cache'
  }),
}

export default productApiRequest;