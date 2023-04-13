/*
1) Install Courier SDK: npm install @trycourier/courier
2) Make sure you allow ES module imports: Add "type": "module" to package.json file
*/
import { CourierClient } from "@trycourier/courier";
import type { NextApiRequest, NextApiResponse } from 'next'


const courier = CourierClient({ authorizationToken: process.env.COURIER_API_KEY});

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const { name, phone, email, sujet, message } = req.body

    if (req.method === 'POST') {

        try{

            // Vérification que tous les champs sont remplie
            if (!name || !phone || !email || !sujet || !message){

                const nameError = !name ? "Veuillez saisir votre nom complet" : ""
                const phoneError = !phone ? "Veuillez saisir votre numéro de téléphone" : ""
                const emailError = !email ? "Veuillez saisir votre email" : ""
                const sujetError = !sujet ? "Veuillez saisir le sujet de votre message" : ""
                const messageError = !message ? "Veuillez saisir votre message" : ""

                const error = {name: nameError, phone: phoneError, email: emailError, sujet: sujetError, message: messageError}

                return res.status(409).json({ error: error})
            }

            const { requestId } = await courier.send({
                message: {
                    content: {
                        title: "Portfolio Fred | Contact",
                        body: "Nom complet : {{ name }} \r\n Téléphone: {{ phone }} \r\n Email : {{ email }} \r\n Sujet : {{ sujet }} \r\n Message : {{ message }}"
                    },
                    data: {
                        name: name,
                        phone: phone,
                        email: email,
                        sujet: sujet,
                        message: message
                    },
                    to: {
                        email: "fred79272@gmail.com"
                    }
                }
            });

            if(!requestId){
                throw new Error("Error Courrier")
            }

            return res.status(201).json({ message: `Votre email a bien été envoyé`})


        } catch(error: any){
            console.log(error)
            let message = `Une erreur c'est produite, veuillez réessayer !`
            let code = 500

            if(error.message == "Error Courrier"){
                message = `Le message n'a pas pu être envoyé, veuillez réessayer !`
                code = 409
            }

            return res.status(code).json({
                message,
            })
        }
    }
}


export default handler