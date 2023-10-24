import { data } from "autoprefixer"
import { useCallback, useState, useEffect } from "react"

export const useQueries = ({ prefixUrl = '', headers = {} } = {}) => {
  const [data, setData] = useState({
    data: null,
    isLoading: true,
    isError: false
  })

  console.log("headers:", headers)

  const fetchingData = useCallback(async ({ url = ``, method = "GET", headers = {} } = {}) => {
    setData({ ...data, isLoading: true })

    try {
      const response = await fetch(url, { method, headers })
      const result = await response.json();
      setData({
        ...data,
        data: result,
        isLoading: false,
      })
    } catch (error) {
      setData({
        ...data,
        isError: true,
        isLoading: false
      })
    }
  }, [])


  useEffect(() => {
    if (prefixUrl) {
      fetchingData({ url: prefixUrl, headers })
    }
  }, [])

  return { ...data }
}


// ... => adalah distructuring