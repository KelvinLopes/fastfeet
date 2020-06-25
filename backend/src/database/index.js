import Sequelize from 'sequelize';
import databaseConfig from '../config/database';

import User from '../app/models/User';
import Recipient from '../app/models/Recipient';
import File from '../app/models/File';
import Deliveryman from '../app/models/Deliveryman';
import DeliveryProblem from '../app/models/DeliveryProblem';
import DeliveryOrder from '../app/models/DeliveryOrder';

const models = [
  User,
  Recipient,
  File,
  Deliveryman,
  DeliveryProblem,
  DeliveryOrder,
];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models.map(model => model.init(this.connection));

    models.map(
      model => model.associate && model.associate(this.connection.models)
    );
  }
}

export default new Database();
