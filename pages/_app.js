import { http, createConfig } from "wagmi"
import { localhost, mainnet, sepolia } from "wagmi/chains"
import { WagmiProvider } from "wagmi"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ToastContainer, toast } from "react-toastify"
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit"
import { connectorsForWallets } from "@rainbow-me/rainbowkit"
import { rainbowWallet, walletConnectWallet } from "@rainbow-me/rainbowkit/wallets"

import "../styles/globals.css"
import "../styles/header.css"
import "react-toastify/dist/ReactToastify.css"
import "@rainbow-me/rainbowkit/styles.css"

const queryClient = new QueryClient()

export default function App({ Component, pageProps }) {
    const connectors = connectorsForWallets(
        [
            {
                groupName: "Recommended",
                wallets: [rainbowWallet, walletConnectWallet],
            },
        ],
        {
            appName: "My RainbowKit App",
            projectId: "5dd76d2344c604785d2f2ce1ba4b98f6",
        },
    )
    const config = createConfig({
        connectors,
        chains: [mainnet, sepolia, localhost],
        transports: {
            [mainnet.id]: http(
                "https://eth-mainnet.g.alchemy.com/v2/FJ2bntQOlBZ-CxnqVSPaD-RlU_h7VQ-d",
            ),
            [sepolia.id]: http(
                "https://eth-sepolia.g.alchemy.com/v2/FJ2bntQOlBZ-CxnqVSPaD-RlU_h7VQ-d",
            ),
            [localhost.id]: http("http://127.0.0.1:8545/"),
        },
    })

    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <RainbowKitProvider>
                    <ToastContainer limit={2} position="bottom-center" autoClose={2000} />
                    <Component {...pageProps} />
                </RainbowKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
    )
}
