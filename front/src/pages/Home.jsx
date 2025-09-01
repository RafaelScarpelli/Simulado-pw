import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

function Home() {
  const [dataHora, setDataHora] = useState(new Date());
  const navigate = useNavigate();

  // useEffect(() => {
  //   const timer = setInterval(() => setDataHora(new Date()), 1000);
  //   return () => clearInterval(timer);
  // }, []);

  return (
    <div>
      <Header titulo="Página Inicial" />
      <div style={{ padding: "20px" }}>
        <h1>Bem-vindo!</h1>
        <p>Data e Hora: {dataHora.toLocaleString()}</p>
        <button onClick={() => navigate("/calculo")}>
          Realizar o Cálculo de Investimento
        </button>
      </div>
    </div>
  );
}

export default Home;