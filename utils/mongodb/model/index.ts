import { models, model, Schema } from 'mongoose'



const WorkSchema: Schema = new Schema({

    title: {

        type: String,

        required: true,

        unique: true,

    },

    seo: {

        title: { type: String, required: true },

        description: { type: String, required: true },

    },

    slug: { type: String, required: true, unique: true },

    description: {

        type: String,

        required: true,

    },

    coverImage: {

        type: String,

        required: true,

    },

})

const WorkModel = models.Work || model('Work', WorkSchema)

export default WorkModel