import Promise from 'bluebird';
import QRCode from 'qrcode';
import jwt from 'jsonwebtoken';
import ldPick from 'lodash/pick';
import otpAuth from '../utils/otpAuth';
import welcomeMail from '../utils/welcomeMail';
import User from '../models/User';
import cfg from '../../config/config';

const QRCodeToDataURL = Promise.promisify(QRCode.toDataURL);

/*
 *  add new User
 */
const addUser = (req, res) => {
  const { emailId, firstName, lastName } = req.body;
  const secret = otpAuth.generate();
  const authSecret = JSON.stringify(secret);

  User.findOne({ where: {emailId} }).then(dd => {
    if (!dd) { // check email not exist
      const result = User.create({ emailId, authSecret, firstName, lastName });
      result
        .then(record => QRCodeToDataURL(secret.otpauth_url))
        .then(data_url => {
          return welcomeMail({ to: emailId, data_url, secret });
        })
        .then(arg => {
          const record = result.value().dataValues;
          res.status(200).json({
            body: { id: record.id, emailId: record.emailId, firstName: record.firstName, lastName: record.lastName },
            status: true
          });
        })
        .catch(err => {
          console.log(err);
          res.json({ status: false });
        });
    } else {
      res.json({ status: false, errMessage: 'Email Id is already exist.' });
    }
  })
};

/*
 *  Update User
 */
const updateUser = (req, res) => {
  const { id } = req.params;
  const opt = ldPick(req.body, ['firstName', 'lastName']);
  User.update(opt, { where: { id } })
    .then(d => {
      res.status(200).json({ status: true });
    })
    .catch(err => {
      res.status(500).json({ status: false });
    })
}

/*
 *  Delete User
 */
const deleteUser = (req, res) => {
  const { id } = req.params;
  User.destroy({ where: { id } }).then(count => {
    if (count === 0) {
      res.status(404).json({ status: false });
    } else {
      res.status(200).json({ status: true });
    }
  });
};

/*
 *  Get Single User
 */
const getUser = (req, res) => {
  const { id } = req.params;
  User.findByPk(id).then(user => {
    res.status(200).json(user)
  });
};

/*
 *  Get all user
 */
const getAllUser = (req, res) => {
  // const filter = {};
  // start with filter
  // const filter = { where: { name: { [Sequelize.Op.like]: `${q}%` } } };
  const attributes = { exclude: ['authSecret', 'authToken'] };
  User.findAll({attributes}).then(users => {
    res.status(200).json(users)
  });
};

export default {
  getAllUser,
  getUser,
  addUser,
  updateUser,
  deleteUser
};
