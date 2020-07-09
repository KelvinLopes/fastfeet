import * as Yup from 'yup';

import { Op } from 'sequelize';
import Deliveryman from '../models/Deliveryman';
import File from '../models/File';

class DeliverymanController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      avatar_id: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'A validação falhou.' });
    }

    const deliverymanExist = await Deliveryman.findOne({
      where: { email: req.body.email },
    });

    if (deliverymanExist) {
      return res.status(400).json({
        error: 'Esse entregador(a) já está cadastrado(a)',
      });
    }

    const { id, name, email, avatar_id } = await Deliveryman.create(req.body);

    return res.json({
      id,
      name,
      email,
      avatar_id,
    });
  }

  async index(req, res) {
    const { page = 1 } = req.query;

    const deliverymanList = await Deliveryman.findAll({
      order: [['id', 'asc']],
      attributes: ['id', 'name', 'email'],
      limit: 10,
      offset: (page - 1) * 10,
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['name', 'path', 'url'],
        },
      ],
    });

    return res.json(deliverymanList);
  }

  async show(req, res) {
    const schema = Yup.object().shape({
      deliverymanName: Yup.string(),
    });

    if (!(await schema.isValid(req.query))) {
      return res.status(400).json({
        error: 'A validação falhou.',
      });
    }

    const { page = 1 } = req.query;

    const { deliverymanName } = req.query;

    const deliverymanSearch = await Deliveryman.findAll({
      where: {
        name: { [Op.iLike]: deliverymanName ? `${deliverymanName}` : `%%` },
      },
      order: [['id', 'asc']],
      attributes: ['id', 'name'],
      limit: 10,
      offset: (page - 1) * 10,
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['name', 'path', 'url'],
        },
      ],
    });

    return res.json(deliverymanSearch);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      avatar_id: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'A validação falhou.' });
    }

    const { id } = req.params;
    const deliveryman = await Deliveryman.findByPk(id);

    if (!deliveryman) {
      return res.status(400).json({
        error: 'Esse entregador(a) não foi cadastrado(a).',
      });
    }

    await deliveryman.update(req.body);
    return res.json(deliveryman);
  }

  async delete(req, res) {
    const schema = Yup.object().shape({ id: Yup.number().required() });
    const { id } = req.params;

    if (!(await schema.isValid(req.params))) {
      return res.status().json({ error: 'A validação falhou.' });
    }

    const delivery = await Deliveryman.findByPk(id);

    if (!delivery) {
      return res.status(400).json({
        error: 'Entregador(a) não existe ou já removido(a) do sistema.',
      });
    }
    await delivery.destroy(id);
    return res.json({ msg: 'Dados do entregador(a) apagados com sucesso.' });
  }
}

export default new DeliverymanController();
