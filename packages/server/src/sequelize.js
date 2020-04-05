import Sequelize from 'sequelize';
import dbConfig from '../config/database';

const cfg = dbConfig[process.env.NODE_ENV];

const sequelize = new Sequelize({
  dialect: cfg.dialect,
  storage: cfg.storage
});

sequelize.authenticate()
.then(() => {
  console.log('Connection has been established successfully.');
})
.catch(err => {
  console.error('Unable to connect to the database:', err);
});

export { Sequelize };

export default sequelize;
