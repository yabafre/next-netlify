import type { NextApiRequest, NextApiResponse } from 'next'

import { dbConnect } from '@/utils/mongodb/db-connect'
import  WorkModel from '@/utils/mongodb/model'

import { IWork } from '@/@types/work.js'



type Data = {

    works?: IWork[]

    work?: IWork

    message: string

}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const { title, seo, slug, description, coverImage } = req.body

    const{
        query: { _id },
        method,
    } = req

    if (req.method === 'GET') {
        

        try {

            dbConnect()

            const works = await WorkModel.findOne({'_id': _id})

            if(!works){
                throw new Error("Error Work")
            }

            return res.status(200).json({ works, message: 'OK' })

        } catch (error) {

            console.log(error)
            var message = `Une erreur c'est produite, veuillez réessayer!`
            var code = 500

            // @ts-ignore
            if(error.message == "Error Work"){
                message = `Ce projet n'existe pas !`
                code = 409
            }
            
            return res.status(code).json({
                message,
            })

        }

    }

    if (req.method === 'PUT') {

        try{

            // Connexion à la base de donnée
            dbConnect()

            const foundWork = await WorkModel.findOne({'_id': _id})

            if(!foundWork){
                throw new Error('foundWork')
            }

            // Vérification que tous les champs sont remplie
            if (!title || !seo.title || !seo.description || !slug || !description || !coverImage){

                const error = {title: title, seo: {title: seo.title, description: seo.description}, slug: slug, description: description, coverImage: coverImage}

                throw new Error("Error Champs")
            }


            const updateWork = await WorkModel.updateOne({'_id': _id}, { $set : { title: title, seo: {title: seo.title, description: seo.description}, slug: slug, description: description, coverImage: coverImage}})

            if(!updateWork){
                throw new Error('Update Work')
            }

            return res.status(201).json({ message: `Le projet ${foundWork.title} a bien été modifié`})


        } catch(error){
            console.log(error)
            var message = `Une erreur c'est produite, veuillez réessayer!`
            var code = 500

            // @ts-ignore
            if(error.message == "foundWork"){
                message = `Ce projet n'existe pas !`
                code = 409
            }

            // @ts-ignore
            if(error.message == "Error Champs"){
                message = `Vous devez remplir tous les champs !`
                code = 409
            }
            // @ts-ignore
            if(error.message == "Update Work"){
                message = `Le projet n'as pas pu être modifier, veuillez réessayer !`
                code = 409
            }

            return res.status(code).json({
                message,
            })
        }

        

    }

    if (req.method === 'DELETE') {

        try {

            dbConnect()

            const foundWork = await WorkModel.findOne({'_id': _id})

            if(!foundWork){
                throw new Error('foundWork')
            }

            const worksDelete = await WorkModel.deleteOne({'_id': _id})

            if(!worksDelete){
                throw new Error('worksDelete')
            }
            const works = await WorkModel.find({})
            return res.status(200).json({ works: works, message: `Le projet ${foundWork.title} a bien été supprimé` })

        } catch (error) {

            console.log(error)
            var message = `Une erreur c'est produite, veuillez réessayer!`
            var code = 500

            // @ts-ignore
            if(error.message == "foundWork"){
                message = `Ce projet n'existe pas !`
                code = 409
            }
            // @ts-ignore
            if(error.message == "worksDelete"){
                message = `Le projet n'as pas pu être supprimer, veuillez réessayer !`
                code = 409
            }

            return res.status(code).json({
                message,
            })

        }

    }

}



export default handler
