import * as Yup from 'yup';
import { startOfDay, setHours, isWithinInterval } from 'date-fns';
import { Op } from 'sequelize';
import DeliveryOrder from '../models/DeliveryOrder';
import Signature from '../models/File';

class DeliveryController {
  async store(req, res) {
    const schema = Yup.object().shape({
      deliveryOrder_id: Yup.number().required(),
      deliveryman_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'A validação falhou.' });
    }

    const { deliveryOrder_id, deliveryman_id } = req.body;

    const deliveryOrder = await DeliveryOrder.findOne({
      where: {
        id: deliveryOrder_id,
        deliveryman_id,
        start_date: null,
        end_date: null,
        canceled_at: null,
        createdAt: {
          [Op.gte]: new Date(new Date() - 360 * 12 * 30 * 24 * 60 * 60 * 1000),
        },
      },
    });

    const startDate = new Date();
    const currentDate = startOfDay(startDate);

    if (
      !isWithinInterval(startDate, {
        start: setHours(currentDate, 8),
        end: setHours(currentDate, 18),
      })
    ) {
      return res.status(400).json({
        error:
          'Horário inválido para a coleta. Tente novamente no horário correto: 8:00 às 18:00 horas.',
      });
    }

    if (!deliveryOrder) {
      return res.status(400).json({
        error:
          'Ordem de entrega não foi encontrada ou não existe. Verifique se já foi inicializada.',
      });
    }

    const deliveryOrdesDeliveryman = await DeliveryOrder.findAll({
      where: {
        deliveryman_id,
        start_date: { [Op.ne]: null },
        createdAt: {
          [Op.gte]: new Date(new Date() - 360 * 12 * 30 * 24 * 60 * 60 * 1000),
        },
      },
    });

    /*
     *Mudar de 50 para 5, que é o pedido real
     */

    if (deliveryOrdesDeliveryman.length >= 50) {
      return res.json({
        msg: 'Parabéns você cumpriu as 5 entregas de hoje. Volte amanhã!',
      });
    }

    await deliveryOrder.update({ start_date: new Date() });

    return res.json({ msg: 'Ordem de entrega iniciada com sucesso!' });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      deliveryOrder_id: Yup.number().required(),
      signature_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'A validação falhou.' });
    }

    const { deliveryOrder_id, signature_id } = req.body;

    const signature = await Signature.findByPk(signature_id);

    const deliveryOrder = await DeliveryOrder.findOne({
      where: {
        id: deliveryOrder_id,
        start_date: { [Op.ne]: null },
        // end_date: { [Op.ne]: null },
        end_date: null,
        canceled_at: null,
      },
      include: [
        {
          model: Signature,
          as: 'signature',
          attributes: ['id'],
        },
      ],
    });

    if (!deliveryOrder && !signature) {
      return res.status(400).json({
        error: `Ordem de entrega e assinatura não foram encontradas
        verifique se já foi finalizada e se o arquivo da assinatura existe.`,
      });
    }

    if (!signature) {
      return res.status(400).json({
        error: 'Assinatura não foi encontrada.',
      });
    }

    if (!deliveryOrder) {
      return res.status(400).json({
        error:
          'Ordem de entrega não foi encontrada, verifique se já foi finalizada.',
      });
    }

    await deliveryOrder.update({
      end_date: new Date(),
      signature_id,
    });

    return res.json({
      msg: `Ordem de entrega finalizada com sucesso! ${signature_id}`,
    });
  }
}

export default new DeliveryController();
