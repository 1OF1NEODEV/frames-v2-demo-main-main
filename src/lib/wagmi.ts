import { http, createConfig } from 'wagmi'
import { base } from 'wagmi/chains'
import { injected, metaMask, walletConnect, coinbaseWallet } from 'wagmi/connectors'

// Replace this with your WalletConnect project ID
const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || ''

export const config = createConfig({
  chains: [base],
  connectors: [
    metaMask(),
    coinbaseWallet({
      appName: 'Don Da Degen Dog',
      chainId: base.id,
    }),
    walletConnect({
      projectId,
      metadata: {
        name: 'Don Da Degen Dog',
        description: 'Coolest Degenerate Pixel Dog on Base',
        url: 'https://frames-v2-demo-main-main.vercel.app/',
        icons: ['https://frames-v2-demo-main-main.vercel.app/don%20paws%20icon.png']
      },
    }),
    injected(),
  ],
  transports: {
    [base.id]: http(),
  },
}) 