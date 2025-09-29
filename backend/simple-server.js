const express = require('express');
const app = express();
const port = 5000;

app.get('/', (req, res) => {
  res.json({ message: 'Simple server is running!' });
});

app.listen(port, () => {
  console.log(`Simple server running on port ${port}`);
});