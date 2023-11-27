import { Request, Response } from "express";
import pool from "../dataBase";

const getPeriodosActualizacion = async (req: Request, res: Response) => {
    const result = await pool.query('SELECT * FROM Periodos_Actualizacion');
    console.log(result[0]);    
    res.json(result[0]);
};

const getPeriodoActualizacionByFch = async (req: Request, res: Response) => {
    const { Fch } = req.params;
    const result = await pool.query('SELECT * FROM Periodos_Actualizacion WHERE fch_inicio = ?', [Fch]);
    if (result.length <= 0) {
        res.status(404).json({ message: "Periodo de actualizacion no encontrado" });
        console.log("Periodo de actualizacion no encontrado");
    } else {
        res.json(result[0]);
    }
};

const postPeriodoActualizacion = async (req: Request, res: Response) => {
    const { año, semestre, fch_inicio, fch_fin } = req.body;
    const result = await pool.query('INSERT INTO Periodos_Actualizacion VALUES (?, ?, ?, ?)', [año, semestre, fch_inicio, fch_fin]);
    res.json({
        message: 'Periodo de actualizacion creado',
        año: año,
        semestre: semestre,
        fch_inicio: fch_inicio,
        fch_fin: fch_fin
    });
};

const putPeriodoActualizacion = async (req: Request, res: Response) => {
    const { fch_inicio } = req.params;
    const { fch_fin } = req.body;
    console.log(fch_inicio);
    console.log(fch_fin);
    const result = await pool.query('UPDATE Periodos_Actualizacion SET fch_fin = ? WHERE fch_inicio = ?', [ fch_fin, fch_inicio]);
    if (result.length <= 0) {
        res.status(404).json({ message: "Periodo de actualizacion no encontrado" });
        console.log("Periodo de actualizacion no encontrado");
    } else {
        res.json({
            message: 'Periodo de actualizacion actualizado',
            fch_inicio: fch_inicio,
            fch_fin: fch_fin
        });
    }
};

const deletePeriodoActualizacion = async (req: Request, res: Response) => {
    const { fch_inicio } = req.params;
    const result = await pool.query('DELETE FROM Periodos_Actualizacion WHERE fch_inicio = ?', [fch_inicio]);
    if (result.length <= 0) {
        res.status(404).json({ message: "Periodo de actualizacion no encontrado" });
        console.log("Periodo de actualizacion no encontrado");
    } else {
        res.json({
            message: 'Periodo de actualizacion eliminado',
            fch_inicio: fch_inicio
        });
    }
};

export { getPeriodosActualizacion, getPeriodoActualizacionByFch, postPeriodoActualizacion, putPeriodoActualizacion, deletePeriodoActualizacion };