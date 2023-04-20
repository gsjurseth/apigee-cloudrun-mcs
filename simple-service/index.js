const express = require('express'),
  morgan = require('morgan');

const app = express();
const port = 8000

const SVC_NAME = process.env.TARGET_NAME;

app.use(morgan('combined'));
app.use(express.json());

app.get('/', (req, res) => {
  let o = {
    "message": "hello world! From service: ${SVC_NAME}"
  };
  res.json(o)
});

app.get('/foo', (req, res) => {
  let o = {
    "message": `This is foo returned from: ${SVC_NAME}`
  };
  res.json(o)
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
