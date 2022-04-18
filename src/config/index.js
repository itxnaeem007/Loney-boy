import { injected } from './../utils';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'

export const CONTRACT_ADDRESS = '0x3c3749aF690e274c351200799591f856E8ee21fA'


// const walletLink = new WalletConnectConnector({
//     supportedChainIds: [1, 3, 4, 5, 42, 56, 97],
//     rpc: 'https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
//     qrcode: true,
//     chainId: 1
//   })

  const provider = new WalletConnectConnector({
    rpc : {
        1 : 'https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161'
    },
    supportedChainIds: [1, 4, 100]
  });

export const SUPPORTED_WALLETS = {
    METAMASK: {
      connector: injected,
      name: 'Meta mask',
      iconURL: './assets/images/meta-mask-icon.svg',
      description: 'Start exploring blockchain applications in seconds. Trusted by over 1 million users worldwide.'
    },
    WALLET_CONNECT: {
      connector: provider,
      name: 'Wallet Connect',
      iconURL: './assets/images/wallet-connect-icon.svg',
      description: 'Open source protocol for connecting decentralised applications to mobile wallets.'
    }
  }