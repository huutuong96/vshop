import envConfig from "@/config";
import { normalizePath } from "@/lib/utils";

type CustomOptions = RequestInit & { baseUrl?: string | undefined };

const ENTITY_ERRORS_STATUS = 422;

type EntityErrorPayload = {
  errors: {
    field: string,
    message: string
  }[],
  message: string,
  statusCode: number
}

export class HttpError extends Error {
  status: number
  payload: any

  constructor({ status, payload }: { status: number, payload: any }) {
    super('Http Error');
    this.status = status;
    this.payload = payload;
  }
}

export class EntityError extends HttpError {
  status: 422
  payload: EntityErrorPayload

  constructor({ status, payload }: { status: 422, payload: EntityErrorPayload }) {
    super({ status, payload });
    this.status = status;
    this.payload = payload
  }
}

class AccessToken {
  private token = '';

  get value() {
    return this.token;
  }

  set value(token: string) {
    // Nếu gọi methode này ở server thì bị lỗi
    if (typeof window === 'undefined') {
      // throw new Error('Cannot set token on server side!');
    } else {
      this.token = token;
    }
  }
}
class ShopId {
  private shop_id = 0;

  get value() {
    return this.shop_id;
  }

  set value(token: number) {
    // Nếu gọi methode này ở server thì bị lỗi
    if (typeof window === 'undefined') {
      // throw new Error('Cannot set token on server side!');
    } else {
      this.shop_id = token;
    }
  }
}

export const clientAccessToken = new AccessToken();
export const shop_id = new ShopId();

const request = async <Response>(
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  url: string,
  options?: CustomOptions | undefined) => {

  const body = options?.body ? JSON.stringify(options.body) : undefined;
  const baseHeaders = {
    'Content-Type': 'application/json',
    'Authorization': clientAccessToken?.value ? `Bearer ${clientAccessToken.value}` : ''
  };
  const baseUrl = options?.baseUrl === undefined ? envConfig.NEXT_PUBLIC_API_ENDPOINT_1 : options.baseUrl;
  // const baseUrl = options?.baseUrl === undefined ? 'http://localhost:4201' : options.baseUrl;


  const fullUrl = url.startsWith('/') ? `${baseUrl}${url}` : `${baseUrl}/${url}`

  const res = await fetch(fullUrl, {
    ...options,
    headers: {
      ...baseHeaders,
      ...options?.headers
    },
    body,
    method
  })
  const payload: Response = await res.json();


  const data = {
    status: res.status,
    payload
  }

  if (!res.ok) {
    if (res.status === ENTITY_ERRORS_STATUS) {
      throw new EntityError(data as {
        status: 422,
        payload: EntityErrorPayload
      })
    } else {
      throw new HttpError(data)
    }
  }

  // set accesstoken vào cookie chỉ xảy ra ở client
  if (typeof window !== 'undefined') {
    if (['api/v1/auth/login', 'api/v1/auth/register'].some(item => item === normalizePath(url))) {
      clientAccessToken.value = (payload as { data: { accessToken: string, refreshToken: string } }).data.accessToken;
    } else if ('api/v1/auth/logout' === normalizePath(url)) {
      clientAccessToken.value = ''
    }
  }
  return data;
}

const http = {
  get<Response>(
    url: string,
    options?: Omit<CustomOptions, 'body'> | undefined
  ) {
    return request<Response>('GET', url, options);
  },
  post<Response>(
    url: string,
    body: any,
    options?: Omit<CustomOptions, 'body'> | undefined
  ) {
    return request<Response>('POST', url, { ...options, body });
  },
  put<Response>(
    url: string,
    body: any,
    options?: Omit<CustomOptions, 'body'> | undefined
  ) {
    return request<Response>('PUT', url, { ...options, body });
  },
  delete<Response>(
    url: string,
    body: any,
    options?: Omit<CustomOptions, 'body'> | undefined
  ) {
    return request<Response>('DELETE', url, { ...options, body });
  },
}


export default http;