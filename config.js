import { createConfig, http } from "wagmi"
import { mainnet, sepolia } from "wagmi/chains"

const config = createConfig({
    autoconnect: true,
    chains: [mainnet, sepolia],
    transports: {
        [mainnet.id]: http(),
        [sepolia.id]: http(),
    },
})

