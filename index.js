// modules
const express = require('express');
const app = express();

// require logging first just in case anything fails
require('./startup/logging')();
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();
require('./startup/validation')();

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));
