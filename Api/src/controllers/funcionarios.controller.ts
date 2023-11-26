import { Request, Response } from "express";
import pool from "../dataBase";

const getFuncionarios = async (req: Request, res: Response) => {
    const result = await pool.query('SELECT * FROM Funcionarios');
    res.json(result[0]);
};

const getFuncionarioByCi = async (req: Request, res: Response) => {
    const { ci } = req.params;
    const result = await pool.query('SELECT * FROM Funcionarios WHERE ci = ?', [ci]);
    if (result.length <= 0) {
        res.status(404).json({ message: "Funcionario no encontrado" });
        console.log("Funcionario no encontrado");
    } else {
        res.json(result[0]);
    }
};

const postFuncionario = async (req: Request, res: Response) => {
    const { ci, nombre, apellido, fecha_nacimiento, direccion, telefono, email, logid } = req.body;
    const [rows] = await pool.query('INSERT INTO Funcionarios (ci, nombre, apellido, fch_nacimiento, direccion, telefono, email, logid) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [ci, nombre, apellido, fecha_nacimiento, direccion, telefono, email, logid]);
    res.send({
        error: false,
        message: 'Funcionario creado',
        ci: ci,
        nombre: nombre,
        apellido: apellido,
        fecha_nacimiento: fecha_nacimiento,
        direccion: direccion,
        telefono: telefono,
        email: email,
        logid: logid
    });
};

const putFuncionario = async (req: Request, res: Response) => {
    const { ci } = req.params;
    const { nombre, apellido, fecha_nacimiento, direccion, telefono, email, logid } = req.body;
    const result = await pool.query('UPDATE Funcionarios SET nombre = ?, apellido = ?, fch_nacimiento = ?, direccion = ?, telefono = ?, email = ?, logid = ? WHERE ci = ?',
        [nombre, apellido, fecha_nacimiento, direccion, telefono, email, logid, ci]);
    if (result.length <= 0) {
        res.status(404).json({ message: "Funcionario no encontrado" });
        console.log("Funcionario no encontrado");
    } else {
        res.json({
            message: 'Funcionario actualizado',
            ci: ci,
            nombre: nombre,
            apellido: apellido,
            fecha_nacimiento: fecha_nacimiento,
            direccion: direccion,
            telefono: telefono,
            email: email,
            logid: logid
        });
    }
};

const deleteFuncionario = async (req: Request, res: Response) => {
    const { ci } = req.params;
    const result = await pool.query('DELETE FROM Funcionarios WHERE ci = ?', [ci]);
    if (result.length <= 0) {
        res.status(404).json({ message: "Funcionario no encontrado" });
        console.log("Funcionario no encontrado");
    } else {
        res.json({
            message: 'Funcionario eliminado',
            ci: ci,
            result
        });
    }
};

export { getFuncionarios, getFuncionarioByCi, postFuncionario, putFuncionario, deleteFuncionario };