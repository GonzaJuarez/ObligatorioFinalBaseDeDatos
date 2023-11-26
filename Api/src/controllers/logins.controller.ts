import { Request, Response } from "express";
import pool from "../dataBase";

const getLogins = async (req: Request, res: Response) => {
    const result = await pool.query('SELECT * FROM Logins');
    res.json(result[0]);
};

const getLoginById = async (req: Request, res: Response) => {
    const { logid, password } = req.body;
    const result = await pool.query('SELECT 1 EXISTE FROM Logins WHERE logid = ? and UserPassword = ?', [logid, password]);
    if (result.length <= 0) {
        res.status(404).json({
            error: true,
            message: "Login no encontrado"
        });
        console.log("Login no encontrado");
    }
    res.json({
        error: false,
        message: 'Login encontrado',
        logid: logid
    });
};

const postLogin = async (req: Request, res: Response) => {
    const { logid, password, rol } = req.body;
    const result = await pool.query('INSERT INTO Logins VALUES (?, ?, ?)', [logid, password, rol]);
    res.json({
        message: 'Login creado',
        logid: logid,
        password: password,
        rol: rol
    });
};

const putLogin = async (req: Request, res: Response) => {
    const { logid } = req.params;
    const { password, rol } = req.body;
    const result = await pool.query('UPDATE Logins SET password = ?, rol = ? WHERE logid = ?', [password, rol, logid]);
    if (result.length <= 0) {
        res.status(404).json({ message: "Login no encontrado" });
        console.log("Login no encontrado");
    } else {
        res.json({
            message: 'Login actualizado',
            logid: logid,
            password: password,
            rol: rol
        });
    }
};

const deleteLogin = async (req: Request, res: Response) => {
    const { logid } = req.params;
    const result = await pool.query('DELETE FROM Logins WHERE logid = ?', [logid]);
    if (result.length <= 0) {
        res.status(404).json({ message: "Login no encontrado" });
        console.log("Login no encontrado");
    } else {
        res.json({
            message: 'Login eliminado',
            logid: logid
        });
    }
};

export { getLogins, getLoginById, postLogin, putLogin, deleteLogin };