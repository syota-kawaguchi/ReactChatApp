import { useAuthContext } from "../provider/AuthProvider";
import { useRouter } from "next/router";
import type { ReactNode } from "react";

type Props = {
    children: ReactNode
}

export const AuthGuard = ({ children }: Props) => {
    const { user } = useAuthContext();
    const { push } = useRouter();

    if (typeof user === 'undefined' ) {
        return (<div>読み込み中</div>)
    }

    if (user === null) {
        push('/signin')
        return null
    }

    return <>{ children }</>
}