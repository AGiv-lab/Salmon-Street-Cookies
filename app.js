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

// 8) Stand-alone function: create header row
function renderHeader() {
  const thead = document.createElement('thead');
  const tr = document.createElement('tr');

  // Blank corner cell
  const thBlank = document.createElement('th');
  thBlank.textContent = 'Locations';
  tr.appendChild(thBlank);

  // Hour headers
  for (let i = 0; i < hours.length; i++) {
    const thHour = document.createElement('th');
    thHour.scope = 'col';
    thHour.textContent = hours[i];
    tr.appendChild(thHour);
  }

  // Daily total header
  const thTotal = document.createElement('th');
  thTotal.scope = 'col';
  thTotal.textContent = 'Daily Location Total';
  tr.appendChild(thTotal);

  thead.appendChild(tr);
  tableEl.appendChild(thead);
}

// 9) Stand-alone function: create footer row (hourly totals + grand total)
function renderFooter() {
  const tfoot = document.createElement('tfoot');
  const tr = document.createElement('tr');

  // Footer label cell should be a header cell
  const thTotals = document.createElement('th');
  thTotals.textContent = 'Totals';
  tr.appendChild(thTotals);

  let grandTotal = 0;

  // For each hour, sum across all stores
  for (let hourIndex = 0; hourIndex < hours.length; hourIndex++) {
    let hourlyTotal = 0;

    for (let storeIndex = 0; storeIndex < allStores.length; storeIndex++) {
      hourlyTotal += allStores[storeIndex].hourlyCookies[hourIndex];
    }

    grandTotal += hourlyTotal;

    const thHourTotal = document.createElement('th');
    thHourTotal.textContent = hourlyTotal;
    tr.appendChild(thHourTotal);
  }

   // Grand total cell should also be th (footer row requirement)
  const thGrandTotal = document.createElement('th');
  thGrandTotal.textContent = grandTotal;
  tr.appendChild(thGrandTotal);

  tfoot.appendChild(tr);
  tableEl.appendChild(tfoot);
}

// 10) Build the full table (header + body + footer)
function renderTable() {
  // Clear table first (important if you re-render later)
  tableEl.textContent = '';

  renderHeader();

  const tbody = document.createElement('tbody');

  for (let i = 0; i < allStores.length; i++) {
    allStores[i].generateSales();
    allStores[i].render(tbody);
  }

  tableEl.appendChild(tbody);

  renderFooter();
}

// 11) Create store instances (the starting numbers)
new CookieStore('Seattle', 23, 65, 6.3);
new CookieStore('Tokyo', 3, 24, 1.2);
new CookieStore('Dubai', 11, 38, 3.7);
new CookieStore('Paris', 20, 38, 2.3);
new CookieStore('Lima', 2, 16, 4.6);

// 12) Render on page load
renderTable();