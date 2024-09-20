import React from "react"
import { abi, contractAddresses } from "../constants"
import { useState, useEffect } from "react"
import { useAccount } from "wagmi"
import { ethers } from "ethers"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const Main = () => {
    const [contractAddress, setContractAddress] = useState(null)
    const [contract, setContract] = useState(null)
    const [enteranceFee, setEnteranceFee] = useState(null)
    const [numPlayers, setNumPlayers] = useState("0")
    const [recentWinner, setRecentWinner] = useState("0")
    const [isFetching, setIsFetching] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

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
                console.log("contract Address:", lotAddress)
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
                setIsFetching(true)
                const fee = await contract.getEnteranceFee()
                setIsLoading(true)
                // console.log("fee:", fee)
                const feeInEther = ethers.utils.formatEther(fee)
                console.log("Enterance fee:", feeInEther)
                return feeInEther
            } catch (error) {
                console.error(error)
            } finally {
                setIsFetching(false) // Stop fetching
                setIsLoading(false) // Stop processing
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
                return numOfPlayers.toString()
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
                console.log("num players:", numPlayersFromCall)
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
                updateUI()
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
        <main className="m-10">
            <div className="flex flex-col items-center mb-20">
                <h1
                    className=" text-5xl text-yellow-300"
                    style={{ textShadow: "2px 2px #000014", fontFamily: "'Gorditas', serif" }}
                >
                    WELCOME TO CRYPTOWAGER
                </h1>
                <p
                    className="text-center text-lg p-3 "
                    style={{ fontWeight: "bolder", color: "#000014" }}
                >
                    CryptoWager makes it easy to dive into a decentralized lottery. Just enter, and
                    who knows? You might be the next lucky winner. <br /> No fuss, just simple and
                    fair play. Jump in and take your shot!
                </p>
            </div>
            <div className="flex flex-col gap-10">
                <div className="cards bg-gray-300 ">
                    <h1>Lottery Value</h1>
                    {!isConnected ? (
                        <>
                            <h3>Connect to See the Jackpot</h3>
                            <p>
                                To check out the current jackpot value, please connect your wallet
                                first. Once connected, you'll see the prize and can enter for a
                                chance to win!
                            </p>
                        </>
                    ) : (
                        <>
                            <button
                                className="btn hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-auto"
                                onClick={async function () {
                                    await enterLottery()
                                }}
                            >
                                {isLoading || isFetching ? (
                                    <div className="animate-spin spinner-border h-8 w-8 border-b-2 rounded-full"></div>
                                ) : (
                                    "Buy Lottery"
                                )}{" "}
                            </button>
                            <h3>What’s Up for Grabs?</h3>
                            <h4>Lottery Value: {enteranceFee ? `${enteranceFee} ETH` : "N/A"}</h4>
                            <p>
                                The jackpot is sitting at{" "}
                                {enteranceFee ? `${enteranceFee} ETH` : "N/A"}! Ready to take your
                                shot? Click <b>"Buy Lottery"</b> to enter and seize your chance to
                                win this prize.
                            </p>
                        </>
                    )}
                </div>
                <div>
                    <div className="cards  p-10 ">
                        <h1 className="text-5xl text-yellow-200 ">Lottery Status</h1>
                        <h3 className="my-5 text-2xl" style={{ fontFamily: "'Gorditas', serif" }}>
                            How’s the Lottery Going?
                        </h3>
                        <p>
                            Click on the <b>"Lottery Status"</b> button to see whether we're open
                            for entries, in the process of drawing, or waiting for the next round.
                            Stay informed and keep an eye on this space.
                        </p>
                    </div>
                </div>
                <div className="cards bg-gray-300 text-center">
                    <h1>Lottery Value</h1>
                    <h3>What’s Up for Grabs?</h3>
                    <p>
                        Check out the current jackpot value. Your next big win could be just a
                        ticket away! <br /> Click below to buy a lottery entry and get a chance to
                        claim this prize.
                    </p>
                </div>
                <div className="cards bg-gray-300 text-center">
                    <h1>Lottery Value</h1>
                    <h3>What’s Up for Grabs?</h3>
                    <p>
                        Check out the current jackpot value. Your next big win could be just a
                        ticket away! <br /> Click below to buy a lottery entry and get a chance to
                        claim this prize.
                    </p>
                </div>
                <div className="cards bg-gray-300 text-center">
                    <h1>Lottery Value</h1>
                    <h3>What’s Up for Grabs?</h3>
                    <p>
                        Check out the current jackpot value. Your next big win could be just a
                        ticket away! <br /> Click below to buy a lottery entry and get a chance to
                        claim this prize.
                    </p>
                </div>
            </div>
        </main>
    )
}

export default Main
