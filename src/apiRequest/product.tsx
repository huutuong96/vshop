import http from "@/lib/http";

const productApiRequest = {
  findAll: () => http.get<any>('api/products?view_count', {
    cache: 'no-cache'
  }),
  productBySoldCount: () => http.get<any>('api/client/search?limit=5&sold_count', {
    cache: 'no-cache'
  }),
  productByViewCount: () => http.get<any>('api/client/search?limit=20&view_count', {
    cache: 'no-cache'
  })
}

export default productApiRequest;