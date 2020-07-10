import styled from 'styled-components';

export const  Container = styled.div`

  background: #ffff;
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
