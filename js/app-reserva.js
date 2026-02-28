let dataAtual = new Date();
let dataFormatada = dataAtual.toISOString().split("T")[0];

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
            // fnVerificarLogin()
            console.log("Login válido");
        }
    });

});

// document.addEventListener("DOMContentLoaded", () => {

//     const form = document.getElementById("formulario_cadReserva");

//     botaoCadastrarReserva.addEventListener("click", () => {

//         if (!form.checkValidity()) {
//             form.classList.add("was-validated");
//             return;
//         } else {
//             // fnVerificarLogin()
//             console.log("Login válido");
//         }
//     });

// });


function fnCadastrarReservaCliente() {
    let dadosReservaCliente = {
        nome_cliente: document.getElementById("nomeClienteReserva").value,
        email_cliente: document.getElementById("emailClienteReserva").value,
        veiculo_id: 1,
        data_reserva: dataFormatada
    }

    console.dir(dadosReservaCliente)

    fetch("http://localhost:3000/reservar/", {
        method: "POST",
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(dadosReserva)
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

function fnValidarReserva() {
    const nome = document.getElementById("nome")
    const email = document.getElementById("email")
    const tipoVeiculo = document.getElementById("tipoVeiculo")
}

function fnCadastrarReservaOperario() {
    let dadosReservaOperario = {
        nome_cliente: document.getElementById("reservaNomeCliente").value,
        email_cliente: document.getElementById("reservaEmailCliente").value,
        veiculo_id: 1,
        data_reserva: dataFormatada
    }

    console.dir(dadosReservaOperario);
}


botaoReserva.addEventListener("click", () => {
    fnCadastrarReservaCliente()
})


const botaoCadastrarReserva = document.getElementById("botao_cadReserva")
botaoCadastrarReserva.addEventListener("click", () => {
    fnCadastrarReservaOperario()
})