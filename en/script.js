function setDefaultOrderValue() {
  const currencySelect = document.getElementById('currency');
  const orderValuePortal = document.getElementById('orderValuePortal');
  const orderValueRestaumatic = document.getElementById('orderValueRestaumatic');

  switch (currencySelect.value) {
    case 'PLN':
      orderValuePortal.value = 77;
      orderValueRestaumatic.value = 77;
      break;
    case 'EUR':
      orderValuePortal.value = 18;
      orderValueRestaumatic.value = 18;
      break;
    case 'CZK':
      orderValuePortal.value = 435;
      orderValueRestaumatic.value = 435;
      break;
    case 'RON':
      orderValuePortal.value = 88;
      orderValueRestaumatic.value = 88;
      break;
  }
  refreshCalculations('Portal');
  refreshCalculations('Restaumatic');
}

function refreshCalculations(calculatorType) {
  calculate(calculatorType);
}

function calculate(calculatorType) {
  const commissionField = document.getElementById(`commission${calculatorType}`);
  const orderValueField = document.getElementById(`orderValue${calculatorType}`);
  const discountField = document.getElementById(`discount${calculatorType}`);

  const commission = parseFloat(commissionField.value) || 0;
  const orderValue = parseFloat(orderValueField.value) || 0;
  const discount = parseFloat(discountField.value) || 0;

  const discountedOrderValue = orderValue - (orderValue * (discount / 100));
  const calculatedCommission = (discountedOrderValue * (commission / 100)).toFixed(2);
  const calculatedRevenue = (discountedOrderValue - calculatedCommission).toFixed(2);

  const currencySymbol = document.getElementById('currency').value;

  document.getElementById(`calculatedOrderValue${calculatorType}`).textContent = `Order value after discount: ${discountedOrderValue.toFixed(2)} ${currencySymbol}`;
  document.getElementById(`calculatedCommission${calculatorType}`).textContent = `Commission to be paid: ${calculatedCommission} ${currencySymbol}`;
  document.getElementById(`calculatedRevenue${calculatorType}`).textContent = `Revenue: ${calculatedRevenue} ${currencySymbol}`;

  const revenueDifference = (
    parseFloat(document.getElementById('calculatedRevenuePortal').textContent.split(' ')[1]) -
    parseFloat(document.getElementById('calculatedRevenueRestaumatic').textContent.split(' ')[1])
  ).toFixed(2);

  const color = revenueDifference <= 0 ? "green" : "red";
  const text = revenueDifference <= 0
    ? `${Math.abs(revenueDifference)} ${currencySymbol} (in favor of Restaumatic)`
    : `${Math.abs(revenueDifference)} ${currencySymbol} (in favor of the portal)`;
  document.getElementById('revenueDifference').textContent = text;
  document.getElementById('revenueDifference').style.backgroundColor = color;
}

window.onload = function () {
  setDefaultOrderValue();
};

function handleEnterKey(event, calculatorType) {
  if (event.key === 'Enter') {
    calculate(calculatorType);
  }
}

document.getElementById('commissionPortal').addEventListener('keypress', function (event) {
  handleEnterKey(event, 'Portal');
});

document.getElementById('orderValuePortal').addEventListener('keypress', function (event) {
  handleEnterKey(event, 'Portal');
});

document.getElementById('discountPortal').addEventListener('keypress', function (event) {
  handleEnterKey(event, 'Portal');
});

document.getElementById('commissionRestaumatic').addEventListener('keypress', function (event) {
  handleEnterKey(event, 'Restaumatic');
});

document.getElementById('orderValueRestaumatic').addEventListener('keypress', function (event) {
  handleEnterKey(event, 'Restaumatic');
});

document.getElementById('discountRestaumatic').addEventListener('keypress', function (event) {
  handleEnterKey(event, 'Restaumatic');
});

document.getElementById('currency').addEventListener('keypress', function (event) {
  handleEnterKey(event, 'Portal');
});