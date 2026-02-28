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
        }
    });

});

function fnCadastrarUsuario(){
    let formDadosUsuario = {
        nome: document.getElementById("cadastroNomeUsuario").value,
        email: document.getElementById("cadastroEmailUsuario").value,
        senha: document.getElementById("cadastroSenhaUsuario").value,
        nivel: document.getElementById("cadastroNivelAcessoUsuario").value
    }

    console.dir(formDadosUsuario);
}

botaoCadUsuario.addEventListener("click", () => {
    fnCadastrarUsuario()
})
