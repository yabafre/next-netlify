// Libs
import PropTypes from "prop-types"
import Head from "next/head";
import { FC } from 'react';
import Acceuil from "@/pages/components/Acceuil";
import Cursor from "@/pages/components/Cursor";
import Link from "next/link";

// Components

interface Props{
    children: JSX.Element
}

const Layout: FC<Props> = ({ children }) => {
    return <div>
        <Head>
            <title>AstroTeams</title>
            <meta name="description" content="Portfolio" />
            <link rel="icon" href="/favicon.ico" />
        </Head>

        <Acceuil></Acceuil>
        <div className=" text__head__loop flex flex-row justify-center items-center">
            <span className="text__head">Fullstack Développer! </span>
            <span className="text__head">Fullstack Développer! </span>
            <span className="text__head">Fullstack Développer! </span>
            <span className="text__head">Fullstack Développer! </span>
            <span className="text__head">Fullstack Développer! </span>
        </div>
            {children}
        <footer className="footer max-w-full sm:flex justify-between sm:items-center mb-[5vh]">
                <Link className={"text-white-600 hover:text-primary-900 dark:text-white-400 dark:hover:text-primary focus:outline focus:outline-2 focus:rounded-sm focus:outline-primary"} href={`/admin/works`}>Projects</Link>
        </footer>
        <Cursor></Cursor>
    </div>
}

export default Layout

