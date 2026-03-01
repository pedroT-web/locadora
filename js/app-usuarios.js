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
            <button type="button" class="btn btn-warning text-white botaoEditarUsuario" data-bs-toggle="modal"
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

function fnEditarUsuario(){

}

function abrirModalUsuario(usuario){
    const botao = document.querySelector(".botaoEditarUsuario")
    fetch("http://localhost:3000/usuario/:id", { method: "GET" })
    .then(resposta => resposta.json())
    .then(dados => {

    })
}



