import { FC } from 'react';
import Link from "next/link";

const Acceuil: FC = () => {
    return (
        <>
            <Link href={`/admin/works`}>List Project</Link>
        </>
    )
}

export default Acceuil;

{/*<form className=" max-w-md flex flex-col justify-center content-center items-center">*/}
{/*    <label htmlFor="name">Name</label>*/}
{/*    <input type="text" id="name" name="name" />*/}
{/*    <label htmlFor="email">Email</label>*/}
{/*    <input type="email" id="email" name="email" />*/}
{/*    <label htmlFor="message">Message</label>*/}
{/*    <textarea id="message" name="message" />*/}
{/*    <button type="submit">Send</button>*/}
{/*</form>*/}
