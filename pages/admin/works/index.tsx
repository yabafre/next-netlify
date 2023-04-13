import { GetServerSideProps } from 'next'
import { IWork } from '@/@types/work'
import { NextPage } from "next"
import Link from "next/link"
import { useEffect, useState } from 'react'
import { CldImage } from 'next-cloudinary';
import {session} from "next-auth/core/routes";
import { signOut, useSession } from 'next-auth/react'




type Props = {
    work: IWork[];
}

export default function Works({ work }: Props){
    const [ message, setMessage ] = useState("");
    const [ works, setWorks ] = useState<IWork[] | null>(null);
    const [ isLoading, setIsLoading ] = useState(false);
    const { data: session } = useSession();




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
                {session?(
                    <><Link href="/admin/works/create">Créer</Link>
                    </>
                ):(<></>)
                }

                {message && <p>{message}</p>}

                <section className="w-full px-[5vw] pb-[5vw] sm:w-[74vw]">
                    <div className=" text__head__loop flex flex-row justify-center items-center">
                        <span className="text__head">Fullstack Développer! </span>
                        <span className="text__head">Fullstack Développer! </span>
                        <span className="text__head">Fullstack Développer! </span>
                        <span className="text__head">Fullstack Développer! </span>
                        <span className="text__head">Fullstack Développer! </span>
                    </div>
                    <div className="w-full box-border grid lg:grid-cols-2 h-[73vh] sm:grid-cols-1">
                        <div className="w-full h-full flex flex-col justify-center items-center">
                            <h1 className="text-4xl mb-2.5">Mes travaux</h1>
                        </div>
                        <div className="mostly-customized-scrollbar contain-cards w-full h-full flex flex-col items-center gap-2.5">
                            {works.map((work) => (
                                <div key={work._id} className="form__card__works parent-contain">
                                    <span className="card__works coint-1"></span>
                                    <span className="card__works coint-2"></span>
                                    <span className="card__works coint-3"></span>
                                    <span className="card__works coint-4"></span>
                                    <div className="flex flex-row gap-2.5">
                                        <Link className={'form__card__works__text'} href={`/admin/works/${work._id}`}>
                                            <h2 className="text-lg mb-2.5">{work.title}</h2>
                                            <p className="text-sm">{work.description}</p>
                                            <div className="w-11/12 h-[200px]">
                                                <CldImage width={200} height={200} src={work.coverImage} alt={work.title} />
                                            </div>
                                        </Link>
                                    </div>
                                    {session?(
                                        <><div>
                                            <Link href={`/admin/works/update/${work._id}`}>Modifier</Link>
                                            <button onClick={() => deleteWork(work._id)}>Supprimer</button>
                                        </div>
                                        </>
                                    ):(<></>)
                                    }
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

            </>
        )
    }
}