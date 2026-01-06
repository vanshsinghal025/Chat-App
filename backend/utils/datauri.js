import DataUriParser from 'datauri/parser.js'

const parser = new DataUriParser()

export const datauri = (file) => {
    return parser.format(file.originalname, file.buffer)
}