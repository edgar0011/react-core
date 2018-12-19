
import express from 'express';
import request from 'request';

const app = express();

app.use('/api', function(req, res) {
  req.pipe(request(req.query.server + req.query.url)).pipe(res);
});

/* global __dirname */
app.use(express.static(`${__dirname}/dist`));


const server = app.listen(process.env.PORT || 8080, () => {
  console.log(`server running at: ${server.address().port}`);
});
