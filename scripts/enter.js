const { ethers, getNamedAccounts, deployments } = require("hardhat")

async function enterLottery() {
    try {
        let deployer = (await getNamedAccounts()).deployer
        const lotteryDeployed = await deployments.get("Lottery")
        lottery = await ethers.getContractAt("Lottery", lotteryDeployed.address)
        // const raffle = await ethers.getContract("Raffle")
        // console.log("Raffle contract:", raffle.address)

        const lotteryEnteranceFee = await lottery.getEnteranceFee()
        console.log("Entrance Fee:", lotteryEnteranceFee.toString())

        const tx = await lottery.enterLottery({ value: lotteryEnteranceFee })
        await tx.wait() // Ensure the transaction is mined

        console.log("Entered!")
    } catch (error) {
        console.error("Error in enterLottery:", error)
    }
}

enterLottery()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error("Unhandled Error:", error)
        process.exit(1)
    })
