import styled from 'styled-components';

export const Container = styled.div`

  width: 100vw;
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  margin: 0 auto;

  h1 {
    color: #000;
  }



 .title-manager {

    width: 100%;
    color: #44444;
    letter-spacing: 0;
    font-size: 24px;
    font-weight: bold;
    font-family: Roboto-Bold;
    text-align: left;
    margin: 20px 70px;
    margin-bottom: 20px;
    opacity: 1;
  }


  .actions-header {

    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0 auto;
    width: 90vw;
  }

  input {

    text-align: center;
    flex-direction: column;
    margin: 0;
    position: absolute;
    border: 1px solid #dddd;
    opacity: 1;
    border-radius: 4px;
    width: 16vw;
    height: 36px;

    &::placeholder {
      text-align: center;
    }
  }

.icon-search {

  margin: 10px;
  z-index: 10;
}

  button {

    background: #7d40e7;
    border-radius: 4px;
    width: 142pX;
    height: 36px;
    border: none;
    outiline: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  button h3 {

    color: #fff;
    opcaity: 1;
    font-size: 14px;
    text-align: center;
    margin-left: 8px;
  }

  button:hover {

    background: rgba(198, 159, 226, 1);
  }

  button:active {

    background: rgba(198, 159, 226, 0.5);
  }

 main {

    display: grid;
    grid-template-rows: 2vw;
    grid-row-gap: 0;
    width: 90vw;
    margin: 30px auto;
}

main .header-list-orders h1 {

  font-family: Roboto-Bold;
  font-size: 16px;
  color: #444444;
  opacity: 1;
}

main .header-list-orders {

  display: grid;
  grid-template-columns: repeat( auto-fit, minmax(25px, 1fr) );
  text-align: center;
}

`;

export const BodyList = styled.section`

  display: grid;
  grid-template-columns: repeat( auto-fit, minmax(25px, 1fr) );
  grid-column-gap: auto;
  background: #fff;
  width: 90vw;
  height: auto;
  border: #eee 1px;
  box-shadow: 0.8px 0.8px 0.8px 0.8px rgba(0,0,0,0.4);
  margin-bottom: 15px;
  grid-flex: 1;


h1 {
    font-family: Roboto-Regular;
    font-size: 16px;
    text-align: center;
    padding-top: 15px;
    padding-bottom: 15px;
    color: #666666;
    opacity: 1;
}


`;
