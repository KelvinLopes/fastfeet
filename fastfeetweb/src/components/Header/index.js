import React from 'react';

import logo from '../../assets/imgs/logo.png';
import history from '../../services/history';

import { Container, Content } from './styles';

export default function Header() {
  return (
    <Container>
      <Content>
        <nav>
          <img src={logo} alt="FastFeet Logo"/>
        </nav>
      </Content>
    </Container>
  );
}
