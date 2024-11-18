import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import "@/styles/globals.css";
import Image from "next/image";
import Loader from "@/components/Loading/Loader.js";
import Bg from "@components/BG/bg";
import { AuthProvider } from "@context/AuthContext";
import { createTheme, ThemeProvider } from "@mui/material";
import Head from "next/head";

const theme = createTheme({
    typography: {
        fontFamily: ["Montserrat", "sans-serif"].join(","),
    },
});

export default function App({ Component, pageProps }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        let timer;
        const handleComplete = () => (timer = setTimeout(() => setLoading(false), 1000));
        const handleStart = () => {
            if (timer) {
                clearTimeout(timer);
            }
            setLoading(true);
        };

        router.events.on("routeChangeStart", handleStart);
        router.events.on("routeChangeComplete", handleComplete);
        router.events.on("routeChangeError", handleComplete);

        return () => {
            router.events.off("routeChangeStart", handleStart);
            router.events.off("routeChangeComplete", handleComplete);
            router.events.off("routeChangeError", handleComplete);
        };
    }, [router.events]);
    return (
        <main>
            <ThemeProvider theme={theme}>
                {/* <CssBaseline /> */}
                <AuthProvider>
                    <Bg />
                    {loading ? <Loader /> : <Component {...pageProps} />}
                </AuthProvider>
            </ThemeProvider>
        </main>
    );
}
