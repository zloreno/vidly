const express = require('express');
const generes = require('./routes/genres');
const homepage = require('./routes/homepage');
const logger = require('./middlware/logger');

const app = express();

app.use(express.json());
app.use(logger);
// For every request that points towards this suffix, use that router
app.use('/api/generes', generes);
app.use('/', homepage);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));
