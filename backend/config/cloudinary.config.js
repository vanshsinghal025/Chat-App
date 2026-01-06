import {v2 as cloudinary} from 'cloudinary'
import dotenv from 'dotenv'
import { datauri } from '../utils/datauri.js'

dotenv.config({})

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
})

export const imageUploader = async (file) => {
    const fileUri = datauri(file)
    const cloudinaryResponse = await cloudinary.uploader.upload(fileUri?.content)

    if (cloudinaryResponse){
        return cloudinaryResponse.secure_url;
    }

    return ''

}