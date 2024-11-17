import http from "@/lib/http";
import { Category } from "@/redux/slices/shop-new-product.slice";

const categoryApiRequest = {
  find: (parent_id: number | null) => http.get<{
    message: string,
    data: Category[]
  }>(`api/categories${parent_id || parent_id === null ? `?parent_id=${parent_id}` : ''}`, {
    cache: 'no-cache'
  }),
  findById: (id: number | null) => http.get<any>(`api/categories/${id}`, {
    cache: 'no-cache'
  }),
  // create: (payload: any) => http.post('api/categories/category', payload)
}

export default categoryApiRequest;