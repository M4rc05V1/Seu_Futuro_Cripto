document.addEventListener("DOMContentLoaded", () => {
  async function buscarPrecoEthereum() {
    try {
      const resposta = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=brl");
      const dados = await resposta.json();
      const preco = dados.ethereum.brl.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
      });
      document.getElementById("preco-ethereum").innerText = preco;
    } catch (erro) {
      document.getElementById("preco-ethereum").innerText = "Erro ao carregar preço.";
      console.error("Erro ao buscar preço do Ethereum:", erro);
    }
  }

  async function carregarGraficoEthereum() {
    try {
      const resposta = await fetch("https://api.coingecko.com/api/v3/coins/ethereum/market_chart?vs_currency=brl&days=7");
      const dados = await resposta.json();
      const precos = dados.prices;
      const labels = precos.map(p => new Date(p[0]).toLocaleDateString("pt-BR"));
      const valores = precos.map(p => p[1]);

      new Chart(document.getElementById("grafico-ethereum"), {
        type: "line",
        data: {
          labels: labels,
          datasets: [{
            label: "Preço em R$",
            data: valores,
            borderColor: "#3c3cce",
            backgroundColor: "rgba(60, 60, 206, 0.1)",
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
      console.error("Erro ao carregar gráfico do Ethereum:", erro);
    }
  }

  buscarPrecoEthereum();
  carregarGraficoEthereum();
});
