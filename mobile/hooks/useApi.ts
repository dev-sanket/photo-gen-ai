import { useAuth } from '@clerk/clerk-expo'
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { useCallback } from 'react'
import { API_ROUTES } from '@/constants/ApiRoutes'

const createApiInstance = (token: string | null): AxiosInstance => {
  return axios.create({
    baseURL: process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000/api',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    }
  })
}

export const useApi = () => {
  const { getToken } = useAuth()

  const apiRequest = useCallback(
    async <T = any>(config: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
      const token = await getToken({ template: 'jwt-test' })
      const api = createApiInstance(token)
      return api.request<T>(config)
    },
    [getToken]
  )

  return {
    // API Routes
    routes: API_ROUTES,

    // HTTP Methods
    get: <T = any>(url: string, config?: AxiosRequestConfig) =>
      apiRequest<T>({ ...config, method: 'GET', url }),
    post: <T = any>(url: string, data?: any, config?: AxiosRequestConfig) =>
      apiRequest<T>({ ...config, method: 'POST', url, data }),
    put: <T = any>(url: string, data?: any, config?: AxiosRequestConfig) =>
      apiRequest<T>({ ...config, method: 'PUT', url, data }),
    delete: <T = any>(url: string, config?: AxiosRequestConfig) =>
      apiRequest<T>({ ...config, method: 'DELETE', url })
  }
}
