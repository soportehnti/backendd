import { v2 as cloudinary } from 'cloudinary'
import projectConfig from './index.config'

cloudinary.config({
    cloud_name: projectConfig.cloudinary.cloudName,
    api_key: projectConfig.cloudinary.apiKey,
    api_secret: projectConfig.cloudinary.apiSecret
})

export { cloudinary }
