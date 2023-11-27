import { Request, Response } from "express";
import pool from "../dataBase";

const getCarnetSalud = async (req: Request, res: Response) => {
    const result = await pool.query('SELECT * FROM Carnet_Salud');
    res.json(result[0]);
};

const getCarnetSaludByCi = async (req: Request, res: Response) => {
    const { ci } = req.params;
    const result = await pool.query('SELECT * FROM Carnet_Salud WHERE ci = ?', [ci]);
    if (result.length <= 0) {
        res.status(200).json({ error: true, message: "Carnet de Salud no encontrado" });
        console.log("Carnet de Salud no encontrado");
    } else {
        res.json({ error: false, message: 'Carnet de Salud encontrado', CarnetSalud: result[0] });
    }
};

const postCarnetSalud = async (req: Request, res: Response) => {
    const { ci, fch_emision, fch_vencimiento, comprobante } = req.body;
    if (!ci) {
        return res.status(200).json({ error: true, message: 'Ci es obligatorio' });
    } else if (!fch_emision) {
        return res.status(200).json({ error: true, message: 'Fecha de emision es obligatorio' });
    } else if (!fch_vencimiento) {
        return res.status(200).json({ error: true, message: 'Fecha de vencimiento es obligatorio' });
    } else if (!comprobante) {
        return res.status(200).json({ error: true, message: 'Comprobante es obligatorio' });
    }
    const result = await pool.query('INSERT INTO Carnet_Salud SET ?', {
        ci: ci,
        fch_emision: fch_emision,
        fch_vencimiento: fch_vencimiento,
        comprobante: comprobante
    });
    if (!result) {
        res.status(200).json({ error: true, message: 'Carnet de Salud ya existe' });
        console.log("Carnet de Salud ya existe");
    } else {
        res.json({ error: false, message: 'Carnet de Salud Creado' });
    }
};

const putCarnetSalud = async (req: Request, res: Response) => {
    const { ci } = req.params;
    const { fch_emision, fch_vencimiento, comprobante } = req.body;
    if (!fch_emision) {
        return res.status(200).json({ error:true, message: 'Fecha de emision es obligatorio' });
    } else if (!fch_vencimiento) {
        return res.status(200).json({ error:true, message: 'Fecha de vencimiento es obligatorio' });
    } else if (!comprobante) {
        return res.status(200).json({ error:true, message: 'Comprobante es obligatorio' });
    }
    const result = await pool.query('UPDATE Carnet_Salud SET fch_emision = ?, fch_vencimiento = ?, comprobante = ? WHERE ci = ?',
        [fch_emision, fch_vencimiento, comprobante, ci]);
    if (result.length <= 0) {
        res.status(200).json({ error: true, message: "Carnet de Salud no encontrado" });
        console.log("Carnet de Salud no encontrado");
    } else {
        res.json({
            error: false,
            message: 'Carnet de Salud actualizado',
            result: result
        });
    }
};

const deleteCarnetSalud = async (req: Request, res: Response) => {
    const { ci } = req.params;
    const result = await pool.query('DELETE FROM Carnet_Salud WHERE ci = ?', [ci]);
    if (result.length <= 0) {
        res.status(404).json({ message: "Carnet de Salud no encontrado" });
        console.log("Carnet de Salud no encontrado");
    } else {
        res.json({ message: 'Carnet de Salud eliminado' });
    }
};

export { getCarnetSalud, getCarnetSaludByCi, postCarnetSalud, putCarnetSalud, deleteCarnetSalud };