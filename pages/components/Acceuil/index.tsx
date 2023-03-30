import { FC } from 'react';
import Link from "next/link";
import { signOut, useSession } from 'next-auth/react'

const Acceuil: FC = () => {
    const { data: session } = useSession();

    return (
        <>
            <div className="max-w-full sm:flex justify-between sm:items-center p-6">
                <h3 className="text__into__jop">Contact</h3>
                <Link className="text__into__jop" href={'/'}>Home</Link>
                <div className="flex justify-center items-center">
                    &nbsp;
                    {session ? (
                        <button onClick={() => signOut(
                            { callbackUrl: '/' }
                        )}>Sign out</button>
                    ) : (
                        <Link className={"text-white-600 hover:text-primary-900 dark:text-white-400 dark:hover:text-primary focus:outline focus:outline-2 focus:rounded-sm focus:outline-primary"} href={`/api/auth/signin/crendentials`}>Sign in</Link>
                    )}
                </div>
            </div>
            </>
    )
}

export default Acceuil;
