// DOM elements
const fromCurrency = document.getElementById("from");
const toCurrency = document.getElementById("to");
const amountInput = document.getElementById("amount");
const convertBtn = document.getElementById("convert");
const result = document.getElementById("result");

// Optional chart elements
const chartContainer = document.getElementById("chart-container");

convertBtn.addEventListener("click", () => {
  const from = fromCurrency.value;
  const to = toCurrency.value;
  const amount = amountInput.value;

  if (!amount || isNaN(amount)) {
    result.innerText = "Please enter a valid amount.";
    return;
  }

  const url = `https://api.exchangerate.host/convert?from=${from}&to=${to}&amount=${amount}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        const converted = data.result.toFixed(2);
        result.innerText = `${amount} ${from} = ${converted} ${to}`;
        showChart(from, to); // Optional chart
      } else {
        result.innerText = "Conversion failed. Please try again.";
      }
    })
    .catch(error => {
      console.error(error);
      result.innerText = "Error fetching data.";
    });
});

function showChart(from, to) {
  const today = new Date();
  const endDate = today.toISOString().split("T")[0];
  const past = new Date(today.setDate(today.getDate() - 7));
  const startDate = past.toISOString().split("T")[0];

  const url = `https://api.exchangerate.host/timeseries?start_date=${startDate}&end_date=${endDate}&base=${from}&symbols=${to}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const labels = Object.keys(data.rates);
      const values = labels.map(date => data.rates[date][to]);

      renderChart(labels, values, `${from} to ${to}`);
    });
}

function renderChart(labels, data, label) {
  if (window.myChart) window.myChart.destroy(); // Reset chart if it exists

  const ctx = document.getElementById("chart").getContext("2d");
  window.myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [{
        label: label,
        data: data,
        borderColor: "blue",
        fill: false,
      }]
    },
    options: {
      responsive: true,
      scales: {
        x: { display: true, title: { display: true, text: 'Date' } },
        y: { display: true, title: { display: true, text: 'Rate' } }
      }
    }
  });
}



