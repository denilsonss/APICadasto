const {
    request,
    response
} = require("express");

const repository = require('../repositories/pessoas');

// Tarefas do Controller
// -> Receber a chamada
// -> Validar/Processa
// -> Responder a chamada

const getPessoas = async (request, response) => {
    const {
        query
    } = request;

    const {
        nome,
        cpf
    } = query;

    const results = await repository.getPessoas(nome, cpf);
    response.status(200).json(results);
};

const getPessoasByCpf = async (request, response) => {
    const {
        cpf
    } = request.params;

    const results = await repository.getPessoasByCpf(cpf);
    response.status(200).json(results);
};

const getPessoasByNome =  async (request, response) => {
    const {
        nome
    } = request.params;
    
    const results = await repository.getPessoasByNome(nome);
    response.status(200).json(results.rows);
};

const createPessoas = async (request, response) => {
    const pessoa =
    request.body;

    const {
        nome,
        cpf,
        email,
        logradouro,
        numero,
        complemento,
        cep
    } = pessoa;

    //Validacao
    //const isValid = await pessoasSchema.isValid(pessoa)

    // if(!isValid){
    //     throw 'Dados invalidos';
    // }


    const pessoasComCPF = await repository.getPessoasByCpf(cpf);
    const cpfExistente = pessoasComCPF.length > 0;

    if (cpfExistente) {
        throw 'CPF Existente';
    }

    const {
        rows
    } = await repository.createPessoas(nome, cpf, email, logradouro, numero, complemento, cep);
    response.status(200).json(rows);
};

const updatePessoas = async (request, response) => {
    const {
        query
    } = request;

    const {
        nome,
        cpf,
        email,
        logradouro,
        numero,
        complemento,
        cep
    } = query;
    const results = await repository.updatePessoas(nome,
        cpf,
        email,
        logradouro,
        numero,
        complemento,
        cep);
    response.status(200).json(results);
   
};

const deletePessoas = (request, response) => {
    const cpf = request.params.cpf;
    response.status(200).json(results.rows);
};

module.exports = {
    getPessoas,
    getPessoasByCpf,
    getPessoasByNome,
    createPessoas,
    updatePessoas,
    deletePessoas,
};