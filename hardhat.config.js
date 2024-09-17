const { sepolia, holesky, mainnet, polygon } = require("viem/chains")

require("@nomiclabs/hardhat-waffle")
require("@nomiclabs/hardhat-ethers")
require("@nomicfoundation/hardhat-verify")
require("hardhat-deploy")
require("solidity-coverage")
require("hardhat-gas-reporter")
require("hardhat-contract-sizer")
require("dotenv").config()

const MAINNET_RPC_URL = process.env.MAINNET_RPC_URL
const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL
const ETHEREUM_HOLESKY_RPC_URL = process.env.ETHEREUM_HOLESKY_RPC_URL
const POLYGON_MAINNET_RPC_URL = process.env.POLYGON_MAINNET_RPC_URL
const POLYGON_AMOY_RPC_URL = process.env.POLYGON_AMOY_RPC_URL

const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "key"
const POLYGON_API_KEY = process.env.POLYGON_API_KEY || "key"

const PRIVATE_KEY = process.env.PRIVATE_KEY || "0x"
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY || "key"
const REPORT_GAS = process.env.REPORT_GAS || false

module.exports = {
    networks: {
        hardhat: {
            chainId: 31337,
            blockConfirmations: 1,
            allowUnlimitedContractSize: true,
        },
        sepolia: {
            url: SEPOLIA_RPC_URL,
            accounts: PRIVATE_KEY !== undefined ? [PRIVATE_KEY] : [],
            chainId: 11155111,
            blockConfirmations: 6,
            saveDeployments: true,
        },
        holesky: {
            url: ETHEREUM_HOLESKY_RPC_URL,
            accounts: PRIVATE_KEY !== undefined ? [PRIVATE_KEY] : [],
            chainId: 17000,
            saveDeployments: true,
        },
        amoy: {
            url: POLYGON_AMOY_RPC_URL,
            accounts: PRIVATE_KEY !== undefined ? [PRIVATE_KEY] : [],
            chainId: 80002,
            saveDeployments: true,
        },
        mainnet: {
            url: MAINNET_RPC_URL,
            accounts: PRIVATE_KEY !== undefined ? [PRIVATE_KEY] : [],
            chainId: 1,
            saveDeployments: true,
        },
        polygon: {
            url: POLYGON_MAINNET_RPC_URL,
            accounts: PRIVATE_KEY !== undefined ? [PRIVATE_KEY] : [],
            saveDeployments: true,
            chainId: 137,
        },
    },
    gasReporter: {
        enabled: REPORT_GAS,
        outputFile: "gas-report.txt",
        noColors: true,
        currency: "USD",
        coinmarketcap: COINMARKETCAP_API_KEY,
        token: "MATIC",
    },
    solidity: {
        version: "0.8.19",
        settings: {
            optimizer: {
                enabled: true,
                runs: 200,
            },
        },
    },
    plugins: ["hardhat-contract-sizer"],
    namedAccounts: {
        deployer: {
            default: 0, // here this will by default take the first account as deployer
            1: 0, // similarly on mainnet it will take the first account as deployer. Note though that depending on how hardhat network are configured, the account 0 on one network can be different than on another
        },
        player: {
            default: 1,
        },
    },
    mocha: {
        timeout: 400000,
    },
    etherscan: {
        apiKey: {
            sepolia: ETHERSCAN_API_KEY,
            holesky: ETHERSCAN_API_KEY,
            mainnet: ETHERSCAN_API_KEY,
            polygon: POLYGON_API_KEY,
            amoy: POLYGON_API_KEY,
        },
    },
}
