document.addEventListener("DOMContentLoaded", () => {
  async function buscarPrecosolana() {
    try {
      const resposta = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=brl");
      const dados = await resposta.json();
      const preco = dados.solana.brl.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
      });
      document.getElementById("preco-solana").innerText = preco;
    } catch (erro) {
      document.getElementById("preco-solana").innerText = "Erro ao carregar preço.";
    }
  }

  async function carregarGraficoSolana() {
    try {
      const resposta = await fetch("https://api.coingecko.com/api/v3/coins/solana/market_chart?vs_currency=brl&days=7");
      const dados = await resposta.json();

      const precos = dados.prices;
      const labels = precos.map(item => {
        const data = new Date(item[0]);
        return `${data.getDate()}/${data.getMonth() + 1}`;
      });
      const valores = precos.map(item => item[1]);

      new Chart(document.getElementById("grafico-solana"), {
        type: "line",
        data: {
          labels: labels,
          datasets: [{
            label: "Preço em R$",
            data: valores,
            borderColor: "#00ffaa",
            backgroundColor: "rgba(0, 255, 170, 0.1)",
            borderWidth: 2,
            tension: 0.3,
            fill: true,
            pointRadius: 0
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              labels: { color: "#ccc" }
            }
          },
          scales: {
            x: { ticks: { color: "#ccc" } },
            y: { ticks: { color: "#ccc" } }
          }
        }
      });
    } catch (erro) {
      console.error("Erro ao carregar gráfico:", erro);
    }
  }

  buscarPrecosolana();
  carregarGraficoSolana();
});

