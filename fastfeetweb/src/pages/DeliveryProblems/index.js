import React from 'react';
import api from '../../services/api';
import { Container } from './styles';


export default function deliveryProblems() {
  api.get('/delivery_problem');
  return(
    <Container>
      <h1>Problems</h1>
    </Container>
  );

}
