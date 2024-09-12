import React from "react"
import { useEffect, useState } from "react"
import { useAccount, useDisconnect } from "wagmi"
import { ConnectButton } from "@rainbow-me/rainbowkit"

const ManualHeader = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const { isConnected, address } = useAccount()
    const { disconnect } = useDisconnect()

    useEffect(() => {
        if (!isConnected) {
            setIsLoggedIn(true)
        } else {
            setIsLoggedIn(false)
        }
    }, [isConnected])
    return (
        <div>
            {!isLoggedIn && address? (
                <button
                    className="p-2 bg-white m-5 rounded-sm text-black items-center"
                    onClick={disconnect}
                >
                    Connected to {address.slice(0, 6)}...{address.slice(address.length - 4)}
                </button>
            ) : (
                <div className="p-2 bg-white m-5 rounded-sm text-black items-center">
                    <ConnectButton label="Connect wallet" />
                </div>
            )}
        </div>
    )
}

export default ManualHeader
