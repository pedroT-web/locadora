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

const botaoLogin = document.getElementById("botao_login")

document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("formulario_login");

    botaoLogin.addEventListener("click", () => {

        if (!form.checkValidity()) {
            form.classList.add("was-validated");
            return;
        } else {
            fnVerificarLogin()
            console.log("Login válido");
        }
    });

});

function fnVerificarLogin() {
    let formLogin = {
        email: document.getElementById("email_login").value,
        senha: document.getElementById("senha_login").value
    }

    console.dir(formLogin)

    // fetch("http://localhost:3000/login", {
    //     method: "GET",
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(formLogin)
    // })
    //     .then(resposta => resposta.status)
    //     .then((dados) => {
    //         if (dados == 201) {
    //             console.log("Foi")
    //         } else if (dados == 401) {
    //             console.log("Usuario ou Senha inválido.")
    //         } else {
    //             console.log("Algum erro aconteceu, tente mais tarde!!")
    //         }
    //     })
    //     .catch(erro => console.log(erro.message))
}