import { Op } from 'sequelize';
import Deliveryman from '../models/Deliveryman';
import DeliveryOrder from '../models/DeliveryOrder';
import File from '../models/File';
import Recipient from '../models/Recipient';

class ListDeliveryOrdersToDelivemanController {
  async index(req, res) {
    const { id } = req.params;
    const { page = 1 } = req.query;

    const deliveryOrders = await DeliveryOrder.findAll({
      limit: 10,
      offset: (page - 1) * 10,
      order: [['id', 'asc']],

      where: {
        deliveryman_id: id,
        canceled_at: null,
        end_date: { [Op.is]: null },
      },
      attributes: ['id', 'product', 'start_date', 'end_date', 'createdAt'],
      include: [
        {
          model: File,
          as: 'signature',
          attributes: ['url', 'path'],
        },
        {
          model: Recipient,
          as: 'recipient',
          attributes: [
            'name',
            'street',
            'number',
            'complement_address',
            'state',
            'city',
            'zip_code',
          ],
        },
      ],
    });

    const deliveryman = await Deliveryman.findByPk(id);

    if (!deliveryman) {
      res.status(400).json({
        error: 'Não existe entregador(a) informado. Verifique seu cadastrado.',
      });
    }

    const searchDeliveryOrderToDeliveryman = await DeliveryOrder.findOne({
      where: {
        deliveryman_id: id,
      },
    });

    if (!searchDeliveryOrderToDeliveryman) {
      return res.json({ msg: 'Ainda não há entregas cadastras para voĉe.' });
    }

    return res.json(deliveryOrders);
  }
}

export default new ListDeliveryOrdersToDelivemanController();
