import { AuthGuard } from "@/feature/auth/AuthGuard/AuthGuard";
import { NextPage } from "next";
import "tailwindcss/tailwind.css"

const Page: NextPage = () => {
    return (
        <AuthGuard>
            <div className="font-bold text-center text-lg">Tailwind CSS</div>
        </AuthGuard>
    )
}

export default Page;