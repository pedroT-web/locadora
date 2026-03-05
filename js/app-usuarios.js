function fnValidacaoBootstrap() {
    'use strict'

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.validar')

    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault()
                event.stopPropagation()
            }

            form.classList.add('was-validated')
        }, false)
    })

}
const botaoCadUsuario = document.getElementById("botao_cadUsuario")
document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("formulario_cadUsuario");

    botaoCadUsuario.addEventListener("click", () => {

        if (!form.checkValidity()) {
            form.classList.add("was-validated");
            return;
        } else {
            // fnVerificarLogin()
            console.log("Login válido");
            fnCadastrarUsuario()
            window.location.reload()
        }
    });

});

function fnCadastrarUsuario() {
    let formDadosUsuario = {
        nome: document.getElementById("cadastroNomeUsuario").value,
        email: document.getElementById("cadastroEmailUsuario").value,
        senha: document.getElementById("cadastroSenhaUsuario").value,
        nivel: document.getElementById("cadastroNivelAcessoUsuario").value
    }

    console.dir(formDadosUsuario);

    fetch("http://localhost:3000/usuario", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(formDadosUsuario)
    })
        .then(resposta => resposta.status)
        .then((dados) => {
            if (dados == 200) {
                console.log("Deu Certo")
            } else if (dados == 401) {
                console.log("Deu errado");
            }
        })
        .catch(erro => console.log(erro.message))
}

function fnListarUsuarios() {
    fetch("http://localhost:3000/usuarios", { method: "GET" })
        .then(resposta => resposta.json())
        .then((usuarios) => {
            usuarios.forEach(usuario => {
                fnMontarLinhaUsuario(usuario)
            })
        })
}

fnListarUsuarios()

function fnMontarLinhaUsuario(usuario) {
    let linha_usuario = `
     <tr>
        <td>${usuario.nome}</td>
        <td>${usuario.email}</td>
        <td>${usuario.nivel}</td>
        <td>
            <button onclick="abrirModalUsuario(this)" type="button" class="btn btn-warning text-white botaoEditarUsuario" data-bs-toggle="modal"
                data-bs-target="#modalEditarUsuario" id="botao_modalCadReserva" data-id="${usuario.id}">
                Editar
            </button>
            <button class="btn btn-danger botao_deletarUsuario" data-id="${usuario.id}">Deletar</button>
        </td>
    </tr>
    `

    document.querySelector(".corpo_tabelaUsuario").innerHTML += linha_usuario
}

function fnDeletarUsuario(id) {
    fetch(`http://localhost:3000/usuario/${id}`, { method: "DELETE" })
        .then(resultado => resultado.json())
        .then(dados => {
            console.log(dados.mensagem)
            window.location.reload()
        })
        .catch(erro => console.log(erro))
}

document.addEventListener("click", (e) => {
    if (e.target.classList.contains("botao_deletarUsuario")) {
        Swal.fire({
            title: "Realmente deseja deletar este usuário?",
            icon: "warning",
            iconColor: "#3085d6",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sim, Deletar",
            cancelButtonText: "Cancelar"
        }).then((result) => {
            if (result.isConfirmed) {
                const id = e.target.dataset.id;
                fnDeletarUsuario(id);
                Swal.fire({
                    title: "Deletado!",
                    text: "Usuário deletado com sucesso!!.",
                    icon: "success"
                }).then(() => {
                    window.location.reload()
                })
            }
        });
    }
});

const botao = document.querySelectorAll(".botaoEditarUsuario")
console.dir(botao)

let id_usuario = 0

function abrirModalUsuario(botao) {
    console.dir(botao)
    id_usuario = botao.dataset.id

    const id = botao.dataset.id
    fetch(`http://localhost:3000/usuario/${id}`, { method: "GET" })
        .then(resposta => resposta.json())
        .then((usuarios) => {
            usuarios.forEach(usuario => {
                fnPreencherEditarUsuario(usuario)
            })
        })
}

function fnPreencherEditarUsuario(usuario) {
    const inputNome = document.getElementById("editarNomeUsuario")
    const inputEmail = document.getElementById("editarEmailUsuario")
    const selectCategoria = document.getElementById("editarCategoria")

    inputNome.value = usuario.nome
    inputEmail.value = usuario.email
    selectCategoria.value = usuario.nivel
}

function salvarUsuario() {
    let formDados = {
        id: id_usuario,
        nome: document.getElementById("editarNomeUsuario").value,
        email: document.getElementById("editarEmailUsuario").value,
        nivel: document.getElementById("editarCategoria").value
    }

    console.dir(formDados)

    
    fetch(`http://localhost:3000/usuario/${id_usuario}`, {
        method: "PUT",
        headers: { 'Content-Type': "application/json" },
        body: JSON.stringify(formDados)
    })
    .then((resultado) => resultado.json())
    .then((dados) => {

    })
}

document.getElementById("botao_editUsuario").addEventListener("click", () => {
    salvarUsuario()
    window.location.reload()
})




