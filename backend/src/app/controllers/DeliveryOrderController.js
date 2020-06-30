import * as Yup from 'yup';
import DeliveryOrder from '../models/DeliveryOrder';
import Recipient from '../models/Recipient';
import File from '../models/File';
import Deliveryman from '../models/Deliveryman';
import Que from '../../lib/Queue';

class DeliveryOrderController {
  async store(req, res) {
    const schema = Yup.object().shape({
      deliveryman_id: Yup.number().required(),
      recipient_id: Yup.number().required(),
      product: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validação falhou.' });
    }

    const { deliveryman_id, recipient_id, product } = req.body;

    const recipient = await Recipient.findByPk(recipient_id);
    const deliveryman = await Deliveryman.findByPk(deliveryman_id);

    if (!recipient) {
      return res.status(400).json({
        error:
          'Não existe cadastrado para o destinátario(a) ou entregador(a) informado(a).',
      });
    }

    if (!deliveryman) {
      return res.status(400).json({
        error:
          'Não existe cadastrado para o destinátario(a) ou entregador(a) informado(a).',
      });
    }
    const deliveryOrder = await DeliveryOrder.create({
      deliveryman_id,
      recipient_id,
      product,
    });

    return res.json(deliveryOrder);
  }

  async index(req, res) {
    const { page = 1 } = req.query;

    const DeliveryOrderList = await DeliveryOrder.findAll({
      limit: 10,
      offset: (page - 1) * 10,
      order: [['id', 'asc']],
      attributes: ['id', 'product', 'start_date', 'end_date', 'canceled_at'],
      include: [
        {
          model: Deliveryman,
          as: 'deliveryman',
          attributes: ['id', 'name'],
        },
        {
          model: Recipient,
          as: 'recipient',
          attributes: [
            'id',
            'name',
            'street',
            'number',
            'complement_address',
            'state',
            'city',
            'zip_code',
          ],
        },
        {
          model: File,
          as: 'signature',
          attributes: ['id', 'url', 'path'],
        },
      ],
    });

    return res.json(DeliveryOrderList);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      deliveryman_id: Yup.number().required(),
      recipient_id: Yup.number().required(),
      product: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validação falhou.' });
    }

    const { id } = req.params;
    const deliveryOrder = await DeliveryOrder.findByPk(id);
    const { deliveryman_id, recipient_id } = req.body;

    const recipient = await Recipient.findByPk(recipient_id);
    const deliveryman = await Deliveryman.findByPk(deliveryman_id);

    if (!deliveryOrder) {
      return res.status(400).json({
        error: 'Não existe uma ordem de entrega com os dados informados.',
      });
    }

    if (!recipient) {
      return res.status(400).json({
        error:
          'Não existe cadastrado para o destinátario(a) ou entregador(a) informado(a).',
      });
    }

    if (!deliveryman) {
      return res.status(400).json({
        error:
          'Não existe cadastrado para o destinátario(a) ou entregador(a) informado(a).',
      });
    }
    await deliveryOrder.update(req.body);

    return res.json(deliveryOrder);
  }

  async delete(req, res) {
    const schema = Yup.object().shape({ id: Yup.number().required() });
    const { id } = req.params;

    if (!(await schema.isValid(req.params))) {
      return res.status().json({ error: 'A validação falhou.' });
    }

    const deliveryOrder = await DeliveryOrder.findByPk(id);

    if (!deliveryOrder) {
      return res.status(400).json({
        error:
          'Essa ordem de entrega não existe ou já foi deletada do sistema.',
      });
    }
    await deliveryOrder.destroy(id);
    return res.json({ msg: 'Ordem de entrega excluída com sucesso.' });
  }
}

export default new DeliveryOrderController();
