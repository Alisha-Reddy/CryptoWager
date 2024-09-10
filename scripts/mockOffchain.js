const { ethers, network, deployments } = require("hardhat")

async function mockKeepers() {
    const lotteryDeployed = await deployments.get("Lottery")
    const lottery = await ethers.getContractAt("Lottery", lotteryDeployed.address)
    const checkData = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(""))
    console.log(checkData)
    const checkUpkeepResponse = await lottery.callStatic.checkUpkeep(checkData)
    console.log(checkUpkeepResponse)
    if (checkUpkeepResponse) {
        const tx = await lottery.performUpkeep(checkData)
        const txReceipt = await tx.wait(1)
        const requestId = txReceipt.events[1].args.requestId
        console.log(`Performed upkeep with RequestId: ${requestId}`)

        const chainId = (await ethers.provider.getNetwork()).chainId
        console.log("Chain ID :", chainId)

        if (chainId == 31337) {
            await mockVrf(requestId, lottery)
        }
    } else {
        console.log("No upkeep needed!")
    }
}

async function mockVrf(requestId, lottery) {
    console.log("We on a local network? Ok let's pretend...")
    const vrfCoordinatorV2_5MockDeployed = await deployments.get("VRFCoordinatorV2_5Mock")
    const vrfCoordinatorV2_5Mock = await ethers.getContractAt(
        "VRFCoordinatorV2_5Mock",
        vrfCoordinatorV2_5MockDeployed.address,
    )
    await vrfCoordinatorV2_5Mock.fulfillRandomWords(requestId, lottery.address)
    console.log("Responded!")
    const recentWinner = await lottery.getRecentWinner()
    console.log(`The winner is: ${recentWinner}`)
}

mockKeepers()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
