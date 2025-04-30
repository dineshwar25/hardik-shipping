const form = document.getElementById('shipping-form');
const orderList = document.getElementById('order-list');

if (form) {
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const address = document.getElementById('address').value.trim();

    if (name && address) {
      addOrder(name, address);
      form.reset();
    }
  });
}

function addOrder(name, address) {
  const li = document.createElement('li');
  li.textContent = `${name} - ${address}`;

  const button = document.createElement('button');
  button.textContent = 'Delivered';
  button.onclick = () => li.remove();

  li.appendChild(button);
  orderList.appendChild(li);
}
function initMap() {
  var mapOptions = {
    center: { lat: 37.7749, lng: -122.4194 }, // Initial location (San Francisco)
    zoom: 8,
    mapTypeId: 'roadmap'
  };
  var map = new google.maps.Map(document.getElementById('map'), mapOptions);
}
// Import necessary modules
const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// This will allow Express to parse incoming JSON requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Example "database" - in-memory storage (can be replaced with MongoDB, MySQL, etc.)
let orders = [
  { id: 1, trackingId: 'ABC123', status: 'Shipped' },
  { id: 2, trackingId: 'XYZ456', status: 'In Transit' },
];

// Serve static files (your HTML, CSS, and JS files)
app.use(express.static(path.join(__dirname, 'public')));

// Route to handle order tracking
app.get('/track', (req, res) => {
  const trackingId = req.query.trackingId;

  // Find the order with the matching tracking ID
  const order = orders.find((order) => order.trackingId === trackingId);

  if (order) {
    res.json(order); // Send order data as JSON response
  } else {
    res.status(404).json({ message: 'Order not found' }); // Send error if order is not found
  }
});

// Serve the home page (index.html) when visiting the root of the server
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
