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
            console.log("Login válido");
            window.location.reload()
        }
        fnCadastrarVeiculo()
    });

});

function fnCadastrarVeiculo() {
    let dadosVeiculos = {
        modelo: document.getElementById("modelo").value,
        marca: document.getElementById("marca").value,
        placa: document.getElementById("placa").value,
        valor_diaria: document.getElementById("valorDiaria").value,
        categoria: document.getElementById("categoria").value,
        foto: document.getElementById("imagem").value,
        status: "disponivel"
    }
    console.dir(dadosVeiculos)

    fetch("http://localhost:3000/veiculo", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(dadosVeiculos)
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

function fnListarVeiculos() {
    fetch("http://localhost:3000/veiculos", { method: "GET" })
        .then(resposta => resposta.json())
        .then((veiculos) => {
            veiculos.forEach(veiculo => {
                fnMontarCardsVeiculos(veiculo)
            })
        })
        .catch(erro => console.log(erro.message))
}

fnListarVeiculos()

function fnMontarCardsVeiculos(veiculo) {
    let card = `
    <div class="card shadow col-sm-5 p-2" style="">
                        <img src="${veiculo.foto}" class="card-img" style="height: 300px; object-fit: cover;" alt="...">
                        <div class="card-body">
                            <div class="row">
                                <div class="col-6">
                                    <div class="juncao_informacoes_cars">
                                        <label class="d-block fs-5">Modelo: <span
                                                id="modeloVeiculo">${veiculo.modelo}</span></label>
                                        <label class="d-block fs-5">Marca: <span id="marcaVeiculo">${veiculo.marca}</span></label>
                                        <label class="d-block fs-5">Valor Diaria: <span
                                                id="diariaVeiculo">R$ ${veiculo.valor_diaria}</span></label>
                                    </div>
                                </div>
                                <div class="col-6">
                                    <div class="juncao_informacoes_cars">
                                        <label class="d-block fs-5">Categoria: <span
                                                id="categoriaVeiculo">${veiculo.categoria}</span></label>
                                        <label class="d-block fs-5">Placa: <span
                                                id="placaVeiculo">${veiculo.placa}</span></label>
                                        <label class="d-block fs-5">Status: <span
                                                id="statusVeiculo">${veiculo.status}</span></label>
                                    </div>
                                </div>
                            </div>
                            <hr>
                            <div class="card_footer d-flex">
                            <button class="btn btn-warning w-50 text-white" data-bs-toggle="modal"
                                data-bs-target="#modalEditarVeiculo" onclick="fnAbrirModalEditarVeiculos(this)" data-id="${veiculo.id}">Editar Veiculo</button>
                                <button class="btn btn-danger w-50 botao_deletarVeiculo" data-id="${veiculo.id}">Deletar Veiculo</button>
                            </div>
                        </div>
                    </div>
    `

    document.querySelector(".linha_cards").innerHTML += card
}

function fnDeletarVeiculo(id) {
    fetch(`http://localhost:3000/veiculo/${id}`, { method: "DELETE" })
        .then(resposta => resposta.json)
        .then(dados => {
            console.log(dados)
        })
        .catch(erro => console.log(erro))
}

document.addEventListener("click", (e) => {
    if (e.target.classList.contains("botao_deletarVeiculo")) {
        Swal.fire({
            title: "Realmente deseja deletar este veículo?",
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
                fnDeletarVeiculo(id);
                Swal.fire({
                    title: "Deletado!",
                    text: "Veículo deletado com sucesso!!.",
                    icon: "success"
                }).then(() => {
                    window.location.reload()
                })
            }
        });
    }
})

function fnAbrirModalEditarVeiculos(botao) {
    const id = botao.dataset.id
    fetch(`http://localhost:3000/veiculo/${id}`, { method: "GET" })
        .then(resposta => resposta.json())
        .then((veiculos) => {
            veiculos.forEach(veiculo => {
                fnPreencherEditarVeiculos(veiculo)
            })
        })
}

function fnPreencherEditarVeiculos(veiculo){
    console.log(veiculo.modelo)
    const inputModel = document.getElementById("editarModelo")
    const inputMarca = document.getElementById("editarMarca")
    const inputPlaca = document.getElementById("editarPlaca")
    const inputDiaria = document.getElementById("editarValorDiaria")
    const inputCategoria = document.getElementById("editarCategoria")
    const inputStatus = document.getElementById("editarStatusVeiculo")
    const inputFoto = document.getElementById("editarImagem")

    inputModel.value = veiculo.modelo
    inputMarca.value = veiculo.marca
    inputPlaca.value = veiculo.placa
    inputDiaria.value = veiculo.valor_diaria
    inputCategoria.value = veiculo.categoria
    inputStatus.value = veiculo.status
    inputFoto.value = veiculo.foto
}