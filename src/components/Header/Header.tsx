import "tailwindcss/tailwind.css"
import { IconContext } from 'react-icons'
import { RiAccountCircleLine, RiLogoutBoxLine } from 'react-icons/ri'
import { useAuthContext } from "@/feature/auth/provider/AuthProvider"
import { getAuth, signOut } from "firebase/auth"
import { FirebaseError } from "firebase/app"
import { useState } from "react"
import { useRouter } from "next/router"

export const Header = () => {
    const { user } = useAuthContext();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { push } = useRouter();

    const handleSignOut = async () => {
        setIsLoading(true);
        try {
            const auth = getAuth();
            await signOut(auth);
            push('/signin')
        }
        catch (error) {
            if (error instanceof FirebaseError) {
                console.log(error);
            }
        }
        finally {
            setIsLoading(false);
        }
    }
    const UserIcon = () => {
        if (user) {
            return (
                <div className="flex flex-wrap justify-center">
                    <div className="w-8">
                        <img 
                            src="data:image/jpeg;base64,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cY6VtxU1Td5bxjjPXuv1rsacMwSRQRUEF+Wq3GPm79QFoI6rlwHipZkXK8WG0jKdgGtqh0juL5COc4oN5RUrYmNjYNVrGhjR0ACwXNZZRBiyyiICIiAiIgIiIC4aqBsjHMcLhzSwg9BFj81zLDkER0Y1B9D9HPtUs0lGRxAidZn/AE2UvUKyx6jFMRp72EhhrAOtzTG63ewKaoCIiAiIgIiICIiAiIgIiICFEQU5mv1+aKKE7WxRtf5Pf8wFcYVO1n53R/o4/hOVxICIiAiIgIiICIiAiIgIUQoINWnksepzuE+HysPWYnhw8nFTlQHODtTGcHd0+lxn9aMH7FPkBERAREQEREBERAREQEREBERBTtZ+d0f6OP4TlcSpyr/O6P8ARx/CKuNAREQEREBERAREQEREBERBX2fzbE8HP+JmHiwBWCq20lP/AKzwcf4mQ+TR9qslAREQEREBERAREQEREBERAREKCmzz83bPcgF/8n/2CuRQWgylIzHJsSJHJvp2tb069g1zT3MB71OkBERAREQEREBERAREQFgrKFBV2kd2tjODMHB8rvNv/iVaKqnGwajM9IwXtT0zpT1XEn3tVrBAREQEREBERAREQEREBERAREQYAWURAREQEREBERAREQEREBYKyiCLYRlnk8RqsQebmUMjjHwsAu7xPyUpREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERB//2Q==" 
                            alt="..." 
                            className="shadow rounded-full max-w-full h-auto align-middle border-none" />
                    </div>
                </div>
            )
        }
        else {
            return (
                <IconContext.Provider value={{ color: '#ccc', size: '2rem'}}>
                    <RiAccountCircleLine/>
                </IconContext.Provider>
            )
        }
    }

    return (
        <div className="bg-white shadow-md px-4 lg:px-6 py-2.5">
            <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                <a href="#" className="flex items-center">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" className="mr-3 h-6 sm:h-9" alt="Flowbite Logo" />
                    <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">React Chat App</span>
                </a>
                <div className="flex items-center lg:order-2">
                    {user && (
                        <button 
                            type="button" 
                            className="rounded-full w-8 mr-3"
                            onClick={handleSignOut}
                        >
                            <IconContext.Provider value={{ color: '#ccc', size: '2rem' }}>
                                <RiLogoutBoxLine/>
                            </IconContext.Provider>
                        </button>
                    )}
                    <a href="#" className="focus:ring-gray-300">
                        <UserIcon />
                    </a>
                </div>
            </div>
        </div>
    )
}