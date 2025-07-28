const apiKey = "ac94e8328eba03faa54aa0efe1b50527";
const endpoint = "http://api.currencylayer.com/live";

const currencyMap = {
  USD: "US Dollar",
  CAD: "Canadian Dollar",
  AUD: "Australian Dollar",
  MXN: "Mexican Peso",
  PLN: "Polish Zloty"
};

window.onload = () => {
  const fromSelect = document.getElementById("fromCurrency");
  const toSelect = document.getElementById("toCurrency");

  for (let code in currencyMap) {
    const optionFrom = new Option(`${currencyMap[code]} (${code})`, code);
    const optionTo = new Option(`${currencyMap[code]} (${code})`, code);
    fromSelect.appendChild(optionFrom);
    toSelect.appendChild(optionTo);
  }

  fromSelect.value = "USD";
  toSelect.value = "CAD";
};

async function convertCurrency() {
  const amount = parseFloat(document.getElementById("amount").value);
  const from = document.getElementById("fromCurrency").value;
  const to = document.getElementById("toCurrency").value;
  const resultDiv = document.getElementById("result");

  if (!amount || amount <= 0) {
    resultDiv.textContent = "Please enter a valid amount.";
    return;
  }

  try {
    const res = await fetch(`${endpoint}?access_key=${apiKey}`);
    const data = await res.json();

    if (!data.success) {
      resultDiv.textContent = "Error fetching exchange rates.";
      return;
    }

    const quotes = data.quotes;

    let converted;

    if (from === to) {
      converted = amount;
    } else if (from === "USD") {
      const usdToTo = quotes["USD" + to];
      converted = amount * usdToTo;
    } else if (to === "USD") {
      const usdToFrom = quotes["USD" + from];
      converted = amount / usdToFrom;
    } else {
      const usdToFrom = quotes["USD" + from];
      const usdToTo = quotes["USD" + to];
      converted = (amount / usdToFrom) * usdToTo;
    }

    resultDiv.textContent = `${amount} ${from} = ${converted.toFixed(2)} ${to}`;
  } catch (error) {
    resultDiv.textContent = "An error occurred while converting.";
    console.error(error);
  }
}



    if (!data.success) {
      throw new Error(data.error.info);
    }

    const rateFrom = from === 'USD' ? 1 : data.quotes['USD' + from];
    const rateTo = to === 'USD' ? 1 : data.quotes['USD' + to];
    const converted = (amount / rateFrom) * rateTo;

    resultDiv.textContent = `${amount} ${from} = ${converted.toFixed(2)} ${to}`;

    try {
      
    } catch (err) {
      console.error("An error occurred:", err);
    }
    resultDiv.textContent = 'Conversion error: ' + err.message;
  


loadCurrencies();

