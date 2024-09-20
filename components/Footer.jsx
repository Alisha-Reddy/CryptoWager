import Image from "next/image"
import images from "@/images/index"
import { Facebook, Instagram, Github, Linkedin } from "../components/index"

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
        <footer style={{ background: "#000014", color: "white" }}>
            <div className="flex items-center mt-3 mb-0">
                <div className=" items-center gap-x-3 flex">
                    <Image className="w-6 rounded-full" src={images.logo} alt="logo" />
                    <p className="name text-2xl text-yellow-200 ">C r y p t o W a g e r</p>
                </div>
            </div>
            <div className="flex flex-col items-center justify-center  ">
                <h1 className="text-2xl font-bold mb-3 mt-0 text-yellow-200">You can find me at</h1>
                <ul className="flex gap-2 mb-3">
                    <li>
                        <a href="https://www.linkedin.com/in/alishaReddyKondapu/">
                            <Linkedin />
                        </a>
                    </li>
                    <li>
                        <a href="https://github.com/Alisha-Reddy">
                            <Github />
                        </a>
                    </li>
                    <li>
                        <Facebook />
                    </li>
                    <li>
                        <Instagram />
                    </li>
                </ul>
            </div>
            <div
                className=" text-center py-2 "
                style={{ background: "#eaeffc", color: "#000014", fontWeight: "bold" }}
            >
                <p>Copyright © 2024; Designed by ALISHA REDDY KONDAPU.</p>
            </div>
        </footer>
    )
}
