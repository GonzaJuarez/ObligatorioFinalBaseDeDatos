import { Request, Response } from "express";
import pool from "../dataBase";

const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const getAgendas = async (req: Request, res: Response) => {
    const { fecha } = req.body;
    const result = await pool.query('SELECT * FROM Agenda WHERE Ci IS NULL AND Fch_Agenda = ?', [fecha]);
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

const putFechas = async (req: Request, res: Response) => {
    const fecha_inicio = req.body.fec_inicio;
    const fecha_fin = req.body.fec_fin;
    console.log(req.body);

    if (!fecha_inicio || !fecha_fin) {
        return res.status(400).json({ message: 'Ambas fechas son obligatorias' });
    }

    fs.readFile(path.resolve(__dirname, '../.env'), 'utf8', (err: NodeJS.ErrnoException | null, data: string) => {
        if (err) {
            return res.status(500).json({ message: 'Error al leer el archivo .env', err: err });
        }

        const envLines = data.split('\n');
        let envContent = '';

        envLines.forEach(line => {
            if (line.startsWith('FECHA_INICIO=')) {
                envContent += `FECHA_INICIO=${fecha_inicio}\n`;
            } else if (line.startsWith('FECHA_FIN=')) {
                envContent += `FECHA_FIN=${fecha_fin}\n`;
            } else {
                envContent += line + '\n';
            }
        });

        fs.writeFile(path.resolve(__dirname, '../.env'), envContent, (err: NodeJS.ErrnoException | null) => {
            if (err) {
                return res.status(500).json({ message: 'Error al escribir en el archivo .env' });
            }

            res.json({ error: false, message: 'Fechas actualizadas con éxito' });
        });
    });
};

const getFechas = async (req: Request, res: Response) => {

    let fechas = {
        fecha_inicio: '',
        fecha_fin: ''
    };

    fs.readFile(path.resolve(__dirname, '../.env'), 'utf8', (err: NodeJS.ErrnoException | null, data: string) => {
        if (err) {
            return res.status(500).json({ message: 'Error al leer el archivo .env', err: err });
        }
        const envLines = data.split('\n');
        console.log("holis");
        envLines.forEach(line => {
            console.log(line);
            if (line.startsWith('FECHA_INICIO=')) {
                fechas.fecha_inicio = line.split('=')[1];
            } else if (line.startsWith('FECHA_FIN=')) {
                fechas.fecha_fin = line.split('=')[1];
            }
        });

        console.log(fechas);
        if (!fechas.fecha_inicio || !fechas.fecha_fin) {
            return res.status(500).json({ message: 'Las fechas estan vacias' });
        } else {
            res.json(fechas).status(200);
        }

    });

}

export { getAgendas, getAgendaByCi, postAgenda, putAgenda, deleteAgenda, putFechas, getFechas };