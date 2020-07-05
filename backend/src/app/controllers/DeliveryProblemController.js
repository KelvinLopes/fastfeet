import * as Yup from 'yup';
import { Op } from 'sequelize';
import DeliveryProblem from '../models/DeliveryProblem';
import DeliveryOrder from '../models/DeliveryOrder';
import Deliveryman from '../models/Deliveryman';

class DeliveryProblemController {
  async store(req, res) {
    const schema = Yup.object().shape({
      delivery_id: Yup.number().required(),
      description: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'A validação falhou.' });
    }

    const { delivery_id } = req.body;
    const deliveryOrder = await DeliveryOrder.findByPk(delivery_id);

    const checkEndedDelivery = await DeliveryOrder.findOne({
      attributes: ['end_date'],
      where: {
        id: delivery_id,
        end_date: { [Op.ne]: null },
      },
    });

    const checkProblemDescription = await DeliveryProblem.findOne({
      order: [['id', 'asc']],
      where: { delivery_id },
      attributes: ['id', 'delivery_id', 'description'],
      include: [
        {
          model: DeliveryOrder,
          as: 'delivery_order',
          attributes: ['id'],
          where: {
            canceled_at: null,
          },
        },
      ],
      description: { [Op.ne]: null },
    });

    const checkCanceledDelivery = await DeliveryOrder.findOne({
      attributes: ['canceled_at'],
      where: {
        id: delivery_id,
        canceled_at: { [Op.ne]: null },
      },
    });

    const checkInitialDelivery = await DeliveryOrder.findOne({
      attributes: ['start_date'],
      where: {
        id: delivery_id,
        start_date: { [Op.ne]: null },
      },
    });

    if (!deliveryOrder) {
      return res.status(400).json({ error: 'Ordem de entrega não existe.' });
    }

    if (checkEndedDelivery) {
      return res.status(400).json({
        error: 'Essa ordem de entrega já foi concluida.',
      });
    }

    if (checkCanceledDelivery) {
      return res.status(400).json({
        error: 'Essa ordem de entrega já foi cancelada.',
      });
    }

    if (!checkInitialDelivery) {
      return res.status(400).json({
        error: 'Essa ordem de entrega ainda não foi inicializada.',
      });
    }

    if (checkProblemDescription) {
      return res.status(400).json({
        error:
          'Essa ordem de entrega já possuí descrição de um problema. Mas, você pode editá lá em: Description Edit Delivery Problems.',
      });
    }

    const { description } = await DeliveryProblem.create(req.body);

    return res.json({ delivery_id, description });
  }

  async index(req, res) {
    const { page = 1 } = req.query;

    const checkListProblems = await DeliveryProblem.findAll({
      order: [['id', 'asc']],
      attributes: ['id', 'description'],
      limit: 10,
      offset: (page - 1) * 10,
      include: [
        {
          model: DeliveryOrder,
          as: 'delivery_order',
          attributes: ['id', 'canceled_at'],
          where: {
            canceled_at: null,
          },
          include: [
            {
              model: Deliveryman,
              as: 'deliveryman',
              attributes: ['name', 'email'],
            },
          ],
        },
      ],
      where: {
        description: { [Op.ne]: null },
      },
    });

    return res.json(checkListProblems);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.params))) {
      return res.status(400).json({ error: 'A validação falhou.' });
    }

    const { id } = req.params;

    const searchDeliveryProblem = await DeliveryOrder.findByPk(id);

    const checkEndedDelivery = await DeliveryOrder.findOne({
      attributes: ['end_date'],
      where: {
        id,
        end_date: { [Op.ne]: null },
      },
    });

    const checkProblemDescriptionToCancelDelivery = await DeliveryProblem.findOne(
      {
        where: { delivery_id: id },
        order: [['id', 'asc']],
        attributes: ['id', 'description'],

        include: [
          {
            model: DeliveryOrder,
            as: 'delivery_order',
            attributes: ['id', 'canceled_at', 'end_date', 'start_date'],
            end_date: { [Op.is]: null },
            start_date: { [Op.ne]: null },
            canceled_at: { [Op.is]: null },
          },
        ],
        description: { [Op.ne]: null },
      }
    );

    const checkInitialDelivery = await DeliveryOrder.findOne({
      attributes: ['start_date'],
      where: {
        id,
        start_date: { [Op.ne]: null },
      },
    });

    const checkCanceledDelivery = await DeliveryOrder.findOne({
      attributes: ['canceled_at'],
      where: {
        id,
        canceled_at: { [Op.ne]: null },
      },
    });

    if (!searchDeliveryProblem) {
      return res.status(400).json({
        error: 'Essa ordem de entrega informada não existe.',
      });
    }

    if (checkCanceledDelivery && !checkProblemDescriptionToCancelDelivery) {
      return res.status(400).json({
        error: 'Essa ordem de entrega já foi cancelada.',
      });
    }

    if (!checkInitialDelivery) {
      return res.status(400).json({
        error: 'Essa ordem de entrega ainda não foi inicializada.',
      });
    }

    if (checkCanceledDelivery) {
      return res.status(400).json({
        error: 'Essa ordem de entrega já foi cancelada.',
      });
    }

    if (checkEndedDelivery) {
      return res.status(400).json({
        error: 'Essa ordem de entrega já foi concluida.',
      });
    }

    if (!checkProblemDescriptionToCancelDelivery) {
      return res.status(400).json({
        error:
          'Essa ordem de entrega não possuí uma descrição de problema para ser cancelada.',
      });
    }

    const deliveryProblem = await DeliveryOrder.findOne({
      where: { id },
      attributes: ['id', 'canceled_at', 'end_date', 'start_date'],
      end_date: { [Op.is]: null },
      start_date: { [Op.ne]: null },
      canceled_at: { [Op.is]: null },
    });

    if (!deliveryProblem) {
      return res.status(400).json({ error: 'Dados informados inválidos.' });
    }

    await deliveryProblem.update({
      canceled_at: new Date(),
    });

    return res.json(deliveryProblem);
  }
}

export default new DeliveryProblemController();
