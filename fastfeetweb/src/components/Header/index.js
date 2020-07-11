import React from 'react';

import logo from '../../assets/imgs/logo.png';
import { Link } from 'react-router-dom';
import history from '../../services/history';
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
                to="/dashboard"
                selected={
                  history.location.pathname ===
                  "/dashboard"
                }
              >
                Encomendas
              </HeaderLinks>
            </li>
            <li>
              <HeaderLinks
                to="/deliverymans"
                selected={
                  history.location.pathname ===
                  "/deliverymans"
                }
                >
                Entregadores
              </HeaderLinks>
            </li>
            <li>
              <HeaderLinks
              to="/recipients"
              selected={
                history.location.pathname ===
                "/recipients"
              }
              >
                Destinatários
              </HeaderLinks>
            </li>
            <li>
              <HeaderLinks
              to="/delivery_problem"
              selected={
                history.location.pathname ===
                "/delivery_problem"
              }
              >
                Problemas
              </HeaderLinks>
            </li>
          </Filter>
        </nav>
      </Content>
    </Container>
  );
}
