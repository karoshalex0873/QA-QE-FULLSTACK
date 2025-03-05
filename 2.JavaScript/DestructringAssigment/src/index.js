const user = {
  id: "USER-123456",
  name: {
    first: "Alice",
    last: "Liddell",
  },
  email: "alice@example.com",
  address: {
    shipping: {
      street: "123 Rabbit Hole",
      city: "Wonderland",
      state: "Fantasy",
      postalCode: "12345",
      country: "WL",
    },
    billing: {
      street: "456 Mad Hatter Lane",
      city: "Tea Party",
      state: "Fantasy",
      postalCode: "67890",
      country: "WL",
    },
  },
  payment: {
    total: "100.00",
    currency: "USD",
    details: {
      subtotal: "75.00",
      tax: "15.00",
      shipping: "10.00",
    },
    transactions: [
      { id: "TXN-123", amount: "50.00", description: "Magic Potion" },
      { id: "TXN-456", amount: "50.00", description: "EnchanteSword" },
    ],
  },
};
// destructuring
const {
  id,
  name: { first, last },
  email,
  address: {
    shipping: { street, city, state, postalCode },
    billing: {
      street: billingStreet,
      city: billingCity,
      state: billingState,
      postalCode: billingPostalcode,
      country: billingCountry,
    },
  },
  payment: { total, currency, transactions },
} = user;

// let append = document.getElementById('personal-info')
// append.innerHTML=`${id},${first} `
document.querySelector('#personal-info').innerHTML = ` <ul> <li> <strong>User_Id:</strong> ${id} </li> <li> <strong>Names:</strong> ${first} ${last} </li>  <li> <strong>Email:</strong> ${email} </li>  </ul>`;
document.getElementById(
  "shipping-address"
).innerHTML = `<h2>Shipping Address:</h2> <ul> <li><strong>Street:</strong> ${street}</li>  <li><strong>City:</strong> ${city} </li>  <li><strong> State:</strong> ${state}</li>  <li><strong>Postalcode:</strong> ${postalCode} </li> </ul>`;
// bailling address details
document.getElementById("billing-address").innerHTML = `<h2>Billing Address: </h2> <ul><li> <strong>Street:</strong> ${billingStreet} </li><li> <strong>City: </strong>${billingCity}</li> <li> <strong>State:</strong> ${billingState} </li><li><strong>Postal Code:</strong> ${billingPostalcode}</li> <li> <strong>Country:</strong> ${billingCountry}</li>`;

const mapTransactions = transactions.map((info) => {
  return ` <li> ${info.id} ${info.description} ${info.amount}</li>`;
});
document.getElementById(
  "transactions"
).innerHTML = `<h2>Transactions</h2>${mapTransactions}`;
