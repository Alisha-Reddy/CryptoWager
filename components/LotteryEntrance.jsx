import React from "react"
import { abi, contractAddresses } from "../constants"
import { useAccount, useReadContract } from "wagmi"
import { config } from "../config"
import { useState, useEffect } from "react"

const LotteryEntrance = () => {
    const [enteranceFee, setEnteranceFee] = useState(null)
    const [contractAddress, setContractAddress] = useState(null)

    const { isConnected, address } = useAccount()
    const account = useAccount()
    const chainId = account.chainId
    console.log("chainId:", chainId)
    // console.log(contractAddress[chainId][0])

    useEffect(() => {
        const fetchContractAddress = async () => {
            if (chainId && contractAddresses[chainId]) {
                const address = contractAddresses[chainId][0]
                setContractAddress(address)
                console.log("Contract Address:", address)
            } else {
                console.error("Invalid chain ID or contract address not found for this chain")
            }
        }

        if (chainId) {
            fetchContractAddress()
        }
    }, [chainId])

    const {
        data: fee,
        isLoading,
        error,
    } = useReadContract({
        abi: [
            {
                inputs: [],
                name: "getRequestConfirmations",
                outputs: [
                    {
                        internalType: "uint256",
                        name: "",
                        type: "uint256",
                    },
                ],
                stateMutability: "pure",
                type: "function",
            },
        ],
        address: "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9",
        functionName: "getRequestConfirmations",
        args: [],
        enabled: !!contractAddress,
    })
    console.log("fee:", fee)

    useEffect(() => {
        async function updateUI() {
            console.log("1")
            if (isConnected && fee) {
                console.log("2")
                const enteranceFee = await fee.toString()
                setEnteranceFee(enteranceFee)
                console.log("enteranceFee:", enteranceFee)
            }
        }
        updateUI()
    }, [isConnected, fee])
    if (isLoading) return <div>Loading entrance fee...</div>
    if (error) {
        console.log(error)
        return <div>Error fetching entrance fee: {error.message}</div>
    }

    return <div>Lottery entrance fee: {enteranceFee ? `${enteranceFee}` : "N/A"}</div>
}

export default LotteryEntrance
