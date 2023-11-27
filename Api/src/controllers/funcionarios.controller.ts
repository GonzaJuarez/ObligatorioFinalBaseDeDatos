import { Request, Response } from "express";
import pool from "../dataBase";

const getFuncionarios = async (req: Request, res: Response) => {
    const result = await pool.query('SELECT * FROM Funcionarios');
    res.json(result[0]);
};

const getFuncionarioByCi = async (req: Request, res: Response) => {
    const { ci } = req.params;
    let result = await pool.query('SELECT * FROM Funcionarios WHERE ci = ?', [ci]);
    result = JSON.parse(JSON.stringify(result[0]));
    if (result.length <= 0) {
        res.status(200).json({ error: true, message: "Funcionario no encontrado" });
        console.log("Funcionario no encontrado");
    } else {
        res.json(result);
    }

};

const postFuncionario = async (req: Request, res: Response) => {
    const { ci, nombre, apellido, fecha_nacimiento, direccion, telefono, email, logid } = req.body;
    if (!ci) {
        return res.status(200).json({ message: 'Ci es obligatorio' });
    } else if (!nombre) {
        return res.status(200).json({ message: 'Nombre es obligatorio' });
    } else if (!apellido) {
        return res.status(200).json({ message: 'Apellido es obligatorio' });
    } else if (!fecha_nacimiento) {
        return res.status(200).json({ message: 'Fecha de nacimiento es obligatorio' });
    } else if (!direccion) {
        return res.status(200).json({ message: 'Direccion es obligatorio' });
    } else if (!telefono) {
        return res.status(200).json({ message: 'Telefono es obligatorio' });
    } else if (!email) {
        return res.status(200).json({ message: 'Email es obligatorio' });
    } else if (!logid) {
        return res.status(200).json({ message: 'LogId es obligatorio' });
    }
    const result = await pool.query('INSERT INTO Funcionarios (Ci, Nombre, Apellido, Fch_Nacimiento, Direccion, Telefono, Email, LogId) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [ci, nombre, apellido, fecha_nacimiento, direccion, telefono, email, logid]);
    if (!result) {
        res.status(200).json({ error: true, message: 'Funcionario ya existe' });
        console.log("Funcionario ya existe");
    } else {
        res.json({error: false, message: 'Funcionario Creado'});
    }
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

const getFuncionarioRol = async (req: Request, res: Response) => {
    const { ci } = req.params;
    let result = await pool.query('SELECT * FROM UsuarioRol WHERE ci = ?', [ci]);
    result = JSON.parse(JSON.stringify(result[0]));
    if (result.length <= 0) {
        res.status(200).json({ error: true, message: "Funcionario no encontrado" });
        console.log("Funcionario no encontrado");
    } else {
        res.json(result);
    }
}

export { getFuncionarios, getFuncionarioByCi, postFuncionario, putFuncionario, deleteFuncionario, getFuncionarioRol };