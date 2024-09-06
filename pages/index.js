import Head from "next/head"
import { ManualHeader, Modal, LotteryEntrance } from "../components/index"
import { useState } from "react"

export default function Home() {
    const [walletModal, setWalletModal] = useState(false)
    return (
        <section>
            <Head>
                <title> Lottery dApp </title>
            </Head>
            <ManualHeader walletModal={walletModal} setWalletModal={setWalletModal} />
            <Modal walletModal={walletModal} setWalletModal={setWalletModal} />
        <LotteryEntrance/>
        </section>
    )
}
