import Image from "next/image"
// import images from "../Images/index"
import { Close } from "."

export default () => {
    const footerNavs = [
        {
            href: "#",
            name: "Terms",
        },
        {
            href: "#",
            name: "License",
        },
        {
            href: "#",
            name: "Privacy",
        },
        {
            href: "#",
            name: "About us",
        },
    ]

    return (
        <footer className="pt-10" style={{ background: "#000014" }}>
            <div className="max-w-screen-2xl mx-auto px-4 text-gray-200 md:px-8">
                <div className="justify-between sm:flex">
                    <div className="space-y-6">
                        <div className="flex items-center">
                            {/* <Image className="w-24 rounded-full" src={images.symbol} alt="logo" /> */}

                            <p className="text-2xl font-serif pl-2 text-white ">A L I S H A</p>
                        </div>{" "}
                        <p className="max-w-md">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore quod
                            tempora facilis velit laborum.
                        </p>
                        <ul className="flex felx-wrap items-center gap-4 text-sm sm:text-base">
                            {footerNavs.map((item, idx) => {
                                return (
                                    <li
                                        key={idx}
                                        className="text-gray-200 hover:text-white duration-150"
                                    >
                                        <a href={item.href}>{item.name}</a>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                    <div className="mt-6">
                        <p className="text-gray-200 font-semibold">Get the app</p>
                        <div className="flex items-center gap-3 mt-0 ">
                            <a href="#" className="mt-0 block sm:mt-3">
                                <Close></Close>
                            </a>
                            <a href="#" className="mt-0 block sm:mt-3">
                                <Close></Close>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="mt-1 py-10 border-t md:text-center">
                    <p>© 2024 Alisha Reddy Kondapu. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}
