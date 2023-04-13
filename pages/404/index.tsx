import Head from "next/head";
import Image from "next/image";

export default function Page404() {
    return (
        <>
            <Head>
                <title>404 Error | Portfolio</title>
                <meta name="description" content="Page not found" />
            </Head>
            <main className="h-screen flex justify-center items-center">
                <div className="flex flex-col items-center text-center">
                    <h1 className="text-4xl font-bold mb-4 text-red-600">Loose Error</h1>
                    <p className="text-gray-600 mb-4">
                        The page you are looking for might have been removed, had its name
                        changed, or is temporarily unavailable.
                    </p>
                    <Image src="/404.gif" alt="404 Error" width={500} height={330}/>
                    <p className="text-gray-600 mt-4">
                        Please return to the{" "}
                        <a className="text-red-600" href="/">
                            Home Page
                        </a>
                    </p>
                </div>
            </main>
        </>
    );
}