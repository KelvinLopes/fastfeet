import * as Yup from 'yup';
import {
  isBefore,
  isAfter,
  startOfDay,
  endOfDay,
  setHours,
  isWithinInterval,
} from 'date-fns';
import { Op } from 'sequelize';
import DeliveryOrder from '../models/DeliveryOrder';
// import Signature from '../models/File';

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

    if (deliveryOrdesDeliveryman.length >= 50) {
      return res.json({
        msg: 'Parabéns você cumpriu as 5 entregas de hoje. Volte amanhã!',
      });
    }

    await deliveryOrder.update({ start_date: new Date() });

    return res.json({ msg: 'Ordem de entrega iniciada com sucesso!' });
  }
}

export default new DeliveryController();
