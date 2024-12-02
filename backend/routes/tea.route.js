import express from 'express';
import { addTea, listTeas, deleteTea} from '../controllers/tea.controller.js';
import multer from 'multer';

const teaRouter = express.Router();

//Image storage Engine

const storage = multer.diskStorage({
    destination: "uploads",
    filename:(req, file, cb) => {
        return cb(null, `${Date.now()}${file.originalname}`)

    }
})
//mdlware
const upload = multer({storage: storage});

teaRouter.post('/add', upload.single("image"),addTea);
teaRouter.get('/list', listTeas);
teaRouter.post('/delete', deleteTea);


export default teaRouter;