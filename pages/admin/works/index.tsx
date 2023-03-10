import { GetServerSideProps } from 'next'
import { IWork } from '@/@types/work'
import { NextPage } from "next"
import Link from "next/link"
import { useEffect, useState } from 'react'
import { CldImage } from 'next-cloudinary';



type Props = {
    work: IWork[];
}

export default function Works({ work }: Props){
    const [ message, setMessage ] = useState("");
    const [ works, setWorks ] = useState<IWork[] | null>(null);
    const [ isLoading, setIsLoading ] = useState(false);




    useEffect(() => {
        fetch(`/api/works`)
            .then(response => response.json())
            .then((json) => {

                setWorks(json.works)
                setIsLoading(false)
            })
    }, [])

    const deleteWork = async(id: string) => {
        fetch(`/api/works/${id}`, { method: "DELETE" })
            .then(response => response.json())
            .then((json) => {

                setWorks(json.works)
                setMessage(`Le travail avec l'ID ${id} a été supprimé.`)
                setIsLoading(false)
            })


    }

    // if(!isLoading){
    //     return <> <h2>Chargement</h2></>
    // }


    if(works){
        return (
            <>
                <header>
                    <h1>Mes travaux</h1>
                </header>

                <Link href="/admin/works/create">Créer</Link>

                {message && <p>{message}</p>}

                <section className="w-full px-[5vw] pb-[5vw]">
                    <div className="w-full box-border grid grid-cols-3 gap-[20px]">
                        {works.map((work) => (
                            <div key={work._id} className="card">
                                <Link href={`/admin/works/${work._id}`}>
                                    <div className="w-full p-5 text-white bg-black/50">
                                        <h2 className="font-semibold text-lg mb-2.5">{work.title}</h2>
                                        <p className="text-sm">{work.description}</p>
                                    </div>
                                    <div className="w-full h-[200px]">
                                        <CldImage width={200} height={200} src={work.coverImage} alt={work.title} />
                                    </div>
                                </Link>
                                <div>
                                    <Link href={`/admin/works/update/${work._id}`}>Modifier</Link>
                                    <button onClick={() => deleteWork(work._id)}>Supprimer</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

            </>
        )
    }
}