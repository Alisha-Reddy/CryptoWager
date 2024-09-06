import React from "react"
import { abi, contractAddresses } from "../constants"
import { useAccount, useReadContract } from "wagmi"
import { readContract } from "wagmi/actions"
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
        if (chainId && contractAddresses[chainId]) {
            setContractAddress(contractAddresses[chainId][0]) 
            console.log("contractAddress:", contractAddress)
        } else {
            console.error("Invalid chain ID or contract address not found for this chain")
        }
    }, [chainId])

    const { data, isLoading, error } = useReadContract({
        abi,
        address: contractAddress,
        functionName: "getEnteranceFee",
        enabled: !!contractAddress,
    })

    useEffect(() => {
        if (isConnected && data) {
            async function updateUI() {
                setEnteranceFee(data.toString())
            }
            updateUI()
        }
    }, [isConnected])
    if (isLoading) return <div>Loading entrance fee...</div>
    if (error) return <div>Error fetching entrance fee: {error.message}</div>

    return <div>Lottery entrance fee: {enteranceFee ? `${enteranceFee}` : "N/A"}</div>
}

export default LotteryEntrance
