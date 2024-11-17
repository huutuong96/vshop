import envConfig from "@/config"

const request = async <T>(method: 'GET' | 'POST', url: string, data?: any) => {
  const headers = {
    'Content-Type': 'application/json',
    'token': envConfig.NEXT_PUBLIC_GHN_API_TOKEN
  }
  const body = data ? JSON.stringify(data) : undefined;

  const res = await fetch(url, {
    method,
    headers,
    body
  })

  const payload: T = await res.json();

  if (!res.ok) {
    throw payload;
  }

  return payload
}

const ghnApiRequest = {
  province: () => request('GET', envConfig.NEXT_PUBLIC_API_ENDPOINT_GHN_PROVINCES),
  district: (province_id: number) => request('POST', envConfig.NEXT_PUBLIC_API_ENDPOINT_GHN_DISTRICTS, { province_id: province_id }),
  ward: (district_id: number) => request('POST', envConfig.NEXT_PUBLIC_API_ENDPOINT_GHN_WARDS, { district_id: district_id })
}

export default ghnApiRequest;