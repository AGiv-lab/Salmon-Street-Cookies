'use strict';

const hours = [
 '6am','7am','8am','9am','10am','11am','12pm',
  '1pm','2pm','3pm','4pm','5pm','6pm','7pm' 
];

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// 3) Find the table in the DOM
const tableEl = document.getElementById('sales-table');

// 4) Keep all stores in one array so footer totals can be calculated
const allStores = [];

// 5) Constructor function
function CookieStore(name, minCustomers, maxCustomers, avgCookiesPerCustomer) {
  this.name = name;
  this.minCustomers = minCustomers;
  this.maxCustomers = maxCustomers;
  this.avgCookiesPerCustomer = avgCookiesPerCustomer;

  this.hourlyCookies = [];
  this.dailyTotal = 0;

  allStores.push(this);
}
// 6) Prototype method: generate hourly sales + daily total
CookieStore.prototype.generateSales = function () {
  this.hourlyCookies = [];
  this.dailyTotal = 0;

  for (let i = 0; i < hours.length; i++) {
    const customersThisHour = randomInt(this.minCustomers, this.maxCustomers);
    const cookiesThisHour = Math.round(customersThisHour * this.avgCookiesPerCustomer);

    this.hourlyCookies.push(cookiesThisHour);
    this.dailyTotal += cookiesThisHour;
  }
};

// 7) Prototype method: render ONE store row
CookieStore.prototype.render = function (tbodyEl) {
  const tr = document.createElement('tr');

  // Store name cell (use th for row header)
  const th = document.createElement('th');
  th.scope = 'row';
  th.textContent = this.name;
  tr.appendChild(th);

  // Hourly cookies cells
  for (let i = 0; i < this.hourlyCookies.length; i++) {
    const td = document.createElement('td');
    td.textContent = this.hourlyCookies[i];
    tr.appendChild(td);
  }

  // Daily total cell
  const totalTd = document.createElement('td');
  totalTd.textContent = this.dailyTotal;
  tr.appendChild(totalTd);

  tbodyEl.appendChild(tr);
};
