import http from "@/lib/http";

const productApiRequest = {
  findAll: () => http.get<any>('api/products?view_count', {
    cache: 'no-cache'
  }),
}

export default productApiRequest;