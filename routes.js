const express = require('express');
const pessoasController = require("./controllers/pessoas");

const router = express.Router();

router.get("/", (request, response) => {
    response.json({
        info: "Node.js, Express, and Postgres API"
    });
});

router.get("/pessoas", pessoasController.getPessoas);
router.get("/pessoas/:cpf", pessoasController.getPessoasByCpf);
router.post("/pessoas", pessoasController.createPessoas);
router.put("/pessoas/:id", pessoasController.updatePessoas);
router.delete("/pessoas/:id", pessoasController.deletePessoas);


module.exports = router;