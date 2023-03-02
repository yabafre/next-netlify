// Libs
import PropTypes from "prop-types"
import Head from "next/head";
import Acceuil from "@/pages/components/Acceuil";

// Components



export function Layout({ children: pageContent }) {
    return <div>
        <Head>
            <title>AstroTeams</title>
            <meta name="description" content="Eleven Labs Astro Teams" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <Acceuil></Acceuil>
            {pageContent}
        <footer>
            <div>Footer App</div>
        </footer>
    </div>
}

Layout.propTypes = {
    /**
     * Page content
     */
    children: PropTypes.node.isRequired,
}