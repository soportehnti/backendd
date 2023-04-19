import { mkdirSync } from 'fs'
import multer, { diskStorage } from 'multer'

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const path = './public/files'
        mkdirSync(path, { recursive: true })
        cb(null, path)
    },
    filename: (req, file, cb) => {
        const ofuscateName = file.originalname.split('.')[0].replace(/[^a-zA-Z0-9]/g, '') + '-' + new Date().toISOString() + '.' + file.originalname.split('.')[1]
        cb(null, ofuscateName)
        // cb(null, new Date().toISOString() + file.originalname)
    }
})

const fileFilter = (req: any, file: any, cb: Function) => {
    if (file.mimetype !== 'image/jpg' && file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png' && file.mimetype !== 'application/pdf') {
        cb({ message: 'Unsupported file format.' }, false)
    }
    cb(null, true)
}

const upload = multer({
    // storage: diskStorage({}),
    storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter
})

export default upload

// https://medium.com/quick-code/uploading-files-and-serve-directory-listing-using-nodejs-6f353f65be5
