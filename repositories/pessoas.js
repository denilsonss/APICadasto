const {
    query,
} = require('./config');

const getPessoas = async (nome, cpf) => {
    let dbquery = "SELECT * FROM pessoas";
    let dbparams = [];

    if (nome && cpf) {
        dbquery += " WHERE (cpf LIKE $1) AND (nome LIKE $2)";
        dbparams = [`${cpf}%`, `${nome}%`];
    } else if (nome && !cpf) {
        dbquery += " WHERE (nome LIKE $1)";
        dbparams = [`${nome}%`];
    } else if (!nome && cpf) {
        dbquery += " WHERE (cpf LIKE $1)";
        dbparams = [`${cpf}%`];
    } else {
        dbquery += "";
        dbparams = [];
    }

    dbquery += " ORDER BY id ASC";

    const rows = await query(dbquery, dbparams);    
    return rows;
};
// async() 
// const query
// const params
// const {rows} = query(query, params)
// return rows
const getPessoasByCpf = async (cpf) => {

    const query = `SELECT * FROM pessoas WHERE cpf LIKE $1`;
    const params = [`${cpf}%`];    
    
    const { rows } = await query(query, params);
    return rows;
};

const getPessoasByNome = async (nome) => {
    const query = `SELECT * FROM pessoas WHERE nome LIKE $1` 
    const params = [`${nome}%`]

    const { rows } = await query(query,params);
    return rows;
};

const createPessoas = async (nome, cpf, email, logradouro, numero, complemento, cep) => {
                
    const query = "INSERT INTO pessoas ( nome, cpf, email, logradouro, numero, complemento, cep) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *"
    const params = [nome, cpf, email, logradouro, numero, complemento, cep]            
            
    const { rows  } = await query(query,params);
    return rows;
};

const updatePessoas = async (nome, cpf, email, logradouro, numero, complemento, cep, id) => {
    
    const query = "UPDATE pessoas SET nome = $1, cpf = $2, email = $3, logradouro = $4, numero = $5, complemento = $6, cep = $7 WHERE id = $8";
    const params =  [nome, cpf, email, logradouro, numero, complemento, cep, id]

    const { rows  } = await query(query,params);
    return rows;

};

const deletePessoas = async (cpf) => {
    const query = "DELETE FROM pessoas WHERE id = $1"
    const params = [cpf]
     
    const { rows  } = await query(query,params);
    return rows;
};

module.exports = {
    getPessoas,
    getPessoasByCpf,
    getPessoasByNome,
    createPessoas,
    updatePessoas,
    deletePessoas,
};