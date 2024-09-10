import "../styles/globals.css"
import { http, createConfig } from "wagmi"
import { mainnet, sepolia } from "wagmi/chains"
import { WagmiProvider } from "wagmi"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

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
                <ToastContainer limit={2} position="bottom-center" autoClose={2000} />
                <Component {...pageProps} />
            </QueryClientProvider>
        </WagmiProvider>
    )
}
