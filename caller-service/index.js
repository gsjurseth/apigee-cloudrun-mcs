const express = require('express'),
  morgan = require('morgan'),
  axios = require('axios');

const app = express();

const PORT            = process.env.PORT            || 8000;
const APP_NAME        = process.env.APP_NAME        || "callerApp";
const SERVICE_SCHEME  = process.env.SERVICE_SCHEME  || "http";
const SERVICE_SUFFIX  = process.env.SERVICE_SUFFIX  || "localhost";
const SERVICE_PORT    = process.env.SERVICE_PORT    || 8000;
const SERVICE_KEY     = process.env.SERVICE_KEY     || "cecinepasunecle";

const logger = morgan('combined');

app.use(logger);
app.use(express.json());

app.get('/', (req, res) => {
  let o = {
    "message": "hello world! From another service in this case"
  };
  res.json(o)
});

app.get('/callservice/:sid', async (req, res) => {
  let url = `${SERVICE_SCHEME}://${req.params.sid}${SERVICE_SUFFIX}:${SERVICE_PORT}/foo`;
  console.log('About to call: ', url);
  await axios.get( url, {
    "headers": {
      "x-api-key": SERVICE_KEY
    }
  })
  .then( d => {
    res.json( d.data );
  })
  .catch( e => {
    if (e.response)  {
      let errorObject = { 
        status: e.response.status,
        statusText: e.response.statusText
      };
      console.error("we failed with: ", errorObject);
      res.status(errorObject.status).json(errorObject);
    }
    else {
      res.status(500).json( {"msg": "unexpected failure"} );
    }
  });
});

app.get('/callhttpbin', async (req, res) => {
  let json = '{ "message": "This is an httpbin call" }';
  await axios.post( `http://httpbin.org/post`, 
    JSON.stringify( json ), {
    "headers": {
      "Content-Type": "application/josn",
      "Accept": "application/json"
    }}
  )
  .then( d => {
    res.json( d.data );
  })
  .catch( e => {
    if (e.response)  {
      let errorObject = { 
        status: e.response.status,
        statusText: e.response.statusText
      };
      console.error("we failed with: ", errorObject);
      res.status(errorObject.status).json(errorObject);
    }
    else {
      res.status(500).json( {"msg": "unexpected failure"} );
    }
  });
});

app.listen(PORT, () => {
  console.log(`${APP_NAME} listening on port ${PORT}`)
});
