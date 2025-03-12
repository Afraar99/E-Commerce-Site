const express = require('express');
const app = express();
app.listen(8000, () => {
  console.log('Server listening to Port 8000 in production');
});