import multer from 'multer';
import express from 'express';
import {isAuth} from '../utils.js';

const addImagemRouter = express.Router();
const storage= multer.diskStorage({
    destination(req, file, cb){
        cb(null, 'fotos/')
    }, filename(req, file, cb){
        cb(null, `${Date.now()}.jpeg`);
    }
});

const carregar = multer({storage});

addImagemRouter.post('/', isAuth, carregar.single('imagem'), (req, res)=>{
    res.send(`/${req.file.path}`);
});

export default addImagemRouter;