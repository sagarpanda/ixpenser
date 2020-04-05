import express from 'express';
import bodyParser from 'body-parser';
import loginService from './api/loginService';
import logoutService from './api/logoutService';
import userService from './api/userService';
import batchService from './api/batchService';
import resetService from './api/resetService';
import verifyToken from './middlewares/verifyToken';

const port = process.env.PORT;
const dev = process.env.NODE_ENV !== 'production';

const server = express();

server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

// APIs
server.post('/api/login', loginService);
server.post('/api/logout', verifyToken, logoutService);
// API reset
server.post('/api/reset', resetService);
// API user
server.get('/api/users', verifyToken, userService.getAllUser);
server.get('/api/user/:id', verifyToken, userService.getUser);
server.post('/api/user', verifyToken, userService.addUser);
server.put('/api/user/:id', verifyToken, userService.updateUser);
server.delete('/api/user/:id', verifyToken, userService.deleteUser);
// API Batch
server.get('/api/batch', batchService.getAll);
server.post('/api/batch', batchService.add);
server.put('/api/batch/:id', batchService.update);
server.delete('/api/batch/:id', batchService.del);

server.listen(port, err => {
  if (err) {
    throw err;
  } else {
    console.log(`server started at port ${port}`);
  }
});

