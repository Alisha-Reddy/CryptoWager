import React from "react"
import { abi, contractAddresses } from "../constants"
import { useAccount, useReadContract } from "wagmi"
import { config } from "../config"
import { useState, useEffect } from "react"
import { ethers } from "ethers"

const LotteryEntrance = () => {
    const [enteranceFee, setEnteranceFee] = useState(null)
    const [contractAddress, setContractAddress] = useState(null)
    const [contract, setContract] = useState(null)

    const { isConnected, address } = useAccount()
    const account = useAccount()
    const chainId = account.chainId
    console.log("chainId:", chainId)
    // console.log(contractAddress[chainId][0])
    const lotteryAddress = "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9"

    useEffect(() => {
        const fetchContractAddress = async () => {
            if (chainId && contractAddresses[chainId]) {
                const lotaddress = contractAddresses[chainId][0]
                setContractAddress(lotaddress)
                console.log("Contract Address:", lotaddress)
            } else {
                console.error("Invalid chain ID or contract address not found for this chain")
            }
        }

        if (chainId) {
            fetchContractAddress()
        }
    }, [chainId])

    // const {
    //     data: fee,
    //     isLoading,
    //     error,
    // } = useReadContract({
    //     abi: [
    //         {
    //             inputs: [],
    //             name: "getRequestConfirmations",
    //             outputs: [
    //                 {
    //                     internalType: "uint256",
    //                     name: "",
    //                     type: "uint256",
    //                 },
    //             ],
    //             stateMutability: "pure",
    //             type: "function",
    //         },
    //     ],
    //     address: "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9",
    //     functionName: "getRequestConfirmations",
    //     args: [],
    //     enabled: !!contractAddress,
    // })
    // console.log("fee:", fee)

    const getEnteranceFee = async () => {
        if (contract) {
            try {
                const fee = await contract.getEnteranceFee()
                const feeInEther = ethers.utils.formatEther(fee)
                console.log("Enterance fee:", feeInEther)
                return feeInEther
            } catch (error) {
                console.error(error)
            }
        }
    }

    useEffect(() => {
        if (typeof window !== "undefined" && window.ethereum) {
            const web3provider = new ethers.providers.Web3Provider(window.ethereum)
            const lotteryContract = new ethers.Contract(lotteryAddress, abi, web3provider)

            setContract(lotteryContract)

            // const fetchEnteranceFee = async () => {
            //     const enteranceFee = await getEnteranceFee.toString()
            //     console.log("Enterance Fee:", fee)
            // }
            // fetchEnteranceFee()
            
        }
    },[])
    

    useEffect(() => {
        async function updateUI() {
            console.log("1")
            try {
                if (isConnected) {
                    console.log("2")
                    const enteranceFee = await getEnteranceFee()
                    // const enteranceFee = await fee.toString()
                    setEnteranceFee(enteranceFee)
                    console.log("enteranceFee:", enteranceFee)
                }
            } catch (error) {
                console.log(error)
            }
        }
        updateUI()
    }, [isConnected])

    // console.log("fee:", ethers.utils.formatEther(enteranceFee))
    // if (isLoading) return <div>Loading entrance fee...</div>
    // if (error) {
    //     console.log(error)
    //     return <div>Error fetching entrance fee: {error.message}</div>
    // }

    return <div>Lottery entrance fee: {enteranceFee ? `${enteranceFee}` : "N/A"}</div>
}

export default LotteryEntrance
