import React from 'react';
import api from '../../services/api';
import { Container } from './styles';


export default function dashboard() {
  api.get('deliveryorders');
  return(
    <Container>
      <h1>Hello Word!!!!!!!!</h1>
    </Container>
  );

}

