const express = require('express');
const router= require('./router/index');
const app= express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send("Servidor en ejecución");
})

app.use('/api', router);

const Puerto= process.env.PUERTO || 4000;

app.listen(Puerto, (req, res) => {
    console.log("Servidor corriendo en el puerto", Puerto);
});