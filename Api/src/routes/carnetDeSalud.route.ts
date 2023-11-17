import express from 'express';
import { getCarnetSalud, getCarnetSaludByCi, postCarnetSalud, putCarnetSalud, deleteCarnetSalud } from "../controllers/carnetDeSalud.controller";

const router = express.Router();


router.post('/postCarnetSalud', postCarnetSalud);
router.get('/getCarnetSalud', getCarnetSalud);
router.get('/getCarnetSaludByCi/:ci', getCarnetSaludByCi);
router.put('/putCarnetSalud/:ci', putCarnetSalud);
router.delete('/deleteCarnetSalud/:ci', deleteCarnetSalud);


export default router