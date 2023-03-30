//import here
import http from 'http';
import express from 'express';
import cors from 'cors';

//constants here
const Api = express();
const HTTP = http.Server(Api);

//execution here
Api.use(cors());

Api.get('/test', (req, res) => res.status(200).send('success!'));

HTTP.listen(3001, () => {
  console.log('listening on *:3001');
  
});





  
   