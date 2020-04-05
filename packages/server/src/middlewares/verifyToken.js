import jwt from 'jsonwebtoken';
import User from '../models/User';

const jwtSecret = process.env.JWT_SECRET;

const verifyToken = (req, res, next) => {
  const bearerHeader = req.headers['authorization'];
  if(typeof bearerHeader !== 'undefined') {
    const bearerToken = bearerHeader.split(' ').pop();
    jwt.verify(bearerToken, jwtSecret, (err, authData) => {
      if(err) {
        res.sendStatus(403); // Forbidden
      } else {
        User.findByPk(authData.userInfo.id).then(user => {
          if (user.authToken === bearerToken) {
            req.userInfo = authData.userInfo;
            next();
          } else {
            res.sendStatus(403); // Forbidden
          }
        });
      }
    });
  } else {
    res.sendStatus(401); // Unauthorized
  }
};

export default verifyToken;
