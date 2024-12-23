import express from "express";


const router = express.Router()

const lista = []

async function get(req, res) {
    res.send()
}


async function post(req, res)  {
    const dados = req.body
    console.log(dados)
    lista.push(dados)
    res.send('Usuário cadastrado com sucesso')
}





export default {get, post}