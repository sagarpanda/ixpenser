import User from '../models/User';

const logoutService = (req, res) => {
  const { id } = req.userInfo;
  User.update({ authToken: null}, {  where: { id } })
    .then(d => {
      res.status(200).json({ status: true });
    })
    .catch(err => {
      res.status(500).json({ status: false });
    });
};

export default logoutService;
