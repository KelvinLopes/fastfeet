import { takeLatest, call, put, all  } from 'redux-saga/effects';

import { toast } from 'react-toastify';

import { sigInSuccess, signINFailure } from './actions';

import api from '../../../services/api';
import history from '../../../services/history';

export function* signIn({ payload }) {
  try {
    const { email, password } = payload;
    const res = yield call(api.post, 'sessions', {
      email,
      password,
    });

    const { token, user } = res.data;

    api.defaults.headers.Authorization = `Bearer ${token}`;

    yield put(sigInSuccess(token, user));

    history.push('/dashboard');

  }catch(error) {
    toast.error('Autenticação falhou. Verifique os dados inseridos.');
    yield put(signINFailure());
  }
}

export function setToken({ payload }) {
  if(!payload) return;

  const { token } = payload.auth;

  if(token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
]);
