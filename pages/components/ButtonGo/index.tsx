import {FC, useEffect} from "react";
import Link from "next/link";


const ButtonGo: FC = () => {

    useEffect(() => {

    }, []);


    return (
            <div className="button__triangle">
                <span className="coin__side-1"></span>
                <span className="coin__side-2"></span>
                <span className="coin__side-3"></span>
                <Link href={`/admin/works`} className="button__triangle__text">Project</Link>
            </div>
    )
}

export default ButtonGo;