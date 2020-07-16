import styled from 'styled-components';
import { darken } from 'polished';

export const Wrapper = styled.div`

  min-height: 100vh;
  background: rgba(125,64, 231, 1);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`

  width: 100%;
  max-width: 360px;
  text-align: center;
  padding: 60px 20px;
  border-radius: 4px;
  background: rgba(245, 245, 245, 1);
  margin: 70px auto;


  img {
    height: 44px;
  }

  form {
    display: flex;
    flex-direction: column;
    margin-top: 30px;

    label {

    color: rgba(68,68, 68, 1);
    opcaity: 1;
    margin: 10px 0;
    text-align: start;
    text-transform: uppercase;
    font-weight: 700;
    display: flex;
    flex-direction: column;
    letter-spacing: 0;
    width: auto;
    height: auto;

    input {

      background: rgba(255, 255, 255, 1);
      border: 1px solid rgba(221, 221, 211, 1);
      opacity: 1;
      border-radius: 4px;
      height: 44px;
      padding: 0 15px;
      margin: 10px 0;

      &::placeholder {
        top: 409px;
        left: 585px;
        height: 21px;
        text-align: left;
        letter-spacing: 0;
        color: rgba(153, 153, 153, 1);
        opacity: 1;
      }
    }
  }
    span {

      color: #f64c75;
      aling-self: flex-start;
      margin: 0 0 10px;
      font-weight: bold;
    }

    button {

      width: 300px;
      height: 45px;
      background: #7d40e7;
      font-weight: bold;
      color: #fff;
      border: 0;
      border-radius: 4px;
      opacity: 1;
      transition: background 0.2s;
      outline: none;

      &:hover {

        background: ${darken(0.03, '#c69fe2')};
      }
    }
  }

  a {

    color: #fff;
    margin-top: 15px;
    font-size: 16px;
    opacity: 0.8;

    &:hover {

      opacity: 1;
    }
  }
`;
