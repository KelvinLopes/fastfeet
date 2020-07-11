import React from 'react';
import api from '../../services/api';
import { Container } from './styles';


export default function deliverymans() {
  api.get('deliverymans');
  return(
    <Container>
      <h1>Deliverymans</h1>
    </Container>
  );

}
