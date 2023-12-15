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

  document.getElementById(`calculatedOrderValue${calculatorType}`).textContent = `Wartość zamówienia po zniżce: ${discountedOrderValue.toFixed(2)} PLN`;
  document.getElementById(`calculatedCommission${calculatorType}`).textContent = `Prowizja do zapłaty: ${calculatedCommission} PLN`;
  document.getElementById(`calculatedRevenue${calculatorType}`).textContent = `Przychód: ${calculatedRevenue} PLN`;

  const revenueDifference = (
    parseFloat(document.getElementById('calculatedRevenuePortal').textContent.split(' ')[1]) -
    parseFloat(document.getElementById('calculatedRevenueRestaumatic').textContent.split(' ')[1])
  ).toFixed(2);

  const color = revenueDifference <= 0 ? "green" : "red";
  const text = revenueDifference <= 0
    ? `${Math.abs(revenueDifference)} PLN (na korzyść Restaumatic)`
    : `${Math.abs(revenueDifference)} PLN (na korzyść portalu)`;
  document.getElementById('revenueDifference').textContent = text;
  document.getElementById('revenueDifference').style.backgroundColor = color;
}

window.onload = function () {
  calculate('Portal');
  calculate('Restaumatic');
};