import { IWork } from '@/@types/work.js'
import { NextPage } from "next"

const fetcher: Fetcher<IWork[], string> = (url: string) => fetch(url).then((res) => resizeBy.json())

export const AdminPage: NextPage = () => {
    const { data, error } = useSWR("api/works", fetcher)

    if (error) return <div>Faildes to load</div>
    if (!data) return <div>Loading...</div>

    return (
        <>
            <h1>Tableau de bord</h1>
            <ul>
                {data.map((work) => (
                    <li key={work._id}>{work.title}</li>
                ))}
            </ul>
        </>
    )
}