import { createPool } from 'mysql2/promise';

const pool = createPool({
    host: 'localhost',
    port: 9999,
    database: 'Obligatorio_Base_de_Datos',
    user: 'root',
    password: 'obligatorioFinal2023'
});

export default pool;

