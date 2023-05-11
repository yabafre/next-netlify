import React, { FC } from 'react';
import {  useState, useEffect } from 'react'


const Contact: FC = () => {
    const [ courrier, setCourrier ] = useState({
        name: "",
        phone: "",
        email: "",
        sujet: "",
        message: ""
    });

    const [ message, setMessage ] = useState("");
    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                setMessage('');
            }, 5000);

            return () => {
                clearTimeout(timer);
            };
        }
    }, [message]);
    const [ error, setError ] = useState({
        name: "",
        phone: "",
        email: "",
        sujet: "",
        message: ""
    });

    const Textarea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        e.target.style.height = "auto";
        e.target.style.height = e.target.scrollHeight + "px";
    }

    const handleSubmit = (e: any) => {
        e.preventDefault()

        fetch(`/api/mail`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(courrier),
        })
            .then((response) => response.json())
            .then((json) => {

                if(json.error){
                    setError(json.error);
                } else {
                    setMessage(json.message);
                    setCourrier({
                        name: "",
                        phone: "",
                        email: "",
                        sujet: "",
                        message: ""
                    });
                }
            });
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {

        const { id, value } = e.target;
        setCourrier((prev) => ({
            ...prev,
            name: id === 'name' ? value : prev.name,
            phone: id === 'phone' ? value : prev.phone,
            email: id === 'email' ? value : prev.email,
            sujet: id === 'sujet' ? value : prev.sujet,
            message: id === 'message-contact' ? value : prev.message,
        }));
    };

    return (
        <>
            <div id="contact" className="w-full px-[5vw] py-[5vw]">

                <div className="flex my-7 w-full">
                    <h2 className="whitespace-nowrap text-2xl w-auto font-semibold text-white-700 align-middle flex items-center">
                        &nbsp;Contactez-moi !&nbsp;
                    </h2>
                    <span className="w-full flex items-center">
                        <svg className="letters letter1 h-6 w-6 text-orange-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M2 4a2 2 0 00-2 2v8a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2H2zm14.707 3.293l-5.5 5.5a1 1 0 01-1.414 0l-5.5-5.5A1 1 0 015.5 6h9a1 1 0 011.207 1.293z"></path>
                        </svg>
                        <svg className="letters letter2 h-6 w-6 text-orange-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M2 4a2 2 0 00-2 2v8a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2H2zm14.707 3.293l-5.5 5.5a1 1 0 01-1.414 0l-5.5-5.5A1 1 0 015.5 6h9a1 1 0 011.207 1.293z"></path>
                        </svg>
                        <svg className="letters letter3 h-6 w-6 text-orange-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M2 4a2 2 0 00-2 2v8a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2H2zm14.707 3.293l-5.5 5.5a1 1 0 01-1.414 0l-5.5-5.5A1 1 0 015.5 6h9a1 1 0 011.207 1.293z"></path>
                        </svg>
                    </span>
                </div>

                        {message &&
                    <div className="right-0 top-[8%] fixed mb-3 inline-flex w-fit items-center rounded-l-lg bg-green-400 px-6 py-5 text-white-500" role="alert">
                    <span className="mr-2">

                    </span>
                        <svg className="h-6 w-6 text-orange-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M2 4a2 2 0 00-2 2v8a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2H2zm14.707 3.293l-5.5 5.5a1 1 0 01-1.414 0l-5.5-5.5A1 1 0 015.5 6h9a1 1 0 011.207 1.293z"></path>
                        </svg>
                        <p className="text-sm font-semibold text-white">{message}</p>
                    </div>
                }

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-white-700 text-sm font-bold mb-2" htmlFor="name">
                            Nom
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                            id="name"
                            type="text"
                            placeholder="Votre nom"
                            value={courrier.name}
                            onChange={handleChange}
                            required
                        />
                        {error?.name &&
                            <div className="mb-3 inline-flex w-full items-center rounded bg-red-400 px-1 py-1 text-gray-500" role="alert">
                                <p id="message" className="courrier-error">{error.name}</p>
                            </div>
                        }
                    </div>
                    <div className="mb-4">
                        <label className="block text-white-700 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                            id="email"
                            type="email"
                            placeholder="Votre adresse e-mail"
                            value={courrier.email}
                            onChange={handleChange}
                            required
                        />
                        {error?.email &&
                            <div className="mb-3 inline-flex w-full items-center rounded bg-red-400 px-1 py-1 text-gray-500" role="alert">
                                <p id="message" className="courrier-error">{error.email}</p>
                            </div>
                        }
                    </div>
                    <div className="mb-4">
                        <label className="block text-white-700 text-sm font-bold mb-2" htmlFor="phone">
                            Phone
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                            id="phone"
                            type="number"
                            placeholder="Votre phone"
                            value={courrier.phone}
                            onChange={handleChange}
                            required
                        />
                        {error?.phone &&
                            <div className="mb-3 inline-flex w-full items-center rounded bg-red-400 px-1 py-1 text-gray-500" role="alert">
                                <p id="message" className="courrier-error">{error.phone}</p>
                            </div>
                        }
                    </div>
                    <div className="mb-4">
                        <label className="block text-white-700 text-sm font-bold mb-2" htmlFor="sujet">
                            Sujet
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                            id="sujet"
                            type="text"
                            placeholder="Quel est l'objet de votre message ?"
                            value={courrier.sujet}
                            onChange={handleChange}
                            required
                        />
                        {error?.sujet &&
                            <div className="mb-3 inline-flex w-full items-center rounded bg-red-400 px-1 py-1 text-gray-500" role="alert">
                                <p id="message" className="courrier-error">{error.sujet}</p>
                            </div>
                        }
                    </div>


                    <div className="mb-6">
                        <label className="block text-white-700 text-sm font-bold mb-2" htmlFor="message">
                            Message
                        </label>
                        <textarea
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                            id="message-contact"
                            placeholder="Votre message"
                            value={courrier.message}
                            onChange={(e) => {handleChange(e); Textarea(e);}}
                            required
                        />
                        {error?.message &&
                            <div className="mb-3 inline-flex w-full items-center rounded bg-red-400 px-1 py-1 text-gray-500" role="alert">
                                <p id="message" className="courrier-error">{error.message}</p>
                            </div>
                        }
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            className="btn__go"
                            type="submit"
                        >
                            Envoyer
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Contact;