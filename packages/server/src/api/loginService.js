import jwt from 'jsonwebtoken';
import User from '../models/User';
import otpAuth from '../utils/otpAuth';
import cfg from '../../config/config';

const jwtSecret = process.env.JWT_SECRET;

const loginService = (req, res) => {
  const { emailId, otp } = req.body;
  User.findOne({ where: { emailId } }).then(record => {
    let tokenValidates = false;
    if (record) {
      const secret = JSON.parse(record.authSecret);
      tokenValidates = otpAuth.verify(otp, secret);
      if (tokenValidates) {
        const userInfo = { id: record.id, emailId, firstName: record.firstName };
        jwt.sign({userInfo}, jwtSecret, { expiresIn: cfg.jwtExpiresIn }, (err, token) => {
          User.update({ authToken: token}, {
            where: { id: record.id }
          })
          .then(d => {
            res.status(200).json({ token });
          });
        });
      } else {
        res.sendStatus(403);
      }
    } else {
      res.sendStatus(403);
    }
  });
};

export default loginService;
