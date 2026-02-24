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
