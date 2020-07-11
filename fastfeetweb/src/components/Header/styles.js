import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const  Container = styled.div`

  background: rgba(245, 245, 245, 1);
  border-bottom: 1px solid #ddd;
  padding: 0 30px;

`;

export const  Content = styled.div`

  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 64px;

  nav {
    display: flex;
    align-items: center;
  }

  img {
    width: 25%;
    border-right: 1px solid #eee;
    margin-right: 20px;
    padding-right: 20px;
  }
`;

export const Filter = styled.ul`

  display: flex;
  align-items: center;
  justify-content: space-between;

  li {
    list-style: none;
    margin-left: 20px;
    letter-spacing: 0;
  }


  a:hover {
   color: rgba(68, 68, 68, 1);
  }

  a:active {
    color: rgba(68, 68, 68, 1);
  }

`;


export const HeaderLinks = styled(Link)`

  font-weigth: bold;
  color: ${props => (props.selected ? '#000' : '#999')};

`;
