export function siginRequest(email, password) {
  return {
    type: '@auth/SIGN_IN_REQUEST',
    payload: { email, password },
  };
}

export function sigInSuccess(token, user) {
  return {
    type: '@auth/SIGN_IN_SUCCESS',
    payload: { token, user }
  };
}

export function signINFailure() {
  return {
    type: '@auth/SIGN_IN_FAILURE',
  };
}

export function sigInOut() {
  return {
    type: '@auth/SIGN_OUT',
  };
}
