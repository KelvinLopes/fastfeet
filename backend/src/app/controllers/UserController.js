import * as Yup from 'yup';

import User from '../models/User';

class UserController {
  // Create
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().required(),
      password: Yup.string()
        .required()
        .min(6),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Dados incorretos' });
    }

    const { email } = req.body;

    const userExist = await User.findOne({
      where: { email },
    });

    if (userExist) {
      return res
        .status(400)
        .json({ error: 'Esses dados já existem para um usuário' });
    }

    const { id, name } = await User.create(req.body);
    return res.json({
      id,
      name,
      email,
    });
  }

  // Update
  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      oldPassword: Yup.string().min(6),
      password: Yup.string().when('oldPassword', (oldPassword, field) =>
        oldPassword ? field.required() : field
      ),
      confirmPassword: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validação dos dados falhou.' });
    }

    const { email, oldPassword } = req.body;

    // Procura o cadastro pela primaryKey da id do usuário
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(400).json({ error: 'Usuário não cadastrado' });
    }

    // Valida o email informado com o email já cadastrado

    if (email !== user.email) {
      const userExist = await User.findOne({
        where: { email },
      });

      if (userExist) {
        return res.status(400).json({ error: 'Usuário(a) já existe' });
      }
    }

    /*
     *Aguarda a digitação da senha antiga e verificar se elas coincidem
     *Caso não, haverá uma mensagem de erro e não permitirá a edição da mesma
     */

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res
        .status(401)
        .json({ error: 'Tenta novamente. A senhas não combinam entre elas.' });
    }

    // Se as senhas combinam, as novas informações serão redenrizadas

    const { id, name } = await user.update(req.body);

    return res.json({
      id,
      name,
      email,
    });
  }

  async delete(req, res) {
    const schema = Yup.object().shape({ id: Yup.number().required() });

    const { id } = req.params;
    const user = await User.findByPk(id);

    if (!(await schema.isValid(req.params))) {
      return res.status(400).json({
        error: 'A validação falhou.',
      });
    }

    if (!user) {
      return res
        .status(400)
        .json({ error: 'Usuário não cadastrado ou já foi removido' });
    }

    await user.destroy(id);

    return res.json({ msg: 'Usuário deletado.' });
  }
}

export default new UserController();
