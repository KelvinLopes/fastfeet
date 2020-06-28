import * as Yup from 'yup';
import Recipient from '../models/Recipient';

class RecipientController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      street: Yup.string().required(),
      number: Yup.string().required(),
      complement_address: Yup.string().required(),
      state: Yup.string().required(),
      city: Yup.string().required(),
      zip_code: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: 'A validação falhou.',
      });
    }

    const recipientCreated = await Recipient.create(req.body);
    return res.json(recipientCreated);
  }

  async index(req, res) {
    const { page = 1 } = req.query;

    const recipientCreatedList = await Recipient.findAll({
      order: [['id', 'asc']],
      attributes: [
        'id',
        'street',
        'number',
        'complement_address',
        'state',
        'city',
        'zip_code',
      ],
      limit: 10,
      offset: (page - 1) * 10,
    });

    return res.json(recipientCreatedList);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      street: Yup.string(),
      number: Yup.string(),
      complement_address: Yup.string(),
      state: Yup.string(),
      city: Yup.string(),
      zip_code: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'A validação falhou' });
    }

    const { id } = req.params;

    const recipient = await Recipient.findByPk(id);

    if (!recipient) {
      return res.status(400).json({
        error: 'Destinatário não existe ou não foi cadastrado.',
      });
    }

    await recipient.update(req.body);

    return res.json(recipient);
  }

  async delete(req, res) {
    const schema = Yup.object().shape({ id: Yup.number().required() });

    const { id } = req.params;

    if (!(await schema.isValid(req.params))) {
      return res.status(400).json({
        error: 'A validação falhou.',
      });
    }

    const recipient = await Recipient.findByPk(id);

    if (!recipient) {
      return res.status(400).json({
        error: 'Destinatário não existe ou não foi cadastrado.',
      });
    }

    await recipient.destroy(id);

    return res.json({ msg: 'Destinário deletado.' });
  }
}

export default new RecipientController();
