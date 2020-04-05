import sequelize from '../sequelize';
import User from '../models/User';
import Queue from '../models/Queue';

const resetService = (req, res) => {
  sequelize.sync({ force: true })
  .then(() => {
    // console.log(`Database & tables created!`)
    const record = {
      "emailId": "dinesh@yopmail.com",
      "authSecret": "{\"ascii\":\"UgGQnMS4Wbsfd$BfMdI^\",\"hex\":\"556747516e4d533457627366642442664d64495e\",\"base32\":\"KVTUOULOJVJTIV3CONTGIJCCMZGWISK6\",\"otpauth_url\":\"otpauth://totp/SecretKey?secret=KVTUOULOJVJTIV3CONTGIJCCMZGWISK6\"}",
      "firstName": "Dinesh",
      "lastName": "Panda",
      "role": "admin"
    }
    User.create(record)
      .then(arg => {
        res.send('Database & tables reset!')
      })
      .catch(err => {
        res.send('Error!')
      })
  })
}

export default resetService;
