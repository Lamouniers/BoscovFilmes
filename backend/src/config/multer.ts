import crypto from 'crypto'; // para as imagens nao terem o mesmo nome
import multer from 'multer'; // para fazer o upload de arquivos

import {extname, resolve } from 'path'; // para resolver o caminho do arquivo

export default {
    upload(folder: string) {
        return {
            storage: multer.diskStorage({
                destination: resolve(__dirname, '..', '..', folder), // onde o arquivo vai ser salvo
                filename: (request, file, callback) => {
                    const fileHash = crypto.randomBytes(16).toString('hex'); // gera um hash aleatorio
                    const fileName = `${fileHash}-${file.originalname}`; // nome do arquivo

                    return callback(null, fileName); // retorna o nome do arquivo
                },
            }),
        };
    }    
};