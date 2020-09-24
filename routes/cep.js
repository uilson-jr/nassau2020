const express = require('express');
const axios = require('axios').default;
const router = express.Router();

var buscaCep = require('busca-cep');

const statusHeader = {
  BAD_REQUEST: 400,
  OK: 200,
  SERVER_ERROR: 500,
}

router.get('/:cep', function (req, res, next) {

    const cep = req.params.cep;

    axios.get(`https://viacep.com.br/ws/${cep}/json/`)
        .then(function (response) {
        if (response.data) {
            res.status(statusHeader.OK).send(response.data);
            buscaCep(cep, {sync: false, timeout: 1000})
            .then(endereco => {
                console.log(endereco);
            })
            .catch(erro => {
                console.log(`Erro: statusCode ${erro.statusCode} e mensagem ${erro.message}`);
            });
        } else
            res.status(statusHeader.SERVER_ERROR).send({ 'erro': 'aconteceu um problema inesperado' });
        })
});

module.exports = router;