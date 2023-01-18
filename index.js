const express = require('express');
const bodyParse = require('body-parser');
const app = express();
const db = require('./queries');

const port = 3000;

app.use(bodyParse.json())
app.use(
    bodyParse.urlencoded({
        extended: true,
    })
);

app.get('/', (request, response) => {
        response.json({info: 'Node.js, Express, and Postgres API'})
})

app.get('/pessoas',db.getPessoas)
app.get('/pessoas/:cpf',db.getPessoasById)
app.post('/pessoas',db.createPessoas)
app.put('/pessoas/:id',db.updatePessoas)
app.delete('/pessoas/:id',db.deletePessoas)

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})

