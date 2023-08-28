import { FormEvent, useState } from 'react'
import {
    createUserWithEmailAndPassword,
    getAuth,
    sendEmailVerification,
} from 'firebase/auth'
import { FirebaseError } from '@firebase/util'
import "tailwindcss/tailwind.css"

export const Page = () => {

    const signupResult = {
        message : '',
        isSuccess : true
    }

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [result, setResult] = useState(signupResult);

    const handleSubmit = async (elem: FormEvent<HTMLFormElement>) => {
        console.log({ email, password });
        elem.preventDefault();
        try {
            const auth = getAuth();
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            )
            await sendEmailVerification(userCredential.user)

            setResult({message : '確認メールを送信しました', isSuccess : true})
            setEmail('')
            setPassword('')
        }
        catch(e) {
            if (e instanceof FirebaseError) {
                setResult({message : e.message, isSuccess : false});
                console.log(e)
            }
        }
    }

    const onChangeEmail = (e: any) => {
        setEmail(e.target.value);
    }

    const onChangePassword = (e: any) => {
        setPassword(e.target.value);
    }

    return (
        <div className='py-8'>
            <form className='max-w-sm mx-auto rounded shadow-lg px-6 pt-6 pb-8' onSubmit={handleSubmit}>
                <div className='px-6 py-4'>
                    <p className='font-bold text-center text-2xl'>サインアップ</p>
                </div>
                {result.message != '' && (
                    <div className='mb-4'>
                        {result.isSuccess  && (<p className='text-green-700'>{result.message}</p>)}
                        {!result.isSuccess && (<p className='text-red-700'>{result.message}</p>)}
                    </div>
                )}
                <div className='mb-4'>
                    <label className='block text-grey-700 text-sm font-bold mb-2'>メールアドレス</label>
                    <input 
                        className='shadow border rounded w-full py-2 px-3 text-gray-700'
                        id="email"
                        type="email"
                        placeholder="メールアドレス"
                        value={email}
                        onChange={onChangeEmail}
                    />
                </div>
                <div className='mb-4'>
                    <label className='block text-grey-700 text-sm font-bold mb-2'>パスワード</label>
                    <input 
                        className='shadow border rounded w-full py-2 px-3 text-gray-700'
                        id="password"
                        type="password"
                        placeholder="パスワード"
                        value={password}
                        onChange={onChangePassword}
                    />
                </div>
                <div className='flex justify-center'>
                    <button 
                        className="bg-gray-200 hover:bg-gray-300 rounded-full px-8 py-2 text-grey-700 font-bold"
                        type='submit'
                    >サインアップ</button>
                </div>
            </form>
        </div>
    );
}

export default Page;