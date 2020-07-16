import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { Container, BodyList} from './styles';
import { FaPlus, FaSearch } from 'react-icons/fa';

export default function Dashboard() {

 const [deliveries, setDeliveries] = useState([]);


useEffect(() =>  {

  async function renderDeliveries() {

    const res = await api.get('deliveryorders');

    const data = res.data.map(delivery => ({
      ...delivery,
    }));
  setDeliveries(data);
}
  renderDeliveries()

}, []);

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

          <section>
           { deliveries.map(delivery => (
              <BodyList key={delivery.id}>
                <span><h1>#{delivery.id}</h1></span>
                <span><h1>{delivery.recipient.name}</h1></span>
                <span><h1>{delivery.deliveryman.name}</h1></span>
                <span><h1>{delivery.recipient.city}</h1></span>
                <span><h1>{delivery.recipient.state}</h1></span>
                <span><h1>Entregue</h1></span>
                <span><h1>...</h1></span>
              </BodyList>
           ))}

          </section>

      </main>
    </Container>
  );
 }
