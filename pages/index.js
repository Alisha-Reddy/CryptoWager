import Head from "next/head"
import { ManualHeader, Header, LotteryEntrance, Footer } from "../components/index"
import { useState } from "react"

export default function Home() {
    return (
        <section>
            <Head>
                <title> Lottery dApp </title>
            </Head>
            <Header/>
            {/* <ManualHeader walletModal={walletModal} setWalletModal={setWalletModal} /> */}
            <LotteryEntrance />
            {/* <Footer/> */}
        </section>
    )
}
