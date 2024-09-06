import React from "react"
import { useAccount, useConnect, useDisconnect, useEnsAvatar, useEnsName } from "wagmi"
import Close from "./SVG/Close"

const Modal = ({ walletModal, setWalletModal }) => {
    const { connectors, connect } = useConnect()
    const { disconnect } = useDisconnect()

    return walletModal ? (
        <div className="fixed inset-0 overflow-y-auto z-10">
            <div
                className="fixed inset-0 w-full h-full bg-green-500 opacity-40 "
                onClick={() => setWalletModal(false)}
            ></div>
            <div className="flex items-center min-h-screen px-4 py-8  ">
                <div className="relative w-full max-w-lg p-4 mx-auto bg-gray-800 rounded-md ">
                    <div className="flex bg-black justify-end">
                        <button className="p-2" onClick={() => setWalletModal(false)}>
                            <Close></Close>
                        </button>
                    </div>
                    {connectors.map((connector) => (
                        <div key={connector.uid} className="bg-slate-500 flex gap-5 p-3">
                            <button onClick={() => connect({ connector })}>{connector.name}</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    ) : (
        ""
    )
}

export default Modal
