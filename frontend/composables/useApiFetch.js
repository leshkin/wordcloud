import { API_URL } from '~/config'

export const useApiFetch = async (url, options) => {
  return useFetch(url, {
    baseURL: API_URL,
    ...options,
  })
}
