var dataAtual = new Date();
var dataFormatada = dataAtual.toISOString().split("T")[0];

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
const botaoReserva = document.getElementById("botao_reservar")
document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("formulario_reservaCliente");

    botaoReserva.addEventListener("click", () => {

        if (!form.checkValidity()) {
            form.classList.add("was-validated");
            return;
        } else {
            console.log("Login válido");
            fnCadastrarReservaCliente()
            fnLimparCampos()
        }
    });

});

function fnCadastrarReservaCliente() {
    let dadosReservaCliente = {
        nome_cliente: document.getElementById("nomeClienteReserva").value,
        email_cliente: document.getElementById("emailClienteReserva").value,
        veiculo_id: document.getElementById("veiculoClienteReserva").value,
        data_inicio_reserva: document.getElementById("reservaDataInicial").value,
        data_fim_reserva: document.getElementById("reservaDataFinal").value
    }

    console.dir(dadosReservaCliente)

    fetch("http://localhost:3000/reservar/", {
        method: "POST",
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(dadosReservaCliente)
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

function fnListarVeiculosDisponiveis() {
    fetch("http://localhost:3000/veiculos/disponiveis", { method: "GET" })
        .then(resposta => resposta.json())
        .then((veiculos) => {
            veiculos.forEach(veiculo => {
                fnListarVeiculosSelect(veiculo)
            })
        })
        .catch(erro => console.log(erro.message))
}
fnListarVeiculosDisponiveis()

function fnListarVeiculosSelect(veiculo) {
    let select = `
      <option value="${veiculo.id}">${veiculo.modelo} - ${veiculo.categoria}</option>
    `

    document.getElementById("veiculoClienteReserva").innerHTML += select
}

function fnLimparCampos() {
    document.getElementById("formulario_reservaCliente").reset()
}