
import express from 'express';
import request from 'request';
import path from "path";

const app = express();

app.use('/api', function(req, res) {
  req.pipe(request(req.query.server + req.query.url)).pipe(res);
});

/* global __dirname */
app.use(express.static(`${__dirname}/dist`));

app.use('*', function(req, res) {
  res.sendFile(path.resolve(__dirname + '/../dist/index.html'));
});



const server = app.listen(process.env.PORT || 8080, () => {
  console.log(`server running at: ${server.address().port}`);
});



process.on('uncaughtException', function(err) {
  // handle the error safely
  console.log(err)
})
