import React from "react"
import { useEffect, useState } from "react"
import { useAccount, useConnect, useDisconnect } from "wagmi"

const ManualHeader = ({ walletModal, setWalletModal }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const { isConnected } = useAccount()
    const { connect, connectors } = useConnect()
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
            {!isLoggedIn ? (
                <button
                    className="p-2 bg-white m-5 rounded-sm text-black items-center"
                    onClick={disconnect}
                >
                    {" "}
                    DISCONNECT WALLET{" "}
                </button>
            ) : (
                <div className="p-2 bg-white w-20 m-5 rounded-sm text-black items-center">
                    <button onClick={() => setWalletModal(true)}>Connect</button>
                </div>
            )}
        </div>
    )
}

export default ManualHeader
