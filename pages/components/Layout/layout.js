// Libs
import PropTypes from "prop-types"
import Head from "next/head";
import Acceuil from "@/pages/components/Acceuil";
import Cursor from "@/pages/components/Cursor";
import Link from "next/link";

// Components



export function Layout({ children: pageContent }) {
    return <div>
        <Head>
            <title>AstroTeams</title>
            <meta name="description" content="Portfolio" />
            <link rel="icon" href="/favicon.ico" />
        </Head>

        <Acceuil></Acceuil>
            {pageContent}
        <footer className="footer max-w-full sm:flex justify-between sm:items-center">
                <Link className={"text-white-600 hover:text-primary-900 dark:text-white-400 dark:hover:text-primary focus:outline focus:outline-2 focus:rounded-sm focus:outline-primary"} href={`/admin/works`}>Projects</Link>
        </footer>
        <Cursor></Cursor>
    </div>
}

Layout.propTypes = {
    /**
     * Page content
     */
    children: PropTypes.node.isRequired,
}