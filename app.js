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
function CookieStore(name, minCustomers, maxCustomers, avgCookiesPerCustomer, address, hoursOpen, contactInfo) {
  this.name = name;
  this.minCustomers = minCustomers;
  this.maxCustomers = maxCustomers;
  this.avgCookiesPerCustomer = avgCookiesPerCustomer;

  this.address = address;
  this.hoursOpen = hoursOpen;
  this.contactInfo = contactInfo;

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

function renderHeader() {
  const thead = document.createElement('thead');

  // Caption (added once each render because table is cleared)
  const caption = document.createElement('caption');
  caption.textContent = 'Hourly Cookie Sales by Location';
  tableEl.appendChild(caption);

  const tr = document.createElement('tr');

  const thBlank = document.createElement('th');
  thBlank.textContent = 'Locations';
  tr.appendChild(thBlank);

  for (let i = 0; i < hours.length; i++) {
    const thHour = document.createElement('th');
    thHour.scope = 'col';
    thHour.textContent = hours[i];
    tr.appendChild(thHour);
  }

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

function renderTable() {
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

new CookieStore('Seattle', 23, 65, 6.3,
  '2901 3rd Ave #300, Seattle, WA 98121',
  '6:00am – 7:00pm',
  '(206) 555-0123');

new CookieStore('Tokyo', 3, 24, 1.2,
  '1 Chome-1-2 Oshiage, Sumida City, Tokyo 131-8634',
  '6:00am – 7:00pm',
  '+81 3-5555-0101');

new CookieStore('Dubai', 11, 38, 3.7,
  '1 Sheikh Mohammed bin Rashid Blvd, Dubai',
  '6:00am – 7:00pm',
  '+971 4 555 0199');

new CookieStore('Paris', 20, 38, 2.3,
  'Champ de Mars, 5 Av. Anatole France, 75007 Paris',
  '6:00am – 7:00pm',
  '+33 1 55 55 01 55');

new CookieStore('Lima', 2, 16, 4.6,
  'Ca. Gral. Borgoño cuadra 8, Miraflores 15074',
  '6:00am – 7:00pm',
  '+51 1 555 0144');

new CookieStore('Bucharest', 15, 40, 4.2,
  'Strada Lipscani 12, București 030031',
  '6:00am – 7:00pm',
  '+40 21 555 0108');

let storeForm = document.getElementById('store-form');
if (storeForm) {
  storeForm.addEventListener('submit', handleStoreSubmit);
}

function handleStoreSubmit(event) {

  event.preventDefault();

  const name = document.getElementById('store-name').value.trim();
  const min = Number(document.getElementById('store-min').value);
  const max = Number(document.getElementById('store-max').value);
  const avg = Number(document.getElementById('store-avg').value);

  if (min > max) {
    alert("Minimum customers cannot be greater than maximum customers.");
    return;
  }
const address = `${name} Downtown, 100 Main St`;
const hoursOpen = '6:00am – 7:00pm';
const contactInfo = '(000) 555-0100';

 new CookieStore(name, min, max, avg, address, hoursOpen, contactInfo);

  storeForm.reset();
}

function renderLocationsHomePage() {
  const locationsEl = document.getElementById('locations');
  if (!locationsEl) return; // only runs on index.html

  locationsEl.textContent = '';

  for (let i = 0; i < allStores.length; i++) {
    const store = allStores[i];

    const article = document.createElement('article');
    article.className = 'location-card';

    const h3 = document.createElement('h3');
    h3.textContent = store.name;

    const address = document.createElement('p');
    address.textContent = `Address: ${store.address}`;

    const hours = document.createElement('p');
    hours.textContent = `Hours Open: ${store.hoursOpen}`;

    const contact = document.createElement('p');
    contact.textContent = `Contact: ${store.contactInfo}`;

    article.appendChild(h3);
    article.appendChild(address);
    article.appendChild(hours);
    article.appendChild(contact);

    locationsEl.appendChild(article);
  }
}
renderLocationsHomePage();

if (tableEl) {
  renderTable();
}