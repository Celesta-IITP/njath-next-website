import React from "react";
import Nav from "@components/Navbar/nav";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import Image from "next/image";
import Link from "next/link";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import YouTubeIcon from "@mui/icons-material/YouTube";
import Bg from "@components/BG/bg";
import Head from "next/head";


export default function Landing() {
    return (
        <div className="font-montserrat p-0 m-0 w-full">
            <Head>
        <title>NJATH - Not Just Another Treasure Hunt</title>
      </Head>
            <Nav />
            <Bg/>
            <ToastContainer autoClose={2000} />
            {/* <div className="app-background" /> */}
            <div className="flex-center mt-20 flex-col w-full">
                <Image
                    src="/assets/Typeface.svg"
                    width={448.26}
                    height={231}
                    className="w-80 lg:w-96"
                    alt="Njath"
                />
                <p className="font-bold text-xs text-center mt-3 tracking-wider lg:tracking-widest ">
                    NOT JUST ANOTHER TREASURE HUNT
                </p>
                <p className="mt-24 font-bold tracking-wide">What is NJATH?</p>
                <p className="text-sm mt-4 w-7/12 text-center tracking-normal" style={{minWidth: 250}}>
                    NJATH(Not Just Another Treasure Hunt) is a Solo Online Treasure Hunt contest
                    where you go on tackling questions to uncover the hidden solutions!
                </p>
                <Image
                    src="/assets/treasure_box.svg"
                    width={616}
                    height={416}
                    className="rounded-full -mt-6"
                    alt=""
					priority={4}
                />
                <div className="flex-row flex-center -mt-8">
                    <Link href="/register" className="black_btn" style={{marginRight: "max(2.5vw, 5px)"}}>
                        Register
                    </Link>
                    <Link href="https://drive.google.com/file/d/1zN0tMul6S6pUM0fHFYZrnDqNW_usyIJo/view?usp=sharing" className="border_outline" style={{marginLeft: "max(2.5vw, 5px)", borderRadius: 10}}>
                        Rulebook
                    </Link>
                </div>
                <div className="bg-njathbg footer flex justify-evenly pt-16 pb-8 border-top border-t-2 border-njathgold/50 w-full h-1/2 px-5 max-md:px-2 mt-10 items-start">
                    <div className="flex-column gap-6 self-start">
                        <img
                            src="https://github.com/melencholicmice/Reverberance2022/assets/99478938/d0aadcea-5018-4f9f-b585-007e0484c54a"
                            alt="Celesta-Icon"
                        />
                        <p className="font-medium mt-4">Contact:</p>
                        <Link
                            className="font-light mt-3 text-xs"
                            href="mailto:celesta.iitp@gmail.com"
                        >
                            celesta.iitp@gmail.com
                        </Link>

                        <div className="flex-start gap-3 mt-4">
                            <Link href="https://www.facebook.com/CelestaIITP">
                                <FacebookIcon />
                            </Link>
                            <Link href="https://www.instagram.com/celestaiitp_official/">
                                <InstagramIcon />
                            </Link>
                            <Link href="https://twitter.com/celesta_iitp" className="mt-1">
                                <Image
                                    src="/assets/Vector.svg"
                                    width={20}
                                    height={20}
                                    alt="X-icon"
                                />
                            </Link>
                            <Link href="https://www.linkedin.com/company/celesta-iit-patna/">
                                <LinkedInIcon />
                            </Link>
                            <Link href="https://youtube.com/c/CelestaIITPatna">
                                <YouTubeIcon />
                            </Link>
                        </div>
                    </div>
                    <div className="self-start max-md:hidden mr-5 ml-5">
                        <Image
                            src="/assets/Exploring-The-Epochs.png"
                            width={347.36}
                            height={179}
                            alt="Njath"
                        />
                    </div>
                    <div className="self-start">
                        <p className="font-bold">Direct Links:</p>
                        <br />
                        <Link
                            href="https://drive.google.com/file/d/1zN0tMul6S6pUM0fHFYZrnDqNW_usyIJo/view?usp=sharing"
                            className="text-sm"
                        >
                            NJATH Rulebook
                        </Link>
                        <br />
                        <Link href="https://celesta.iitp.ac.in/" className="text-sm">
                            {" "}
                            Celesta Official Website{" "}
                        </Link>
                    </div>
                </div>
            </div>

            {/* <div className="flex-center my-10">
                <p>What is NJATH?</p>
            </div> */}
        </div>
    );
}
