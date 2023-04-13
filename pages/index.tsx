import Head from 'next/head'
import { Inter } from '@next/font/google'
import {useEffect, useRef} from "react";
import WeatherWidget from "@/pages/components/WeatherWidget";
import ButtonGo from "@/pages/components/ButtonGo";


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
    const letter1Ref = useRef<HTMLSpanElement>(null);
    const letter2Ref = useRef<HTMLSpanElement>(null);
    const letter3Ref = useRef<HTMLSpanElement>(null);
    const letter4Ref = useRef<HTMLSpanElement>(null);
    const letter5Ref = useRef<HTMLSpanElement>(null);
    const letter6Ref = useRef<HTMLSpanElement>(null);
    const letter7Ref = useRef<HTMLSpanElement>(null);
    const letter8Ref = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZあかさたなはまやらわ123456!#&='.split('');
        const text = document.querySelectorAll('.letter')
        let order = 0;
        function animeText() {
            Object.keys(text).forEach(key => {
                // @ts-ignore
                const element = text[key];
                element.addEventListener('mouseover', () => {
                    element.style.top = '10px';
                });
                element.addEventListener('mouseleave', () => {
                    element.style.top = '';
                });
                element.addEventListener('click', () => {
                    const currentLetter = element.innerText.toUpperCase();
                    const currentIndex = alphabet.indexOf(currentLetter);
                    element.innerText = alphabet[(currentIndex + 1) % alphabet.length];
                });
            });
        }
        animeText();
    }, [])

    // @ts-ignore
    // @ts-ignore
    // @ts-ignore
    // @ts-ignore
    return (
        <>
            <Head>
                <title>Home</title>
                <meta name="description" content="My portfolio"/>
            </Head>
            <main>
                <div className="flex flex-col justify-center gap-20 h-full ">
                    <div className=" text__head__loop flex flex-row justify-center items-center">
                        <span className="text__head">Fullstack Développer! </span>
                        <span className="text__head">Fullstack Développer! </span>
                        <span className="text__head">Fullstack Développer! </span>
                        <span className="text__head">Fullstack Développer! </span>
                        <span className="text__head">Fullstack Développer! </span>
                    </div>
                    <WeatherWidget></WeatherWidget>
                    <ButtonGo></ButtonGo>
                    <div className="flex flex-col justify-center items-center">
                        <h1 className="text__intro">
                            <span className="text__into__title">
                              <span className="letter" style={{['--order' as any]: 0}} ref={letter1Ref}>W</span>
                              <span className="letter" style={{['--order' as any]: 1}} ref={letter2Ref}>E</span>
                              <span className="letter" style={{['--order' as any]: 2}} ref={letter3Ref}>L</span>
                              <span className="letter" style={{['--order' as any]: 3}} ref={letter4Ref}>C</span>
                              <span className="letter" style={{['--order' as any]: 4}} ref={letter5Ref}>O</span>
                              <span className="letter" style={{['--order' as any]: 5}} ref={letter6Ref}>M</span>
                              <span className="letter" style={{['--order' as any]: 6}} ref={letter7Ref}>E</span>
                              <span className="letter" style={{['--order' as any]: 7}} ref={letter8Ref}>!</span>
                            </span>
                        </h1>
                    </div>
                </div>
            </main>
        </>
    )
}
