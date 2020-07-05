import * as Yup from 'yup';
import { Op } from 'sequelize';
import DeliveryProblem from '../models/DeliveryProblem';
import DeliveryOrder from '../models/DeliveryOrder';

class DeliveryEditProblemController {
  async update(req, res) {
    const schema = Yup.object().shape({
      id: Yup.number().required(),
      description: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'A validação falhou.' });
    }

    const { id } = req.body;

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
          'Essa ordem de entrega não possuí uma descrição de problema para editar.',
      });
    }

    const deliveryProblem = await DeliveryProblem.findOne({
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
          canceled_at: { [Op.ne]: null },
        },
      ],
      description: { [Op.ne]: null },
    });

    if (!deliveryProblem) {
      return res.status(400).json({ error: 'Dados informados inválidos.' });
    }

    const { description } = req.body;

    await deliveryProblem.update({
      description,
    });

    return res.json(deliveryProblem);
  }
}

export default new DeliveryEditProblemController();
