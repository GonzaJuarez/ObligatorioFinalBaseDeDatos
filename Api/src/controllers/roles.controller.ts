import { Request, Response } from "express";
import pool from "../dataBase";

const postRol = async (req: Request, res: Response) => {
    const { ci, esadmin} = req.body;
    const [ rows] = await pool.query('INSERT INTO Rol (ci, esadmin) VALUES (?, ?)',
        [ci, esadmin]);
    res.send({
        message: 'Rol creado',
        ci: ci,
        esadmin: esadmin
    });
};

const getRoles = async (req: Request, res: Response) => {
    const result = await pool.query('SELECT * FROM Rol');
    res.json(result[0]);
};

const getRolByCi = async (req: Request, res: Response) => {
    const { ci } = req.params;
    const result = await pool.query('SELECT * FROM Rol WHERE ci = ?', [ci]);
    if (result.length <= 0) {
        res.status(404).json({ message: "Rol no encontrado" });
        console.log("Rol no encontrado");
    } else {
        res.json(result[0]);
    }
};

const putRol = async (req: Request, res: Response) => {
    const { ci } = req.params;
    const { esadmin } = req.body;
    const result = await pool.query('UPDATE Rol SET esadmin = ? WHERE ci = ?',
        [esadmin, ci]);
    if (result.length <= 0) {
        res.status(404).json({ message: "Rol no encontrado" });
        console.log("Rol no encontrado");
    } else {
        res.json({
            message: 'Rol actualizado',
            ci: ci,
            esadmin: esadmin
        });
    }
};

const deleteRol = async (req: Request, res: Response) => {
    const { ci } = req.params;
    const result = await pool.query('DELETE FROM Rol WHERE ci = ?', [ci]);
    if (result.length <= 0) {
        res.status(404).json({ message: "Rol no encontrado" });
        console.log("Rol no encontrado");
    } else {
        res.json({
            message: 'Rol eliminado',
            ci: ci
        });
    }
};

export { postRol, getRoles, getRolByCi, putRol, deleteRol };