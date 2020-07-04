import Sequelize, { Model } from 'sequelize';

class DeliveryProblem extends Model {
  static init(sequelize) {
    super.init(
      {
        description: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.DeliveryOrder, {
      foreignKey: 'delivery_id',
      as: 'deliveryOrder',
    });
  }
}

export default DeliveryProblem;
