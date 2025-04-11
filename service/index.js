const express = require('express');
const app = express();
const PORT = 3000;

//lets create the arrays that we want to have on the backend


app.get('/try', (req, res) => {
    res.json({ msg: `${getRandomInt(1,20)}` });
    });

// Simple root route
app.get('/', (req, res) => {
  res.json({ msg: 'Rollerskate Service' });
});

// Catch-all route
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}