import React from 'react';
import api from '../../services/api';
import { Container } from './styles';


export default function dashboard() {
  api.get('deliveryorders');
  return(
    <Container>
      <h1>Orders</h1>
    </Container>
  );

}

