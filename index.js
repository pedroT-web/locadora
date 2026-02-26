const express = require("express");
const app = express()

const bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const cors = require("cors")
app.use(cors())

const porta = 3000;
app.listen(porta)

let mysql = require("mysql")
let conexao = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "db_locadora"
})
conexao.connect((erro) => {
    if(erro){
        console.log("Erro na conexão com o banco")
        throw erro;
    } else{
        console.log("Conexão deu bom")
    }
})

app.post("/", (req, res) => {
    console.log("Olá")
})

app.post("/reservar/", (req, res) =>{
    const dados = req.body

    console.log(dados)
    
    console.log("Olá")
    conexao.query("INSERT INTO agendamentos SET ?", [dados], 
    (erro, resultado) => {
        if(erro){
            res.json(erro)
        }
        // res.send(resultado.insertId);
        console.log("Deu certo")
    })
})

