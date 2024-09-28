import Head from "next/head"
import { ManualHeader, Header, LotteryEntrance, Main, Footer } from "../components/index"
import { useState } from "react"

import Image from "next/image"
import images from "@/images/index"

export default function Home() {
    return (
        <section className="App ">
            <Head>
                <title> CryptoWager </title>
                
            </Head>
            <Header />
            {/* <ManualHeader walletModal={walletModal} setWalletModal={setWalletModal} /> */}
            {/* <LotteryEntrance /> */}
            <Main/>
            <Footer />
        </section>
    )
}
