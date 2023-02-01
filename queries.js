const { request, response } = require("express");

const Pool = require("pg").Pool;
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "api",
  password: "postgrespw",
  port: 32768,
});

const getPessoas = (request, response) => {
  const { query } = request;

  const { nome, cpf } = query;

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

  pool.query(dbquery, dbparams, (error, results) => {
    if (error) {
      throw error;
    }

    response.status(200).json(results.rows);
  });
};

const getPessoasByCpf = (request, response) => {
  const { cpf } = request.params;

  pool.query(
    `SELECT * FROM pessoas WHERE cpf LIKE $1`,
    [`${cpf}%`],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

const getPessoasByNome = (request, response) => {
  const nome = request.params.nome;

  pool.query(
    `SELECT * FROM pessoas WHERE nome LIKE $1`,
    [`${nome}%`],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

const createPessoas = (request, response) => {
  const { nome, cpf, email, logradouro, numero, complemento, cep } =
    request.body;

  pool.query(
    "INSERT INTO pessoas ( nome, cpf, email, logradouro, numero, complemento, cep) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
    [nome, cpf, email, logradouro, numero, complemento, cep],
    (error, results) => {
      if (error) {
        throw error;
      }
      // `User added with ID: ${results.rows[0].id}`
      response.status(201).send({
        success: true,
      });
    }
  );
};

const updatePessoas = (request, response) => {
  const id = request.params.id;

  const { nome, cpf, email, logradouro, numero, complemento, cep } =
    request.body;

  pool.query(
    "UPDATE pessoas SET nome = $1, cpf = $2, email = $3, logradouro = $4, numero = $5, complemento = $6, cep = $7 WHERE id = $8",
    [nome, cpf, email, logradouro, numero, complemento, cep, id],
    (error, results) => {
      if (error) {
        throw error;
      }

      response.status(200).send({
        success: true,
      });
    }
  );
};

const deletePessoas = (request, response) => {
  const cpf = request.params.cpf;
  parseInt(cpf);
  pool.query("DELETE FROM pessoas WHERE id = $1", [cpf], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).send({
      success: true,
    });
  });
};

module.exports = {
  getPessoas,
  getPessoasByCpf,
  getPessoasByNome,
  createPessoas,
  updatePessoas,
  deletePessoas,
};
