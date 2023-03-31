//import here
import http from 'http';
import express from 'express';
import cors from 'cors';
import os from 'os';

// Constants
const PORT = 3001;
const app = express();
const server = http.createServer(app);

// Middleware
app.use(cors());

// Routes
app.get('/test', (req, res) => {
  res.status(200).json({ message: 'success!' });
});

// Start the server
server.listen(PORT, () => {
  const ipAddress = Object.values(os.networkInterfaces())
    .flat()
    .filter(({ family, internal }) => family === 'IPv4' && !internal)
    .map(({ address }) => address)[0];
  
  console.log(`Server listening at http://${ipAddress}:${PORT}`);
});