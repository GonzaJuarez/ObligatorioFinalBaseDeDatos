import express from 'express';
import { getAgendas, getAgendaByCi, postAgenda, putAgenda, deleteAgenda } from '../controllers/agenda.controller';

const router = express.Router();


router.post('/postAgenda', postAgenda);
router.get('/getAgendas', getAgendas);
router.get('/getAgendaByCi/:ci', getAgendaByCi);
router.put('/putAgenda/:ci', putAgenda);
router.delete('/deleteAgenda/:ci', deleteAgenda);


export default router