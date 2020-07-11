import { createGlobalStyle } from 'styled-components';
import 'react-toastify/dist/ReactToastify.css';

export default createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');
*{
  margin: 0;
  padding: 0;
  outline: 0;
  box-sizing: border-box;
}

*:focus {
  outiline: 0;
}

html, body, #root {
  min-height: 100%;
}

a {
  text-decoration: none;
}

body {
  -webkit-font-smoothing : antialiaded !important;
  font-family: 'Roboto', sans-serif;
}
button {
  cursor: pointer;
}
::-webkit-scrollbar-track {
  background: rgba(125, 64, 231, 1);
}
::-webkit-scrollbar {
  width: 4px;
  background: rgba(125, 64, 231, 1);
}
::-webkit-scrollbar-thumb {
  background:  rgba(198, 159, 226, 1) ;
}
`;
