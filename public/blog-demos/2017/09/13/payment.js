function calculateTotal(displayItems) {
  return String(displayItems.reduce((sum, item) => sum + Number(item.amount.value), 0));
}

function getTotal(displayItems) {
  return {
    label: 'Suma',
    amount: { currency: 'PLN', value: calculateTotal(displayItems) },
  };
}

const shipmentItems = {
  economy: {
    id: 'economy',
    label: 'Ekonomiczna (5-30 dni)',
    selected: true,
    amount: {
      currency: 'PLN',
      value: '7.5',
    },
  },
  pickup: {
    id: 'pickup',
    label: 'Odbiór własny',
    amount: {
      currency: 'PLN',
      value: '0',
    },
  },
};

const bucket = [
  {
    label: 'Abonament roczny',
    amount: { currency: 'PLN', value: '99.99' },
  },
  {
    label: 'Rabat 10% dla stałych czytelników',
    amount: { currency: 'PLN', value: '-10.00' },
  },
];

const paymentMethods = [
  {
    supportedMethods: ['basic-card'],
    data: {
      supportedNetworks: ['visa'],
    },
  },
];

const shippingOptions = [shipmentItems.economy, shipmentItems.pickup];
const displayItems = [...bucket, shipmentItems.economy];

const details = {
  displayItems,
  shippingOptions,
  total: getTotal(displayItems),
};

const options = {
  requestPayerName: true,
  requestPayerEmail: true,
  requestPayerPhone: true,
  requestShipping: true,
  shippingType: 'shipping',
};

function showPayment() {
  const payment = new PaymentRequest(paymentMethods, details, options);
  payment.addEventListener('shippingoptionchange', onShippingOptionChange);

  payment.show().then(onPaymentSuccess).catch(onPaymentError);
}

function doSomethingWithTheData(result) {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve({ ok: true }), 3000);
  });
}

function onShippingOptionChange(e) {
  for (let i in shipmentItems) {
    shipmentItems[i].selected = false;
  }

  const shippingType = e.target.shippingOption;
  const selectedShipmentItem = shipmentItems[shippingType];
  const displayItems = [...bucket, selectedShipmentItem];
  selectedShipmentItem.selected = true;
  event.updateWith({
    total: getTotal(displayItems),
    shippingOptions,
    displayItems,
  });
}

function onPaymentSuccess(result) {
  return doSomethingWithTheData(result).then((response) => {
    if (response.ok) {
      return result.complete('success'); // udało się zapłacić
    } else {
      return result.complete('fail'); // niepowodzenie
    }
  });
}

function onPaymentError(err) {
  console.error(err);
}

const button = document.querySelector('button');

if (!window.PaymentRequest) {
  button.hidden = true;
  const errorMessage = document.createElement('p');
  errorMessage.textContent = 'Niestety Twoja przeglądarka nie obsługuje Payment Request API';
  document.body.appendChild(errorMessage);
} else {
  button.addEventListener('click', () => showPayment());
}
