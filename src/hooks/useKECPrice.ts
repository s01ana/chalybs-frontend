import { useContext, useEffect, useState } from 'react'
import { RefreshContext } from 'contexts/RefreshContext'

const useRefresh = () => {
  const { fast, slow, second } = useContext(RefreshContext)
  return { fastRefresh: fast, slowRefresh: slow, secondRefresh: second }
}

export default function useKECPrice() {
  const { slowRefresh, fastRefresh } = useRefresh()
  const [data, setData] = useState(0);

  useEffect(() => {
    const fetchPrice = async () => {
      const response = await fetch('https://endpoint.chalybs.net/transaction/kecprice')
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const _data = await response.json();
      setData(_data.data);
    }
    fetchPrice()
  }, [fastRefresh])

  return {
    data
  }
}

