import { createGlobalStyle } from 'styled-components';


export default createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
html, body, #root {
  min-height: 100%;
}
body {
  background: rgba(125,64, 231, 1);
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
