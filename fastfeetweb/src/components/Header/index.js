import React from 'react';

import logo from '../../assets/imgs/logo.png';
import { Link } from 'react-router-dom';

import { Container, Content, Filter, HeaderLinks } from './styles';

export default function Header() {
  return (
    <Container>
      <Content>
        <nav>
        <img src={logo} alt="FastFeet Logo"/>
          <Filter>
            <li>
              <HeaderLinks
                to="#"
                selected="#"
              >
                Encomendas
              </HeaderLinks>
            </li>
            <li><HeaderLinks to="#">Cidade</HeaderLinks></li>
            <li><HeaderLinks to="#">Estado</HeaderLinks></li>
            <li><HeaderLinks to="#">Problemas</HeaderLinks></li>
          </Filter>
        </nav>
      </Content>
    </Container>
  );
}
