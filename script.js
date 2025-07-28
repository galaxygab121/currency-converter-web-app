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
    return;
  }

  try {
    const res = await fetch(apiUrl);
    const data = await res.json();

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

