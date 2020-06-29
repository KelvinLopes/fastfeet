import * as Yup from 'yup';
import File from '../models/File';

class FileController {
  // Store File
  async store(req, res) {
    const { originalname: name, filename: path } = req.file;

    const file = await File.create({
      name,
      path,
    });

    return res.json(file);
  }

  // Index File
  async index(req, res) {
    const { page = 1 } = req.query;

    const file = await File.findAll({
      order: [['id', 'asc']],
      attributes: ['id', 'name', 'path'],
      limit: 10,
      offset: (page - 1) * 10,
    });
    return res.json(file);
  }

  // Update File
  async update(req, res) {
    const schema = Yup.object().shape({ id: Yup.number().required() });
    const { id } = req.params;

    if (!(await schema.isValid(req.params))) {
      return res.status().json({ error: 'A validação falhou.' });
    }

    const file = await File.findByPk(id);

    if (!file) {
      return res.status(400).json({
        error: `Essa assinatura não foi enviada ou foi deletada do sistema.
         Faça um novo envio da assinatura.`,
      });
    }

    const { originalname: name, filename: path } = req.file;

    await file.update({
      name,
      path,
    });
    return res.json({ msg: 'A assinatura foi atualizada com sucesso.' });
  }

  // Delete File
  async delete(req, res) {
    const schema = Yup.object().shape({ id: Yup.number().required() });
    const { id } = req.params;

    if (!(await schema.isValid(req.params))) {
      return res.status().json({ error: 'A validação falhou.' });
    }

    const file = await File.findByPk(id);

    if (!file) {
      return res.status(400).json({
        error: 'Essa assinatura não foi enviada ou foi já deletada.',
      });
    }

    await file.destroy(id);
    return res.json({ msg: 'A assinatura foi removida.' });
  }
}

export default new FileController();
