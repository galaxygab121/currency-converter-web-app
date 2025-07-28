<<<<<<< HEAD
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
=======
const apiKey = 'ac94e8328eba03faa54aa0efe1b50527';
const apiUrl = `http://api.currencylayer.com/live?access_key=${apiKey}`;
const fromCurrency = document.getElementById('from-currency');
const toCurrency = document.getElementById('to-currency');
const resultDiv = document.getElementById('result');

async function loadCurrencies() {
    try {
      const res = await fetch(apiUrl);
      const data = await res.json();
  
      if (!data.success) {
        throw new Error(data.error.info);
      }
  
      const quotes = data.quotes;
      const currencyCodes = new Set(['USD']); // Include USD manually
  
      Object.keys(quotes).forEach(code => {
        currencyCodes.add(code.replace('USD', ''));
      });
  
      currencyCodes.forEach(code => {
        const option1 = document.createElement('option');
        const option2 = document.createElement('option');
        option1.value = code;
        option2.value = code;
        option1.textContent = code;
        option2.textContent = code;
        fromCurrency.appendChild(option1);
        toCurrency.appendChild(option2);
      });
  
      fromCurrency.value = 'USD';
      toCurrency.value = 'EUR';
  
    } catch (err) {
      resultDiv.textContent = 'Error loading currencies: ' + err.message;
    }
  }
  

async function convertCurrency() {
  const amount = parseFloat(document.getElementById('amount').value);
  const from = fromCurrency.value;
  const to = toCurrency.value;

  if (!amount || !from || !to) {
    resultDiv.textContent = 'Please fill all fields.';
>>>>>>> 2cc519d6d8ec4d2454f0321ff4bf607388d06034
    return;
  }

  try {
<<<<<<< HEAD
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


=======
    const res = await fetch(apiUrl);
    const data = await res.json();
>>>>>>> 2cc519d6d8ec4d2454f0321ff4bf607388d06034

    if (!data.success) {
      throw new Error(data.error.info);
    }

    const rateFrom = from === 'USD' ? 1 : data.quotes['USD' + from];
    const rateTo = to === 'USD' ? 1 : data.quotes['USD' + to];
    const converted = (amount / rateFrom) * rateTo;

    resultDiv.textContent = `${amount} ${from} = ${converted.toFixed(2)} ${to}`;

  } catch (err) {
    resultDiv.textContent = 'Conversion error: ' + err.message;
  }
}

loadCurrencies();

