import sequelize, { Sequelize } from '../sequelize';

const User = sequelize.define('user', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  emailId: {
    type: Sequelize.STRING,
    allowNull: false
  },
  firstName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  lastName: {
    type: Sequelize.STRING
  },
  authSecret: {
    type: Sequelize.STRING,
    allowNull: false
  },
  authToken: {
    type: Sequelize.STRING
  },
  role: {
    type: Sequelize.ENUM,
    values: ['admin', 'develop', 'subscriber'],
    defaultValue: 'subscriber'
  },
  isActive: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  }
}, {
  // options
});

export default User;
