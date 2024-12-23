import { request, response } from "express";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";
import database from  "../../Data/database.js";

/**
 * @param {request} req
 * @param {response} res
 */

async function Login(req, res) {
    try {
        const {CHAVE, password} = req.body;
        if (!CHAVE || !password) {
            return res.status(400).send({error: "Usuário ou senha não informado"});
        }
        let TABELA = await database.query("select * from TABELA where CHAVE = $1",[CHAVE]);
        if (!TABELA.rows.length) {
            return res.status(400).send({ error: "Usuário não encontrado" });
        }
        TABELA = TABELA.rows[0];
        if (bcrypt.compareSync(password, TABELA.password)) {
            const token = Jwt.sign({ id: TABELA.id }, process.env.SECRET_KEY, { algorithm: "HS256" });//valores que vão dentro do token
            res.send({ token });
        } else {
            res.status(400).send({ error: "Senha errada" });
        }
    } catch (e) {
        consolres.error('Erro ao buscar usuário ','erro: ', e);
    }
}

export default Login;