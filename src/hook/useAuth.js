import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core'
import { NoEthereumProviderError } from '@web3-react/injected-connector'
import { useCallback , useEffect } from 'react'
import { toast } from "react-toastify";
import { setupNetwork } from "./../utils/wallet";
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'

const useAuth = () => {
  const { activate, deactivate , chainId } = useWeb3React()
  const  supportedChains  = [1 ]


  const login = useCallback(async (connector , wallet) => {
    // if the connector is walletconnect and the user has already tried to connect, manually reset the connector
    if (connector instanceof WalletConnectConnector) {
      connector.walletConnectProvider = undefined
    }
    let errorMsg = null
    await activate(connector, async (error) => {
      if (error instanceof UnsupportedChainIdError) {
        console.log('Unsupported ChainId Error')
      } else {
        if (error instanceof NoEthereumProviderError) {
          console.log('Provider Error', 'No provider was found')
        } else {
          console.log(error.name, error.message)
          toast.error(error.message)
          errorMsg = error.message
        }
      }
    })
    sessionStorage.setItem('wallet', wallet)

    if (supportedChains.includes(chainId)) {
      return true
    } else if (errorMsg === null) {

      return await setupNetwork(1)
    }
    // eslint-disable-next-line
  }, [])

  const logout = useCallback(() => {
    deactivate()
  }, [deactivate])

  return { login, logout }
}

export default useAuth
