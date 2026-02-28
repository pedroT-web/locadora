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

const botaoCadastrar = document.getElementById("botao_cadastroVeiculo")

document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("fomulario_cadastroVeiculo");

    botaoCadastrar.addEventListener("click", () => {

        if (!form.checkValidity()) {
            form.classList.add("was-validated");
            return;
        } else {
            // fnVerificarLogin()
            console.log("Login válido");
        }
    });

});

function fnCadastrarVeiculo(){
    let dadosVeiculos = {
        modelo: document.getElementById("modelo").value,
        marca: document.getElementById("marca").value,
        placa: document.getElementById("placa").value,
        valor_diaria: document.getElementById("valorDiaria").value,
        categoria: document.getElementById("categoria").value,
        imagem: document.getElementById("imagem").value,
        status: "dísponivel"
    }
    console.dir(dadosVeiculos)
}

botaoCadastrar.addEventListener("click", () => {
    fnCadastrarVeiculo()
})