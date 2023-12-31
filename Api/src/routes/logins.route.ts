import express from 'express';
import { getLogins, getLoginById, postLogin, putLogin, deleteLogin, confirmLogin } from "../controllers/logins.controller";
const router = express.Router();


router.post('/postLogin', postLogin);
router.get('/getLogins', getLogins);
router.get('/getLoginByCi/:logid', getLoginById);
router.put('/putLogin/:logid', putLogin);
router.delete('/deleteLogin/:logid', deleteLogin);
router.post('/confirmLogin', confirmLogin);


export default router