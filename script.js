const apiKey = 'https://api.exchangerate.host/latest';

async function convertCurrency() {
  const amount = parseFloat(document.getElementById('amount').value);
  const from = document.getElementById('fromCurrency').value;
  const to = document.getElementById('toCurrency').value;

  if (isNaN(amount)) {
    alert('Please enter a valid amount.');
    return;
  }

  try {
    const response = await fetch(`${apiKey}?base=${from}&symbols=${to}`);
    const data = await response.json();

    const rate = data.rates[to];
    const converted = (amount * rate).toFixed(2);

    document.getElementById('result').innerText =
      `${amount} ${from} = ${converted} ${to}`;
  } catch (error) {
    console.error('Error fetching exchange rate:', error);
    alert('Something went wrong. Try again later.');
  }
}


