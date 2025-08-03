document.addEventListener("DOMContentLoaded", () => {
  async function buscarPrecoSolana() {
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
      console.error("Erro ao buscar preço da Solana:", erro);
    }
  }

  async function carregarGraficoSolana() {
    try {
      const resposta = await fetch("https://api.coingecko.com/api/v3/coins/solana/market_chart?vs_currency=brl&days=7");
      const dados = await resposta.json();
      const precos = dados.prices;
      const labels = precos.map(p => new Date(p[0]).toLocaleDateString("pt-BR"));
      const valores = precos.map(p => p[1]);

      new Chart(document.getElementById("grafico-solana"), {
        type: "line",
        data: {
          labels: labels,
          datasets: [{
            label: "Preço em R$",
            data: valores,
            borderColor: "#9945FF",
            backgroundColor: "rgba(153, 69, 255, 0.1)",
            tension: 0.3,
            fill: true,
            pointRadius: 0
          }]
        },
        options: {
          responsive: true,
          plugins: { legend: { labels: { color: "#f0f0f0" } } },
          scales: {
            x: { ticks: { color: "#f0f0f0" } },
            y: { ticks: { color: "#f0f0f0" } }
          }
        }
      });
    } catch (erro) {
      console.error("Erro ao carregar gráfico da Solana:", erro);
    }
  }

  buscarPrecoSolana();
  carregarGraficoSolana();
});
