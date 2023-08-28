import { Header } from "@/components/Header/Header";
import { AuthProvider } from "@/feature/auth/provider/AuthProvider";
import { initializeFirebaseApp } from "@/lib/firebase/firebase";
import { getApp } from "firebase/app";
import type { AppProps } from "next/app";

initializeFirebaseApp()
const MyApp = ({ Component, pageProps}: AppProps) => {
    console.log(getApp())
    return (
        <AuthProvider>
            <Header />
            <Component {...pageProps} />
        </AuthProvider>
    )
}

export default MyApp;