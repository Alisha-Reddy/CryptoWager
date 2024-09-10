import React from "react"
import { abi, contractAddresses } from "../constants"
import { useAccount } from "wagmi"
import { useState, useEffect } from "react"
import { ethers } from "ethers"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const LotteryEntrance = () => {
    const [contractAddress, setContractAddress] = useState(null)
    const [contract, setContract] = useState(null)
    const [enteranceFee, setEnteranceFee] = useState(null)
    const [numPlayers, setNumPlayers] = useState("0")
    const [recentWinner, setRecentWinner] = useState("0")

    const { isConnected, address } = useAccount()
    const account = useAccount()
    const chainId = account.chainId

    // Set contract address based on chainId
    useEffect(() => {
        if (chainId) {
            console.log("chainId:", chainId)
            const lotAddress = chainId in contractAddresses ? contractAddresses[chainId][0] : null
            if (lotAddress) {
                setContractAddress(lotAddress)
                console.log("contract Address:", contractAddress)
            } else {
                console.error("Invalid chain ID or contact address not found for this chain")
            }
        }
    }, [chainId])

    // Initialize contract instance
    useEffect(() => {
        if (typeof window !== "undefined" && window.ethereum && contractAddress) {
            console.log("Using contractAddress:", contractAddress)
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const signer = provider.getSigner()
            const lotteryContract = new ethers.Contract(contractAddress, abi, signer)

            setContract(lotteryContract)
            // console.log(contract)
        }
    }, [contractAddress])

    // Fetch entrance fee from contract
    const getEntranceFee = async () => {
        if (contract) {
            try {
                // console.log("1")
                const fee = await contract.getEnteranceFee()
                // console.log("fee:", fee)
                const feeInEther = ethers.utils.formatEther(fee)
                console.log("Enterance fee:", feeInEther)
                return feeInEther
            } catch (error) {
                console.error(error)
            }
        }
    }

    // Get number of players
    const getNumberOfPlayers = async () => {
        if (contract) {
            try {
                const numOfPlayers = await contract.getNumberOfPlayers()
                return numOfPlayers.toString()
            } catch (error) {
                console.error(error)
            }
        }
    }

    // Get Recent Winner
    const getRecentWinner = async () => {
        if (contract) {
            try {
                const numOfPlayers = await contract.getRecentWinner()
                return numOfPlayers
            } catch (error) {
                console.error(error)
            }
        }
    }

    // Call function to get entrance fee when connected
    useEffect(() => {
        async function fetchFee() {
            if (isConnected) {
                const entranceFeeFromCall = await getEntranceFee()
                console.log("fetched fee:", entranceFeeFromCall)

                setEnteranceFee(entranceFeeFromCall)
            }
        }
        fetchFee()
    }, [isConnected])

    async function updateUI() {
        console.log("Updating UI...")
        try {
            if (isConnected) {
                // const entranceFeeFromCall = await getEntranceFee()
                const numPlayersFromCall = await getNumberOfPlayers()
                const recentWinnerFromCall = await getRecentWinner()

                // setEnteranceFee(entranceFeeFromCall)
                setNumPlayers(numPlayersFromCall)
                setRecentWinner(recentWinnerFromCall)
            }
        } catch (error) {
            console.log(error)
        }
    }

    // Enter lottery function with notifications
    const enterLottery = async () => {
        if (contract) {
            try {
                const feeInWei = ethers.utils.parseEther(enteranceFee)
                console.log("Fee:", feeInWei.toString())

                toast.info(
                    <div>
                        <strong>Transaction Submitted</strong>
                        <br />
                        Waiting for confirmation...
                    </div>,
                )
                // console.log("2")
                const tx = await contract.enterLottery({
                    value: feeInWei,
                    gasLimit: ethers.utils.hexlify(300000),
                })
                console.log("3")
                const receipt = await tx.wait()
                console.log("Transaction confirmed:", receipt)
                updateUI()

                toast.success(
                    <div>
                        <strong>Success!</strong>
                        <br />
                        You have entered the lottery.
                    </div>,
                )
            } catch (error) {
                console.error("Error entering the lottery:", error)
                toast.error(
                    <div>
                        <strong>Error!</strong>
                        <br />
                        Transaction failed. Please try again.
                    </div>,
                )
            }
        }
    }

    useEffect(() => {
        if (contract) {
            const handleWinnerPicked = async (winner) => {
                console.log("WinnerPicked event detected:", winner)
                setRecentWinner(winner) // Automatically updates the recent winner in the UI
                toast.success(`New Winner: ${winner}`)
            }

            // Listen for the WinnerPicked event
            contract.on("WinnerPicked", handleWinnerPicked)

            // Clean up the event listener when the component unmounts or contract changes
            return () => {
                contract.off("WinnerPicked", handleWinnerPicked)
            }
        }
    }, [contract])


    return (
        <div>
            {address ? (
                <div>
                    <button
                        onClick={async function () {
                            await enterLottery()
                        }}
                    >
                        Enter Lottery
                    </button>{" "}
                    <br />
                    Lottery entrance fee: {enteranceFee ? `${enteranceFee} ETH` : "N/A"} <br />
                    Number Of Players: {numPlayers} <br />
                    Recent Winner: {recentWinner}
                </div>
            ) : (
                <div>Please Connect to a wallet</div>
            )}
        </div>
    )
}

export default LotteryEntrance
