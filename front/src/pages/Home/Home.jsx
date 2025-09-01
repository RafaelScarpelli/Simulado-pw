import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import "./Home.css"; // importar o CSS

function Home() {
  const [dataHora, setDataHora] = useState(new Date());
  const navigate = useNavigate();

  // Descomente se quiser atualizar o relógio em tempo real
  // useEffect(() => {
  //   const timer = setInterval(() => setDataHora(new Date()), 1000);
  //   return () => clearInterval(timer);
  // }, []);

  return (
    <div className="home-container">
      <Header titulo="Página Inicial" />
      <h1>Bem-vindo!</h1>
      <p>Data e Hora: {dataHora.toLocaleString()}</p>
      <button onClick={() => navigate("/calculo")}>
        Realizar o Cálculo de Investimento
      </button>
    </div>
  );
}

export default Home;