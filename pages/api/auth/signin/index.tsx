import { log } from "console"
import { NextApiRequest, NextApiResponse} from "next"

const jwt = require('jsonwebtoken')

const {ADMIN_NAME, ADMIN_PASSWORD, JWT_SECRET_KEY } = process.env

type Data = {
    token?: string,
    error?: string
}


interface Credentials{
    username: string,
    password: string
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>){

    if(req.method === "POST"){
        try{
            const {username, password }: { username: string; password: string} = req.body
            

            if(username !== ADMIN_NAME || password !== ADMIN_PASSWORD ){
                throw new Error("Le login/ mot de passe ne correspond pas")

                const token = jwt.sign({}, JWT_SECRET_KEY, {
                    expiresIn: '2 days',
                })

                res.status(200).json({token: 'John Doe'})

            } 
        } catch (error){
            console.log("pages/api/auth/signin/index.ts > error >", error)
            res.status(400).json({ error: "Erreur pendant l'authentification"})
        }
    }
    
}

