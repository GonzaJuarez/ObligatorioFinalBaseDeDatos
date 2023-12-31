import express from 'express';
import agenda from "./routes/agenda.route";
import carnet_de_Salud from "./routes/carnetDeSalud.route";
import funcionarios from "./routes/funcionarios.route";
import logins from "./routes/logins.route";
import periodos_Actualizacion from "./routes/periodosActualizacion.route";
import rol from "./routes/roles.route";
import pool  from './dataBase';
const cors = require('cors');

const app = express();

const PORT = 3000;

app.use(cors());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Permitir solicitudes desde cualquier origen
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});
app.use(express.json());
app.use('/api', agenda, carnet_de_Salud, funcionarios, logins, periodos_Actualizacion, rol);
app.options('*', cors());


app.get('/', (req, res) => {
    console.log("Api corriendo")
    res.send('Api Obligatorio Bases de Datos 2023')
});

app.get('/get', async (req, res) => {
    const result = await pool.query('SELECT * FROM Agenda');
    res.json(result[0]);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

