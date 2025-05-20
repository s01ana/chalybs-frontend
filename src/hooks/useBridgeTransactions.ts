import { useContext, useEffect, useState } from 'react'
import { RefreshContext } from 'contexts/RefreshContext'
import { useWeb3React } from 'libraries/wagmi'

const useRefresh = () => {
  const { fast, slow, second } = useContext(RefreshContext)
  return { fastRefresh: fast, slowRefresh: slow, secondRefresh: second }
}

export default function useBridgeTransactions() {
  const { slowRefresh, fastRefresh } = useRefresh()
  const [data, setData] = useState<any>([]);
  const { account } = useWeb3React()

  useEffect(() => {
    const fetchPrice = async () => {
      if (!account) {
        setData([]);
        return
      }
      const response = await fetch(`https://endpoint.chalybs.net/transaction/get?address=${account}`)
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

