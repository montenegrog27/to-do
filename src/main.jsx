// import React from "react";
// import ReactDOM from "react-dom";
// import { BrowserRouter } from "react-router-dom"; // Importar BrowserRouter
// import App from "./App";
// import "./index.css";

// ReactDOM.render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   </React.StrictMode>,
//   document.getElementById("root")
// );

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom"; // Importar BrowserRouter
import Modal from "react-modal"; // Importar react-modal
import App from "./App";
import "./index.css";

// Establecer el elemento raíz de la aplicación para el modal
Modal.setAppElement("#root");

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
