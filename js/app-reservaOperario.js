// let dataAtual = new Date();
// let dataFormatada = dataAtual.toISOString().split("T")[0];

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

document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("formulario_cadReserva");

    botaoCadastrarReserva.addEventListener("click", () => {

        if (!form.checkValidity()) {
            form.classList.add("was-validated");
            return;
        } else {
            console.log("Login válido");
            window.location.reload()
        }

        fnCadastrarReservaOperario()
    });

});


function fnCadastrarReservaOperario() {
    let dadosReservaOperario = {
        nome_cliente: document.getElementById("reservaNomeCliente").value,
        email_cliente: document.getElementById("reservaEmailCliente").value,
        veiculo_id: document.getElementById("veiculo").value,
        data_inicio_reserva: document.getElementById("reservaInicialData").value,
        data_fim_reserva: document.getElementById("reservaFinalData").value
    }

    console.dir(dadosReservaOperario);

    fetch("http://localhost:3000/reservar/", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(dadosReservaOperario)
    })
        .then(resposta => resposta.status)
        .then((dados) => {
            if (dados == 201) {
                console.log("Deu Certo")
            } else if (dados == 400) {
                console.log("Deu errado");
            }
        })
        .catch(erro => console.log(erro.message))
}

const botaoCadastrarReserva = document.getElementById("botao_cadReserva")

function fnListarReservas() {
    fetch("http://localhost:3000/reservas", { method: "GET" })
        .then(resposta => resposta.json())
        .then((reservas) => {
            reservas.forEach(reserva => {
                fnMontarListaReservas(reserva)
            })
        })
        .catch(erro => console.log(erro.message))
}

fnListarReservas()

function fnMontarListaReservas(reserva) {
    let linha_reserva = `
     <tr>
        <td>${reserva.nome_cliente}</td>
        <td>${reserva.email_cliente}</td>
        <td>${reserva.modelo}</td>
        <td>${reserva.categoria}</td>
        <td>${reserva.placa}</td>
        <td>${reserva.valor_diaria}</td>
        <td>${reserva.data_inicio}</td>
        <td>${reserva.data_fim}</td>
        <td>
            <button class="btn btn-warning text-white" data-bs-toggle="modal" data-bs-target="#modalEditarReserva" data-id="${reserva.id}">Editar</button>
            <button class="btn btn-danger botao_deletarReserva" data-id="${reserva.id}">Deletar</button>
        </td>
    </tr>
    `

    document.querySelector(".corpo_tabelaReservas").innerHTML += linha_reserva
}

function fnListarVeiculos() {
    fetch("http://localhost:3000/veiculos", { method: "GET" })
        .then(resposta => resposta.json())
        .then((veiculos) => {
            veiculos.forEach(veiculo => {
                fnSelectVeiculos(veiculo)
            })
        })
        .catch(erro => console.log(erro.message))
}

fnListarVeiculos()

function fnSelectVeiculos(veiculo) {
    let veiculos = `
         <option value="${veiculo.id}">${veiculo.modelo} - ${veiculo.categoria}</option>
    `

    document.getElementById("veiculo").innerHTML += veiculos
}


function fnLimparCampos() {
    document.getElementById("formulario_cadReserva").reset()
}

function fnDeletarReserva(id) {
    fetch(`http://localhost:3000/reserva/${id}`, { method: "DELETE" })
        .then(resposta => resposta.json)
        .then(dados => {
            console.log(dados.message)
            window.location.reload()
        })
        .catch(erro => console.log(erro.message))
}

document.addEventListener("click", (e) => {
    if (e.target.classList.contains("botao_deletarReserva")) {
        Swal.fire({
            title: "Realmente deseja deletar esta reserva?",
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
                console.log(id)
                fnDeletarReserva(id);
                Swal.fire({
                    title: "Deletado",
                    text: "Reserva deletada com sucesso!!",
                    icon: "success",
                }).then(() => {
                    window.location.reload()
                })
            }
        });
    }
})