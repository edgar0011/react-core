
import express from 'express';

const app = express();

/* global __dirname */
app.use(express.static(`${__dirname}/dist`));

const server = app.listen(process.env.PORT || 8080, () => {
  console.log(`server running at: ${server.address().port}`);
});
