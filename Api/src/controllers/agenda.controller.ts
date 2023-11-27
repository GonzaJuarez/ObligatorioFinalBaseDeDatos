import { Request, Response } from "express";
import pool from "../dataBase";

const getAgendas = async (req: Request, res: Response) => {
    const result = await pool.query('SELECT * FROM Agenda');
    res.json(result[0]);
};

const getAgendaByCi = async (req: Request, res: Response) => {
    const { ci } = req.params;
    const result = await pool.query('SELECT * FROM Agenda WHERE ci = ?', [ci]);
    if (result.length <= 0) {
        res.status(404).json({ message: "Agenda no encontrado" });
        console.log("Agenda no encontrado");
    } else {
        res.json(result[0]);
    }
};

const postAgenda = async (req: Request, res: Response) => {
    const { nro, ci, fch_agenda } = req.body;
    console.log(req.body);
    const result = await pool.query('INSERT INTO Agenda (Nro, Ci, Fch_Agenda) VALUES (?, ?, ?)', [nro, ci, fch_agenda]);
    console.log(result);
    res.json({
        error: false,
        message: 'Agenda creado',
        nro: nro,
        ci: ci,
        fch_agenda: fch_agenda
    });
};

const putAgenda = async (req: Request, res: Response) => {
    const { ci } = req.params;
    const { nro, fch_agenda } = req.body;
    const result = await pool.query('UPDATE Agenda SET nro = ?, fch_agenda = ? WHERE ci = ?',
        [nro, fch_agenda, ci]);
    if (result.length <= 0) {
        res.status(404).json({ message: "Agenda no encontrado" });
        console.log("Agenda no encontrado");
    } else {
        res.json({
            message: 'Agenda actualizado',
            nro: nro,
            fch_agenda: fch_agenda
        });
    }
};

const deleteAgenda = async (req: Request, res: Response) => {
    const { ci } = req.params;
    const result = await pool.query('DELETE FROM Agenda WHERE ci = ?', [ci]);
    if (result.length <= 0) {
        res.status(404).json({ message: "Agenda no encontrado" });
        console.log("Agenda no encontrado");
    } else {
        res.json({
            message: 'Agenda eliminado',
            ci: ci
        });
    }
};

export { getAgendas, getAgendaByCi, postAgenda, putAgenda, deleteAgenda };