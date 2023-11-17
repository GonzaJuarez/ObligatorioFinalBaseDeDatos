import express from 'express';
import { deleteFuncionario, getFuncionarioByCi, getFuncionarios, postFuncionario, putFuncionario } from "../controllers/funcionarios.controller";

const router = express.Router();


router.post('/postFuncionario', postFuncionario);
router.get('/getFuncionarios', getFuncionarios);
router.get('/getFuncionarioByCi/:ci', getFuncionarioByCi);
router.put('/putFuncionario/:ci', putFuncionario);
router.delete('/deleteFuncionario/:ci', deleteFuncionario);


export default router