import { Request, Response } from "express";
import pool from "../dataBase";

const getLogins = async (req: Request, res: Response) => {
    const result = await pool.query('SELECT * FROM Logins');
    res.json(result[0]);
};

const getLoginById = async (req: Request, res: Response) => {
    const { logid } = req.params;
    const result = await pool.query('SELECT * FROM Logins WHERE logid = ?', [logid]);
    if (result.length <= 0) {
        res.status(404).json({ message: "Login no encontrado" });
        console.log("Login no encontrado");
    } else {
        res.json(result[0]);
    }
};

const postLogin = async (req: Request, res: Response) => {
    const { logid, password} = req.body;
    let result = await pool.query('INSERT INTO Logins (LogId, Password) VALUES (?, ?)', [logid, password]);
    if (!result) {
        res.status(200).json({ error: true, message: 'Login ya existe' });
        console.log("Login ya existe");
    } else {
        res.json({error: false, message: 'Login Creado'});
    }
};

const putLogin = async (req: Request, res: Response) => {
    const { logid } = req.params;
    const { password} = req.body;
    const result = await pool.query('UPDATE Logins SET password = ? WHERE logid = ?', [password, logid]);
    if (result.length <= 0) {
        res.status(404).json({ message: "Login no encontrado" });
        console.log("Login no encontrado");
    } else {
        res.json({
            message: 'Login actualizado',
            logid: logid,
            password: password
        });
    }
};

const deleteLogin = async (req: Request, res: Response) => {
    const { logid } = req.params;
    const result = await pool.query('DELETE FROM Logins WHERE logid = ?', [logid]);
    if (result.length <= 0) {
        res.status(200).json({ message: "Login no encontrado" });
        console.log("Login no encontrado");
    } else {
        res.json({
            message: 'Login eliminado',
            logid: logid
        });
    }
};

const confirmLogin = async (req: Request, res: Response) => {
    const { ci, password } = req.body;
    let result: any = await pool.query('select l.LogId, l.Password from Logins l inner join Funcionarios f on l.LogId = f.LogId where f.CI = ? and l.Password = ?', [ci, password]);
    result = JSON.parse(JSON.stringify(result[0]));
    if (result.length <= 0) {
        res.status(200).json({error: true, message: "Login no encontrado"});
        console.log("Login no encontrado")
    } else {
        res.json({error: false, message: "Login encontrado"});
        console.log(result, "Login encontrado")
    }
}

export { getLogins, getLoginById, postLogin, putLogin, deleteLogin, confirmLogin };