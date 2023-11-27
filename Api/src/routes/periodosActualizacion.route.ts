import express from 'express';
import { getPeriodosActualizacion, getPeriodoActualizacionByFch, postPeriodoActualizacion, putPeriodoActualizacion, deletePeriodoActualizacion } from "../controllers/periodosActualizacion.controller";
const router = express.Router();


router.post('/postPeriodoActualizacion', postPeriodoActualizacion);
router.get('/getPeriodosActualizacion', getPeriodosActualizacion);
router.get('/getPeriodoActualizacionByFch/:ci', getPeriodoActualizacionByFch);
router.put('/putPeriodoActualizacion/:fch_inicio', putPeriodoActualizacion);
router.delete('/deletePeriodoActualizacion/:ci', deletePeriodoActualizacion);


export default router