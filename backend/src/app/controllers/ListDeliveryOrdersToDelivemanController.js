import DeliveryOrder from '../models/DeliveryOrder';
import File from '../models/File';
import Recipient from '../models/Recipient';

class ListDeliveryOrdersToDelivemanController {
  async index(req, res) {
    const { id } = req.params;
    const { delivery, page = 1 } = req.query;

    const deliveryOrders = await DeliveryOrder.findAll({
      limit: 10,
      offset: (page - 1) * 10,
      order: [['id', 'asc']],

      where: {
        deliveryman_id: id,
        canceled_at: null,
        end_date: delivery === 'true' ? delivery : null,
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

    return res.json(deliveryOrders);
  }
}

export default new ListDeliveryOrdersToDelivemanController();
