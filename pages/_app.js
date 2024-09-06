import "../styles/globals.css"
import { http, createConfig } from "wagmi"
import { mainnet, sepolia } from "wagmi/chains"
import { WagmiProvider } from "wagmi"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"


const queryClient = new QueryClient()

export default function App({ Component, pageProps }) {
    const config = createConfig({
        chains: [mainnet, sepolia],
        transports: {
            [mainnet.id]: http(),
            [sepolia.id]: http(),
        },
    })

    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <Component {...pageProps} />
            </QueryClientProvider>
        </WagmiProvider>
    )
}
