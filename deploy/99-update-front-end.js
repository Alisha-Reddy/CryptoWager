const { ethers, network, deployments } = require("hardhat")
const fs = require("fs")
const { frontEndContractsFile, frontEndAbiFile } = require("../helper-hardhat-config")


module.exports = async function () {
    if (process.env.UPDATE_FRONT_END) {
        console.log("Updating front end...")
        await updateContractAddresses()
        await updateAbi()
        console.log("Front end written!")
    }
}

async function updateAbi() {
    const lottery = await deployments.get("Lottery")
    console.log("updateAbi")
    fs.writeFileSync(frontEndAbiFile, JSON.stringify(lottery.abi, null, 2))
}

async function updateContractAddresses() {
    const lottery = await deployments.get("Lottery")
    const chainId = network.config.chainId.toString()
    const currentAddresses = JSON.parse(fs.readFileSync(frontEndContractsFile, "utf8"))
    console.log("updateContractAddress")
    if (chainId in currentAddresses) {
        if (!currentAddresses[chainId].includes(lottery.address)) {
            currentAddresses[chainId].push(lottery.address)
        }
    } else {
        currentAddresses[chainId] = [lottery.address]
    }
    fs.writeFileSync(
        frontEndContractsFile,
        JSON.stringify(
            currentAddresses,
            (key, value) => (typeof value === "bigint" ? value.toString() : value),
            2,
        ),
    )
}

module.exports.tags = ["all", "frontend"]
