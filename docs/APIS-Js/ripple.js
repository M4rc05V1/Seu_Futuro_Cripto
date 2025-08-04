document.addEventListener("DOMContentLoaded", () => {
  async function buscarPrecoRipple() {
    try {
      const resposta = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=ripple&vs_currencies=brl");
      const dados = await resposta.json();
      const preco = dados.ripple.brl.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
      });
      document.getElementById("preco-ripple").innerText = preco;
    } catch (erro) {
      document.getElementById("preco-ripple").innerText = "Erro ao carregar preço.";
      console.error("Erro ao buscar preço:", erro);
    }
  }

  async function carregarGraficoRipple() {
    try {
      const resposta = await fetch("https://api.coingecko.com/api/v3/coins/ripple/market_chart?vs_currency=brl&days=7");
      const dados = await resposta.json();
      const precos = dados.prices;
      const labels = precos.map(p => new Date(p[0]).toLocaleDateString("pt-BR"));
      const valores = precos.map(p => p[1]);

      new Chart(document.getElementById("grafico-ripple"), {
        type: "line",
        data: {
          labels: labels,
          datasets: [{
            label: "Preço em R$",
            data: valores,
            borderColor: "#25aee0",
            backgroundColor: "rgba(37, 174, 224, 0.1)",
            tension: 0.3,
            fill: true,
            pointRadius: 0
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              labels: {
                color: "#f0f0f0"
              }
            }
          },
          scales: {
            x: {
              ticks: { color: "#f0f0f0" }
            },
            y: {
              ticks: { color: "#f0f0f0" }
            }
          }
        }
      });
    } catch (erro) {
      console.error("Erro ao carregar gráfico:", erro);
    }
  }

  buscarPrecoRipple();
  carregarGraficoRipple();
});
