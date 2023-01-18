const { request, response } = require('express')

const Pool = require('pg').Pool
const pool = new Pool({
    user: 'me',
    host: 'localhost',
    database: 'api',
    password: 'password',
    port: 5432
})


const getPessoas = (request, response) => {
    pool.query('SELECT * FROM pessoas ORDER BY id ASC', (error, results) => {
        if(error) {
            throw error
        }

        response.status(200).json(results.rows)
    })
}

const getPessoasById = (request, response) => {
    
    const cpf = request.params.cpf

    pool.query('SELECT * FROM pessoas WHERE cpf = $1', [cpf], (error, results) => {
        if(error) {
            throw error
        }
            response.status(200).json(results.rows)
    })
}

const createPessoas = (request, response) => {
    const {nome, cpf, email, logradouro, numero, complemento, cep} = request.body

    pool.query('INSERT INTO pessoas ( nome, cpf, email, logradouro, numero, complemento, cep) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *', [nome, cpf, email, logradouro, numero, complemento, cep], (error, results) => {
        
        if (error) {
           
            throw error

        }
            response.status(201).send(`User added with ID: ${results.rows[0].id}`)
    })
}

const updatePessoas = (request, response) => {
    const id = request.params.id
   
    const {nome, cpf, email, logradouro, numero, complemento, cep} = request.body

    pool.query(
        'UPDATE pessoas SET nome = $1, cpf = $2, email = $3, logradouro = $4, numero = $5, complemento = $6, cep = $7 WHERE id = $8',
        [nome, cpf, email, logradouro, numero, complemento, cep, id],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).send(`User modified with ID: ${id}`)
        }
    )
}


const deletePessoas = (request, response) => {
    const id = request.params.id 
    parseInt(id);
    pool.query('DELETE FROM pessoas WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`User Delete with ID: ${id}`)
    })
}


module.exports = {
    getPessoas,
    getPessoasById,
    createPessoas,
    updatePessoas,
    deletePessoas,
}