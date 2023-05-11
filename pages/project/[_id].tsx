import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from "next/link"
import { CldImage } from 'next-cloudinary'
import { useSession } from 'next-auth/react'
import { Fragment } from 'react';


export default function CreateWork(){
    const { data: connect } = useSession();
    const router = useRouter();
    const { _id } = router.query

    const [ workLoad, setWorkLoad] = useState({
        title: "",
        seo: { title: "", description: "" },
        slug: "",
        coverImage: "",
        description: "",
    });

    const [ isLoading, setIsLoading ] = useState(false);

    const getWork = () => {
        fetch(`/api/works/${_id}`, { method: "GET"})
            .then(response => response.json())
            .then((json) => {
                setWorkLoad(json.works)
                setIsLoading(false)
            })
            .catch((error) => {
                console.log(error);
            })
    }

    useEffect(() => {
        if(_id){
            getWork()
        }
    }, [_id])



    if(isLoading){
        return <> <h2>Chargement</h2></>
    }

    if(workLoad){
        return (
            <>
                <Fragment>
                    <div className="w-full p-[5vw] pb-[0vw] flex justify-between items-end mx-auto">
                        <div className="flex w-full">
                            <Link href="/admin/works" className="btn__return flex justify-center items-center ">
                                <img src="/back.svg" alt="Retour" className="w-6 h-6 mr-2"/>
                            </Link>
                            <h1 className="whitespace-nowrap max-sm:text-6xl text-7xl uppercase font-semibold align-middle flex items-center ">
                                <span className="title  ">&nbsp;{workLoad.title}&nbsp;</span>
                            </h1>
                        </div>
                    </div>
                    <div className="py-8 px-6 lg:px-12 mx-auto">
                        <div className="lg:flex lg:flex-row lg:justify-center lg:items-center">
                            {workLoad.coverImage && (
                                <div className="lg:w-1/3 lg:mr-12 mb-4 lg:mb-0">
                                    <CldImage className="rounded-lg shadow-lg" width={200} height={200} alt={workLoad.title} src={workLoad.coverImage} />
                                </div>
                            )}

                            <div className="lg:w-2/3">
                                <h1 className="text-4xl font-bold mb-4">{workLoad.title}</h1>
                                <p className="text-lg mb-4">{workLoad.seo.description}</p>
                                {/*<div className="flex items-center text-gray-500 text-sm">*/}
                                {/*    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">*/}
                                {/*        <path fillRule="evenodd" d="M17.293 2.293a1 1 0 0 1 1.414 0l.707.707a1 1 0 0 1 0 1.414L3.414 18.414a1 1 0 0 1-1.414 0l-.707-.707a1 1 0 0 1 0-1.414L17.293 2.293zM8 10a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0-7a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" clipRule="evenodd" />*/}
                                {/*    </svg>*/}
                                {/*    <span>{workLoad.slug}</span>*/}
                                {/*</div>*/}
                            </div>
                        </div>
                    </div>

                    <div className="py-8 px-6 lg:px-12 mx-auto">
                        <div className="lg:flex lg:flex-row lg:justify-center lg:items-center mx-auto">
                            <div className="lg:w-1/3 lg:mr-12 mb-4 lg:mb-0">
                                <div className=" rounded-lg shadow-lg p-4">
                                    <h2 className="text-lg font-bold mb-2">Description</h2>
                                    <p className="text-sm">{workLoad.description}</p>
                                </div>
                            </div>
                            {/*<div className="lg:w-2/3 mx-auto">*/}
                            {/*    <div className=" rounded-lg shadow-lg p-4">*/}
                            {/*        <h2 className="text-lg font-bold mb-2">SEO</h2>*/}
                            {/*        <div className="flex items-center text-gray-500 text-sm mb-2">*/}
                            {/*            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">*/}
                            {/*                <path fillRule="evenodd" d="M17.293 2.293a1 1 0 0 1 1.414 0l.707.707a1 1 0 0 1 0 1.414L3.414 18.414a1 1 0 0 1-1.414 0l-.707-.707a1 1 0 0 1 0-1.414L17.293 2.293zM8 10a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0-7a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" clipRule="evenodd" />*/}
                            {/*            </svg>*/}
                            {/*            <span>{workLoad.seo.title}</span>*/}
                            {/*        </div>*/}
                            {/*        <div className="text-sm mb-2">{workLoad.seo.description}</div>*/}
                            {/*        <div className="text-sm">{workLoad.slug}</div>*/}
                            {/*    </div>*/}
                            {/*</div>*/}
                        </div>
                    </div>
                </Fragment>
            </>
        )
    }
}
