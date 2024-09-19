import React, { useState } from "react"
import { ConnectButton } from "@rainbow-me/rainbowkit"
import { useAccount } from "wagmi"
import Image from "next/image"
import images from "@/images/index"
import { Close, Menu } from "../components/index"

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const { isConnected, address } = useAccount()
    const account = useAccount()

    const isLocalhost = account?.chainId === 31337

    const navigation = [
        { title: "Home", path: "/" },
        { title: "Learn More", path: "/learn-more" },
        { title: "About Me", path: "/about-us" },
        { title: "Contact", path: "/contact-us" },
        { title: "Feedback", path: "/contact-us" },
    ]

    const toggleMenu = (e) => {
        setIsMenuOpen((prev) => !prev)
    }

    return (
        <nav style={{ background: "#000014" }}>
            <div className={`p-5 flex mt-0 ${isMenuOpen ? "border-b-2" : ""}`}>
                <div className=" items-center gap-x-3 flex">
                    <Image className="w-12 rounded-full" src={images.logo} alt="logo" />
                    <p className="text-2xl font-serif font-bold text-yellow-200 ">CryptoWager</p>
                </div>

                <div className={`flex-1 hidden lg:flex  justify-center items-center mx-4  `}>
                    <ul className=" flex  justify-between items-center gap-x-1 ">
                        {navigation.map((item, id) => (
                            <li
                                key={id}
                                // className=" rounded-xl p-3 text-sm font-serif font-semibold"
                            >
                                <a href={item.path} className="block btn">
                                    {item.title}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="ml-auto py-2 px-4">
                    {isConnected && isLocalhost ? (
                        <button className="p-2 bg-white rounded-lg text-black ">
                            {address.slice(0, 6)}......{address.slice(-4)}{" "}
                        </button>
                    ) : (
                        <ConnectButton label="Connect wallet" style={{ background: "#000923" }} /> // Default connect button
                    )}{" "}
                </div>
            </div>
            {isMenuOpen ? (
                ""
            ) : (
                <div className=" lg:hidden grid grid-cols-2 border-y-2">
                    <div className=" p-2 ">
                        <button
                            onClick={() => toggleMenu()}
                            className="text-lg font-serif flex items-center gap-x-1"
                        >
                            {" "}
                            <Menu />
                            Menu
                        </button>
                    </div>
                </div>
            )}
            <div
                className={`lg:hidden menu-slide ${isMenuOpen ? "open w-64  p-4 rounded-md mt-28 ml-3" : "hidden"} fixed top-0 left-0 w-full h-full bg-gray-800 p-4`}
            >
                <div className="flex justify-end mb-4">
                    <button onClick={toggleMenu} className="">
                        {" "}
                        <Close></Close>
                    </button>
                </div>
                <ul className="flex flex-col  gap-y-4">
                    {navigation.map((item, id) => (
                        <li
                            key={id}
                            className="bg-yellow-950 rounded-xl p-3 text-sm font-serif font-semibold"
                        >
                            <a href={item.path} className="block">
                                {item.title}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    )
}

export default Header
