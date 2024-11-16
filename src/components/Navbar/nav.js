import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useAuth } from "@context/AuthContext";
import axios from "axios";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Nav = () => {
    const { setIsLoggedIn, user, isLoggedIn, setUser } = useAuth();
    const [toggleDropDown, setToggleDropDown] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const logoutApiUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/logout`;
    const checkAuthUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/login`;
    const participantDataApi = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/participant/`;
    const router = useRouter();

    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                const config = {
                    withCredentials: true,
                };

                const authResponse = await axios.get(checkAuthUrl, config);

                if (authResponse.status === 200) {
                    try {
                        const userResponse = await axios.get(participantDataApi, config);
                        if (userResponse.status === 200) {
                            setUser(userResponse.data.data);
                            setIsLoggedIn(true);
                        }
                    } catch (userError) {
                        console.error("Failed to fetch user data:", userError);
                        handleAuthError();
                    }
                } else {
                    handleAuthError();
                }
            } catch (error) {
                handleAuthError();
            } finally {
                setIsLoading(false);
            }
        };

        const handleAuthError = () => {
            setIsLoggedIn(false);
            setUser(null);
            // Only redirect to login if we're on a protected route
            if (router.pathname === "/levels" || router.pathname === "/leaderBoard") {
                router.push("/login");
            }
        };

        checkAuthStatus();
    }, [router.pathname, setIsLoggedIn, setUser]);

    const handleLogout = async () => {
        try {
            console.log(isLoggedIn);
            const response = await axios.get(logoutApiUrl, {
                withCredentials: true,
            });

            console.log(response);

            if (response.status === 200 && response.data.success) {
                console.log("entered");
                setIsLoggedIn(false);
                setUser(null);
                setToggleDropDown(false);

                toast.success(response.data.message || "Logout successful");

                router.push("/login");
            } else {
                throw new Error(response.data.message || "Logout failed");
            }

            // console.log("After api called", isLoggedIn);
        } catch (error) {
            console.error("Logout error:", error);
            toast.error(error.response?.data?.message || "Logout failed. Please try again.");
        }
    };

    if (isLoading) {
        return (
            <nav className="flex-between w-full ml-2 pr-8 pt-0.5 gap-2 z-50">
                <Link href="/">
                    <Image
                        src="/assets/icons/typeface_nav.svg"
                        alt="NJATH Logo"
                        width={180}
                        height={50}
                        className="object-contain mx-1 ml-2.5"
                    />
                </Link>
            </nav>
        );
    }

    return (
        <>
            <ToastContainer autoClose={2000} />
            <nav className="flex-between w-full ml-2 pr-8 pt-0.5 gap-2 z-50">
                <Link href="/">
                    <Image
                        src="/assets/icons/typeface_nav.svg"
                        alt="NJATH Logo"
                        width={180}
                        height={50}
                        className="object-contain mx-1 ml-2.5"
                    />
                </Link>

                {/* Desktop Navigation */}
                <div className="max-lg:hidden flex">
                    {isLoggedIn && user ? (
                        <div className="flex-end gap-0">
                            <Link href="/levels" className="outline_btn">
                                Levels
                            </Link>
                            <Link href="/leaderBoard" className="outline_btn">
                                Leaderboard
                            </Link>
                            <button onClick={handleLogout} className="outline_btn">
                                Log Out ({user.username || ""})
                            </button>
                        </div>
                    ) : (
                        <div className="flex-end gap-3">
                            <Link href="/login" className="outline_btn">
                                Login
                            </Link>
                            <Link href="/register" className="black_btn">
                                Register
                            </Link>
                        </div>
                    )}
                </div>

                {/* Mobile Navigation */}
                <div className="lg:hidden flex relative">
                    <div className="flex">
                        <Image
                            src="/assets/icons/pajamas_hamburger.svg"
                            width={37}
                            height={37}
                            className="px-1.5 mx-1 fill-njathgold cursor-pointer"
                            alt="profile"
                            onClick={() => setToggleDropDown((prev) => !prev)}
                        />
                    </div>
                    {isLoggedIn && user ? (
                        <>
                            {toggleDropDown && (
                                <div className="dropdown mr-3">
                                    <Link
                                        href="/levels"
                                        className="dropdown_link border_outline_btn w-full hover:text-white font-bold"
                                        onClick={() => setToggleDropDown(false)}
                                    >
                                        Levels
                                    </Link>

                                    <Link
                                        href="/leaderBoard"
                                        className="dropdown_link border_outline_btn w-full hover:text-white font-bold"
                                        onClick={() => setToggleDropDown(false)}
                                    >
                                        Leaderboard
                                    </Link>
                                    <button
                                        type="button"
                                        onClick={handleLogout}
                                        className="w-full black_btn hover:bg-njathbg hover:text-white"
                                    >
                                        Log Out
                                    </button>
                                </div>
                            )}
                        </>
                    ) : (
                        <>
                            {toggleDropDown && (
                                <div className="dropdown mr-3">
                                    <Link
                                        href="/login"
                                        className="dropdown_link w-full border_outline_btn hover:text-white"
                                        onClick={() => setToggleDropDown(false)}
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        href="/register"
                                        className="dropdown_link mt-1 w-full black_btn hover:bg-njathbg hover:text-white"
                                        onClick={() => setToggleDropDown(false)}
                                    >
                                        Register
                                    </Link>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </nav>
        </>
    );
};

export default Nav;
