import axios from 'axios';

type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

type RequestOptions<B> = {
  method:  Method;
  url:     string;
  body?:   B;
  params?: Record<string, string | number>;
};

const instance = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
});

export async function apiRequest<TResponse, TBody = unknown>(
  options: RequestOptions<TBody>,
): Promise<TResponse> {
  const { data } = await instance.request<TResponse>({
    method: options.method,
    url:    options.url,
    data:   options.body,
    params: options.params,
  });

  return data;
}
