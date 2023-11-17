import express from 'express';
import { postRol, getRoles, getRolByCi, putRol, deleteRol } from "../controllers/roles.controller";
const router = express.Router();


router.post('/postRol', postRol);
router.get('/getRoles', getRoles);
router.get('/getRolByCi/:ci', getRolByCi);
router.put('/putRol/:ci', putRol);
router.delete('/deleteRol/:ci', deleteRol);


export default router