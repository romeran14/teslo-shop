import type { NextApiRequest, NextApiResponse } from 'next'
import { IncomingForm, File } from 'formidable';
import fs from 'fs'

type Data = {
    message: string
}

//Configuracion adicional de next para el parseo de imagenes, hace que next no parsee el body ai se puede trabajar manualmente
export const config = {
    api: {
        bodyParser: false,
    }
}

export default function (req: NextApiRequest, res: NextApiResponse<Data>) {

    switch (req.method) {
        case 'POST':
            return uploadFile(req, res)


        default:
            return res.status(400).json({ message: 'Bad Request' })
    }

}

const parseFiles = async (req: NextApiRequest): Promise<string> => {

    return new Promise((resolve, reject) => {

        const form = new IncomingForm();
        form.parse(req, async (err, fields, files) => {
            console.log({ file: files.file });

            if (err || !files.file) {
                return reject(err);
            }


            const filePath = await saveFile(files.file[0] as File)
            resolve(filePath as any);



        })
    })
}

const uploadFile = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    await parseFiles(req)
    return res.status(200).json({ message: 'Imagen subida' })
}


const saveFile = async (file: File) => {

    const data = fs.readFileSync(file.filepath)
    fs.writeFileSync(`./public/${file.originalFilename}`, data);
    fs.unlinkSync(file.filepath)
    return;
}

