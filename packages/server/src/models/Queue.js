import sequelize, { Sequelize } from '../sequelize';

const Queue = sequelize.define('queue', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  batchName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  params: {
    type: Sequelize.STRING
  },
  priority: { // higher number will run first
    type: Sequelize.INTEGER,
    defaultValue: 1
  },
  status: {
    type: Sequelize.ENUM,
    values: ['open', 'inProgress', 'done', 'error'],
    defaultValue: 'open'
  }
}, {
  // options
});

export default Queue;
