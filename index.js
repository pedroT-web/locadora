const express = require("express");
const session = require("express-session")
const app = express()

app.use(express.urlencoded({ extended: true }))

const bcrypt = require("bcrypt")

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
    if (erro) {
        console.log("Erro na conexão com o banco")
        throw erro;
    } else {
        console.log("Conexão deu bom")
    }
})

app.post("/", (req, res) => {
    console.log("Olá")
})

app.post("/reservar/", (req, res) => {
    const dados = req.body

    console.dir(dados)

    conexao.query("INSERT INTO agendamentos SET ?", [dados],
        (erro, resultado) => {
            if (erro) {
                res.json(erro)
            }
            console.log("Deu certo")
        })
    conexao.query("UPDATE veiculos SET status = 'Alugado' WHERE id = ?", [dados.veiculo_id])
})

app.get("/reservas", (req, res) => {
    conexao.query(`SELECT agendamentos.id,
        nome_cliente, 
        email_cliente, 
        DATE_FORMAT(data_inicio_reserva, '%d/%m/%Y') AS data_inicio, 
        DATE_FORMAT(data_fim_reserva, '%d/%m/%Y') AS data_fim, 
        modelo, 
        placa, 
        categoria, 
        valor_diaria 
        FROM agendamentos 
        INNER JOIN veiculos 
        ON agendamentos.veiculo_id = veiculos.id`,
        (erro, lista_reservas) => {
            res.send(lista_reservas)
            console.log("Deu certo")
        })
})

app.delete("/reserva/:id", (req, res) => {
    const id = req.params.id
    conexao.query("DELETE FROM agendamentos WHERE id = ?", [id], (erro, resultado) => {
        if (erro) {
            res.status(500)
            console.log(erro)
        } if (resultado.affectedRows === 0) {
            console.log("Reserva Não Encontrada")
        } else {
            console.log("Usuario deletado com sucesso!!!")
        }
    })
})

app.get("/reserva/:id", (req, res) => {
    const id = req.params.id
    conexao.query(`SELECT * FROM agendamentos WHERE id = ?`, [id], (erro, resultado) => {
        if (erro) {
            res.send(erro)
        }
    })
})

app.post("/login", (req, res) => {
    const { email, senha } = req.body
    conexao.query(`SELECT * FROM usuarios WHERE email = ?`, [email], async (erro, resultado) => {
        if (erro) {
            res.status(500)
            console.log("Erro no servidor")
        } if (resultado.length === 0) {
            res.status(401)
            console.log("Usuário Não encontrado")
        }

        const usuario = resultado[0]
        const senhaValida = await bcrypt.compare(senha, usuario.senha)

        if (!senhaValida) {
            res.status(401)
            console.log("Senha Incorreta")
        } else {
            res.status(200)
            console.log("Login Realizado!!")
        }
    })
})

app.get("/veiculos", (req, res) => {
    conexao.query(`SELECT * FROM veiculos`, (erro, lista_veiculos, campos) => {
        res.send(lista_veiculos)
    })
})

app.get("/veiculos/disponiveis", (req, res) => {
    conexao.query("SELECT * FROM veiculos WHERE status = 'Disponível'", (erro, lista_veiculos, campos) => {
        res.send(lista_veiculos)
    })
})

app.post("/veiculo", (req, res) => {
    const dadosVeiculo = req.body

    conexao.query("INSERT INTO veiculos SET ?", [dadosVeiculo], (erro, resultado) => {
        if (erro) {
            res.json(erro)
            console.log(erro)
            return res.status(500).json({ erro: "Erro ao cadastrar veículo" })
        }
        console.log("Deu certo")
        return res.status(201).json({ mensagem: "Veículo cadastrado com sucesso" })
    })
})

app.delete("/veiculo/:id", (req, res) => {
    const id = req.params.id

    conexao.query("DELETE FROM veiculos WHERE id = ?", [id], (erro, resultado) => {
        if (erro) {
            res.status(500)
            console.log(erro)
        } if (resultado.affectedRows === 0) {
            console.log("Reserva Não Encontrada")
        } else {
            console.log("Usuario deletado com sucesso!!!")
        }
    })
})

app.get("/veiculo/:id", (req, res) => {
    const id = req.params.id
    conexao.query(`SELECT * FROM veiculos WHERE id = ?`, [id], (erro, veiculo, campos) => {
        res.send(veiculo)
    })
})

app.put("/veiculo/:id", (req, res) => {
    const id = req.params.id
    const dados = req.body
    conexao.query(`UPDATE veiculos SET ? WHERE id = ${id}`, [dados], (erro, resultado) => {
        if (erro) {
            res.send(erro)
        }
    })
})

app.post("/usuario", async (req, res) => {
    const dadosUsuario = req.body

    try {
        const senhaHash = await bcrypt.hash(dadosUsuario.senha, 10)

        dadosUsuario.senha = senhaHash

        conexao.query("INSERT INTO usuarios SET ?", [dadosUsuario], (erro, resultado) => {
            if (erro) {
                console.log("Erro:", erro)
                return res.status(500).json(erro)
            }
            console.log("Funcionou")

            return res.status(201).json({
                mensagem: "Usuário cadastrado com sucesso"
            })
        })
    } catch (erro) {
        console.log("Erro ao gerar hash:", erro);
    }
})

app.get("/usuarios", (req, res) => {
    conexao.query("SELECT * FROM usuarios", (erro, lista_usuarios) => {
        res.send(lista_usuarios)
    })
})

app.delete("/usuario/:id", (req, res) => {
    const id = req.params.id;

    conexao.query("DELETE FROM usuarios WHERE id = ?", [id], (erro, resultado) => {
        if (erro) {
            res.status(500)
            console.log(erro)
        } if (resultado.affectedRows === 0) {
            console.log("Usuário Não Encontrado")
        } else {
            console.log("Usuario deletado com sucesso!!!")
        }
    })
})

app.put("/usuario/:id", (req, res) => {
    const id = req.params.id
    const dados = req.body
    conexao.query(`UPDATE usuarios SET ? WHERE id = ${id}`, [dados], (erro, resultado) => {
        if (erro) {
            res.send(erro)
        }

        res.send({ "status": 200, "Message": "Atualizado com Sucesso!!" })
    })
})

app.get("/usuario/:id", (req, res) => {
    const id = req.params.id
    conexao.query(`SELECT * FROM usuarios WHERE id = ?`, [id], (erro, usuario, campos) => {
        res.send(usuario)
    })
})

// app.get("/veiculos/valiacao", (req, res) => {
//     conexao.query("SELECT * FROM veiculos", (erro, lista_veiculos, campos))
// })