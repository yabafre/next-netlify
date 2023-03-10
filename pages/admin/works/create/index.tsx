import React, { useEffect, useState } from 'react'
import Link from "next/link"
import { CldUploadWidget } from 'next-cloudinary';
import process from "process";

export default function CreateWork(){
    const [ message, setMessage ] = useState("");
    const [workCreate, setWorkCreate] = useState({
        title: "",
        seo: { title: "", description: "" },
        slug: "",
        coverImage: "",
        description: "",
    });

    const [ isLoading, setIsLoading ] = useState(false);

    const postWork = () => {
        setIsLoading(true);
        fetch(`/api/works`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(workCreate),
        })
            .then((response) => response.json())
            .then((json) => {
                setMessage(json.message);
                setIsLoading(false);
            });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setWorkCreate((prev) => ({
            ...prev,
            title: id === 'title' ? value : prev.title,
            description: id === 'description' ? value : prev.description,
            slug: id === 'slug' ? value : prev.slug,
            coverImage: id === 'coverImage' ? value : prev.coverImage,
            seo: {
                ...prev.seo,
                title: id === 'seo.title' ? value : prev.seo.title,
                description: id === 'seo.description' ? value : prev.seo.description,
            },
        }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        postWork();
    };


    // if(!isLoading){
    //     return <> <h2>Chargement</h2></>
    // }



    // @ts-ignore
    return (
        <>
            <header className="w-full px-[5vw] pt-[15vw] flex justify-between items-end mb-[5vw]">
                <h1 className="text-7xl font-semibold uppercase w-fit max-w-[80%]">Création dun projet</h1>
                <Link href="/admin/works" className="btn-admin"><ion-icon name="list-outline"></ion-icon></Link>
            </header>

            {message && <p id="message">{JSON.stringify(message)}</p>}

            <section className="w-full px-[5vw] pb-[5vw]">

                <form onSubmit={handleSubmit} className="flex flex-col pl-[50px]">
                    <input type="text" id="title" name="title" placeholder="Titre du projet" value={workCreate.title} onChange={handleChange}  className="border-b-2 border-black mb-[20px] w-[50%] py-[10px] px-[20px]"/>
                    <input type="text" id="seo.title"  placeholder="Titre seo du projet" value={workCreate.seo.title} onChange={handleChange}  className="border-b-2 border-black mb-[20px] w-[50%] py-[10px] px-[20px]"/>
                    <textarea id="seo.description" placeholder="Description seo du projet" value={workCreate.seo.description} onChange={handleChange} className="border-b-2 border-black mb-[20px] w-[50%] py-[10px] px-[20px]"></textarea>
                    <input type="text" id="slug" name="slug" placeholder="Slug du projet" value={workCreate.slug} onChange={handleChange}  className="border-b-2 border-black mb-[20px] w-[50%] py-[10px] px-[20px]"/>
                    <CldUploadWidget uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
                                     onUpload={(res: { info: { secure_url: any; }; }) => {
                                         console.log('res : ',res.info)
                                         setWorkCreate((prev) =>
                                             ({ ...prev, coverImage: res.info.public_id })) }

                                     }>
                        {({ open }) => {
                            function handleOnClick(e: { preventDefault: () => void; }) {
                                e.preventDefault();
                                open();
                            }
                            return (
                                <button className="btn text-white bg-brightRed rounded-full baseline hover:bg-brightRedLight " onClick={handleOnClick}>
                                    Upload an Image
                                </button>
                            );
                        }}
                    </CldUploadWidget>
                    <textarea name="description" id="description" placeholder="Description du projet" value={workCreate.description} onChange={handleChange} className="border-b-2 border-black mb-[20px] w-[50%] py-[10px] px-[20px]"></textarea>
                    <button type="submit" className=" mb-[20px] w-fit h-fit py-[10px] px-[20px] bg-black text-white">Envoyer</button>
                </form>

            </section>
        </>
    )
}