import React from 'react';
import api from '../../services/api';
import { Container } from './styles';


export default function recipientsList() {
  api.get('recipients');
  return(
    <Container>
      <h1>Recipients</h1>
    </Container>
  );

}
