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


    useEffect(() => {
        if (chainId) {
            console.log("chainId:", chainId)
            const lotAddress =
                chainId in contractAddresses ? contractAddresses[chainId][0] : null
            if (lotAddress) {
                setContractAddress(lotAddress)
                console.log("contract Address:", contractAddress)
            } else {
                console.error("Invalid chain ID or contact address not found for this chain")
            }
        }
    }, [chainId])

        useEffect(() => {
            if (typeof window !== "undefined" && window.ethereum && contractAddress) {
                console.log("Using contractAddress:", contractAddress)
                const provider = new ethers.providers.Web3Provider(window.ethereum)
                const signer = provider.getSigner()
                const lotteryContract = new ethers.Contract(contractAddress, abi, signer)

                setContract(lotteryContract)
            }
        }, [contractAddress])

    const enterLottery = async () => {
        if (contract) {
            try {
                const feeInWei = ethers.utils.parseEther(enteranceFee)
                console.log("Entering lottery with fee:", feeInWei.toString())
                const tx = await contract.enterLottery({
                    value: feeInWei,
                    gasLimit: ethers.utils.hexlify(300000),
                })
                console.log("Transaction sent:", tx)
                const receipt = await tx.wait()
                console.log("Transaction confirmed:", receipt)
            } catch (error) {
                console.error("Error entering the lottery:", error)
            }
        }
    }
    
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
        async function updateUI() {
            try {
                if (isConnected) {
                    const fee = await getEnteranceFee()
                    // const enteranceFee = await fee.toString()
                    setEnteranceFee(fee)
                    console.log("enterance Fee:", fee)
                }
            } catch (error) {
                console.log(error)
            }
        }
        updateUI()
    }, [isConnected])

    return (
        <div>
            {address ? (
                
                <div>
                    <button onClick={async function(){await enterLottery()}}>Enter Lottery</button> <br />
                    Lottery entrance fee: {enteranceFee ? `${enteranceFee} ETH` : "N/A"} </div>
        ): (
            <div>Please Connect to a wallet</div>
        )}
        </div>
    )
}

export default LotteryEntrance
