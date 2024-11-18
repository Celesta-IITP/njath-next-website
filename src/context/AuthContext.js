import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import Loading from "@/components/Loading/Loading";

const AuthContext = createContext();

// Array of public routes that don't require authentication
const PUBLIC_ROUTES = ["/login", "/register", "/", "/about"];

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [unlockedQuestion, setUnlockedQuestion] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    const isPublicRoute = (path) => {
        return PUBLIC_ROUTES.some((route) => path === route || path.startsWith(`${route}/`));
    };

    useEffect(() => {
        const checkAuthAndFetchUser = async () => {
            const loginApiUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/login`;
            const participantDataApi = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/participant/`;

            const config = {
                withCredentials: true,
            };

            try {
                const loginResponse = await axios.get(loginApiUrl, config);

                if (loginResponse.status === 200) {
                    setIsLoggedIn(true);
                    try {
                        const userResponse = await axios.get(participantDataApi, config);
                        if (userResponse.status === 200) {
                            setUser(userResponse.data.data);
                        }
                    } catch (error) {
                        handleAuthError(error);
                    }
                }
            } catch (error) {
                handleAuthError(error);
            } finally {
                setIsLoading(false);
            }
        };

        const handleAuthError = (error) => {
            console.error("Auth error:", error);
            setIsLoggedIn(false);
            setUser(null);

            if (axios.isAxiosError(error) && error.response?.status === 401) {
                // Only redirect to login if we're on a protected route
                const currentPath = router.pathname;
                if (!isPublicRoute(currentPath)) {
                    toast.error("Please Log in First");
                    router.push("/login");
                }
            }
        };

        checkAuthAndFetchUser();
    }, [router.pathname]);

    // Protect routes that require authentication
    useEffect(() => {
        if (!isLoading) {
            const currentPath = router.pathname;
            if (!isPublicRoute(currentPath) && !isLoggedIn) {
                toast.error("Please Log in First");
                router.push("/login");
            }
        }
    }, [isLoading, isLoggedIn, router.pathname]);

    const value = {
        user,
        setUser,
        isLoggedIn,
        setIsLoggedIn,
        unlockedQuestion,
        setUnlockedQuestion,
        isLoading,
    };

    if (isLoading) {
        return <Loading />;
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
