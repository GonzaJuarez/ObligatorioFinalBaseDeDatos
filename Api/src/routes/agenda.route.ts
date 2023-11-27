import express from 'express';
import { getAgendas, getAgendaByCi, postAgenda, putAgenda, deleteAgenda, putFechas, getFechas } from '../controllers/agenda.controller';

const router = express.Router();


router.post('/postAgenda', postAgenda);
router.post('/getAgendas', getAgendas);
router.get('/getAgendaByCi/:ci', getAgendaByCi);
router.put('/putAgenda/:ci', putAgenda);
router.delete('/deleteAgenda/:ci', deleteAgenda);
router.put('/putFechas', putFechas);
router.get('/getFechas', getFechas);


export default router;