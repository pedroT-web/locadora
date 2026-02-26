function fnCadastrarReserva(){
    let dataAtual = new Date();
    let dataFormatada = dataAtual.toISOString().split("T")[0];

    let dadosReserva = {
        nome_cliente: document.getElementById("nome").value,
        email_cliente: document.getElementById("email").value,
        veiculo_id: 1,
        // categoriaCarro: document.getElementById("tipoVeiculo").value,
        data_reserva: dataFormatada
    }

    console.dir(dadosReserva)

    fetch("http://localhost:3000/reservar/", {
        method: "POST",
        headers: { 'Content-type': 'application/json' }, 
        body: JSON.stringify(dadosReserva)
    })
    .then(resposta => resposta.status)
    .then((dados) => {
        if(dados == 200){
            console.log("Deu Certo")
        } else if (dados == 401){
            console.log("Deu errado");
        }
    })
    .catch(erro => console.log(erro.message))
}

function fnValidarReserva(){
    const nome = document.getElementById("nome")
    const email = document.getElementById("email")
    const tipoVeiculo = document.getElementById("tipoVeiculo")
}

const botaoReserva = document.getElementById("botao_reservar")
botaoReserva.addEventListener("click", () => {
    fnCadastrarReserva()
})