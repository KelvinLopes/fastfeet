import React from 'react';
import api from '../../services/api';
import { Container } from './styles';
import { FaPlus, FaSearch } from 'react-icons/fa';


export default function dashboard() {
  api.get('deliveryorders');
  return(
    <Container>
      <header className="title-manager"><h1>Gerenciando encomendas</h1></header>
      <section className="actions-header">
      <FaSearch  className="icon-search" color="#9999" size={14} />
        <input
          type="text"
          placeholder="Buscar por encomenda"
          />
          <button>
            <FaPlus color="#fff" size={14} />
            <h3>Cadastrar</h3>
          </button>
      </section>
      <main>
        <header className="header-list-orders">
          <h1>ID</h1>
          <h1>Destinatário</h1>
          <h1>Entregador</h1>
          <h1>Cidade</h1>
          <h1>Estado</h1>
          <h1>Status</h1>
          <h1>Ações</h1>
        </header>

          <section className="body-list">
            <span><h1>#01</h1></span>
            <span><h1>Ludwing Van Bethoven</h1></span>
            <span><h1>Jonh Doe</h1></span>
            <span><h1>Rio do Sul</h1></span>
            <span><h1>Santa Carina</h1></span>
            <span><h1>Entregue</h1></span>
            <span><h1>...</h1></span>
          </section>

          <section className="body-list">
            <span><h1>#02</h1></span>
            <span><h1>Ludwing Van Bethoven</h1></span>
            <span><h1>Jonh Doe</h1></span>
            <span><h1>Rio do Sul</h1></span>
            <span><h1>Santa Carina</h1></span>
            <span><h1>Entregue</h1></span>
            <span><h1>...</h1></span>
          </section>

          <section className="body-list">
            <span><h1>#03</h1></span>
            <span><h1>Ludwing Van Bethoven</h1></span>
            <span><h1>Jonh Doe</h1></span>
            <span><h1>Rio do Sul</h1></span>
            <span><h1>Santa Carina</h1></span>
            <span><h1>Entregue</h1></span>
            <span><h1>...</h1></span>
          </section>
      </main>
    </Container>
  );

}

