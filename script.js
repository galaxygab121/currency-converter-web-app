const apiKey = "YOUR_ACCESS_KEY"; // <-- Replace this
const apiUrl = `https://api.exchangerate.host/latest`;

const fromCurrency = document.getElementById("from-currency");
const toCurrency = document.getElementById("to-currency");
const amountInput = document.getElementById("amount");
const convertBtn = document.getElementById("convert");
const resultDisplay = document.getElementById("result");

// Fetch available currencies and populate dropdowns
fetch("https://api.exchangerate.host/symbols")
  .then(res => res.json())
  .then(data => {
    const symbols = data.symbols;
    for (let code in symbols) {
      const option1 = document.createElement("option");
      const option2 = document.createElement("option");
      option1.value = option2.value = code;
      option1.text = option2.text = `${code} - ${symbols[code].description}`;
      fromCurrency.appendChild(option1);
      toCurrency.appendChild(option2);
    }

    // Set defaults
    fromCurrency.value = "USD";
    toCurrency.value = "EUR";
  });

// Convert on button click
convertBtn.addEventListener("click", () => {
  const amount = parseFloat(amountInput.value);
  const from = fromCurrency.value;
  const to = toCurrency.value;

  if (!amount || amount <= 0) {
    resultDisplay.textContent = "Please enter a valid amount.";
    return;
  }

  fetch(`${apiUrl}?base=${from}&symbols=${to}`)
    .then(res => res.json())
    .then(data => {
      const rate = data.rates[to];
      const converted = (amount * rate).toFixed(2);
      resultDisplay.textContent = `${amount} ${from} = ${converted} ${to}`;
    })
    .catch(err => {
      resultDisplay.textContent = "Error fetching exchange rate.";
      console.error(err);
    });
});




