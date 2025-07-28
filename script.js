const fromCurrency = document.getElementById("from-currency");
const toCurrency = document.getElementById("to-currency");
const result = document.getElementById("result");

fetch("https://api.exchangerate.host/symbols")
  .then(res => res.json())
  .then(data => {
    const symbols = Object.keys(data.symbols);
    symbols.forEach(symbol => {
      fromCurrency.innerHTML += `<option value="${symbol}">${symbol}</option>`;
      toCurrency.innerHTML += `<option value="${symbol}">${symbol}</option>`;
    });
  });

function convertCurrency() {
  const amount = document.getElementById("amount").value;
  const from = fromCurrency.value;
  const to = toCurrency.value;

  fetch(`https://api.exchangerate.host/convert?from=${from}&to=${to}&amount=${amount}`)
    .then(res => res.json())
    .then(data => {
      result.innerText = `${amount} ${from} = ${data.result.toFixed(2)} ${to}`;
    });
}
