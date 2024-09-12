import React from "react"
import { ConnectButton } from "@rainbow-me/rainbowkit"
import { useAccount } from "wagmi"

const Header = () => {
    const { isConnected, address } = useAccount()
    const account = useAccount()
    

    const isLocalhost = account?.chainId === 31337

    return (
        <nav className="p-5 border-b-2 flex flex-row">
            <h1 className="py-4 px-4 font-bold text-3xl"> CryptoWager</h1>
            <div className="ml-auto py-2 px-4">
                {isConnected && isLocalhost ? (
                    <button className="p-2 bg-white rounded-lg text-black ">
                            {address.slice(0, 6)}...{address.slice(-4)}{" "}
                            

                    </button>
                ) : (
                    <ConnectButton label="Connect wallet" /> // Default connect button
                )}{" "}
            </div>
        </nav>
    )
}

export default Header
