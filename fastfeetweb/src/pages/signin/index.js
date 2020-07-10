import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';

import { Form, Input } from '@rocketseat/unform';

import logo from '../../assets/imgs/logo.png';

import { signInRequest } from '../../store/modules/auth/actions';


const schema = Yup.object().shape(
  {
    email: Yup.string('Insira um e-mail válido')
    .required('O email é obrigatório.'),
    password: Yup.string().required('A senha é obrigatória.'),
  }
);

export default function Sigin() {

const dispatch = useDispatch();
const loading = useSelector(state => state.auth.loading);

function handleSubmit({ email, password }) {
  dispatch(signInRequest(email, password));
}
    return (
      <>
        <img src={logo} alt='FastFeet Logo' />
        <Form schema={schema} onSubmit={handleSubmit} >
          <label>
            Seu email
            <Input
              type="email"
              name="email"
              placeholder="exemplo@email.com"
            />
          </label>

          <label>
           Sua Senha
            <Input
              type="password"
              name="password"
              placeholder="*************"
            />
          </label>

          <button type="submit">
            { loading ? 'Carregando...' : 'Entrar no sistema' }
          </button>

        </Form>
      </>
  );
}
