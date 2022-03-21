type Method = 'GET' | 'POST' | 'PUT' | 'PATCH'
type QueryType = Record<string, string | number | boolean>

const getHeaders = (token?: string, isMultipart = false): Record<string, string> => ({
  ...(isMultipart ? {} : { 'Content-type': 'application/json' }),
  ...(token ? { Authorization: `Bearer ${token}` } : {}),
})

const request = async (
  path: string,
  payload: Record<string, unknown> | FormData | QueryType,
  method: Method,
  token?: string,
) => {
  let response: Response

  if (method === 'GET') {
    const url = new URL(path)
    Object.entries(payload).forEach(([key, value]) =>
      url.searchParams.append(key, `${value}`),
    )

    response = await fetch(url.href, { headers: getHeaders() })
  } else {
    const isMultipart = payload instanceof FormData

    response = await fetch(path, {
      method,
      headers: getHeaders(token, isMultipart),
      body: isMultipart ? payload : JSON.stringify({ payload }),
    })
  }

  return await response.json()
}

const fetcher = {
  get: (path: string, query: QueryType = {}) => request(path, query, 'GET'),

  post: (path: string, payload: Record<string, unknown>, token?: string) =>
    request(path, payload, 'POST', token),

  put: (path: string, payload: Record<string, unknown>, token?: string) =>
    request(path, payload, 'PUT', token),

  patch: (path: string, payload: Record<string, unknown>, token?: string) =>
    request(path, payload, 'PATCH', token),

  delete: (path: string) => request(path, { active: false }, 'PATCH'),

  upload: (path: string, payload: FormData, token?: string) =>
    request(path, payload, 'PUT', token),
}

export default fetcher
