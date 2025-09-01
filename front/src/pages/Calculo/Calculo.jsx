import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import InvestimentoService from "../../services/InvestimentoService";
import "./Calculo.css";

function Calculo() {
  const [valorInicial, setValorInicial] = useState("");
  const [prazoMeses, setPrazoMeses] = useState("");
  const [taxaJurosMensal, setTaxaJurosMensal] = useState("");
  const [valorFinal, setValorFinal] = useState(null);
  const [historico, setHistorico] = useState([]);
  const [filtroData, setFiltroData] = useState("");
  const [filtroPrazo, setFiltroPrazo] = useState("");
  const [filtroJuros, setFiltroJuros] = useState("");

  useEffect(() => {
    carregarHistorico();
  }, []);

  const calcular = async () => {
    try {
      const resposta = await InvestimentoService.calcular({
        valorInicial: parseFloat(valorInicial),
        prazoMeses: parseInt(prazoMeses),
        taxaJurosMensal: parseFloat(taxaJurosMensal)
      });
      setValorFinal(resposta.data.valorFinal); // agora acessa o campo do DTO
    } catch (error) {
      console.error("Erro ao calcular:", error);
      alert("Erro ao calcular investimento.");
    }
  };

  const salvar = async () => {
    try {
      await InvestimentoService.salvar({
        valorInicial: parseFloat(valorInicial),
        prazoMeses: parseInt(prazoMeses),
        taxaJurosMensal: parseFloat(taxaJurosMensal)
      });
      carregarHistorico();
    } catch (error) {
      console.error("Erro ao salvar:", error);
      alert("Erro ao salvar investimento.");
    }
  };

  const carregarHistorico = async () => {
    try {
      const resposta = await InvestimentoService.buscarTodos();
      setHistorico(resposta.data);
    } catch (error) {
      console.error("Erro ao carregar histórico:", error);
    }
  };

  const limparTabela = async () => {
    try {
      await InvestimentoService.limparTabela();
      setHistorico([]);
    } catch (error) {
      console.error("Erro ao limpar tabela:", error);
    }
  };

  // const filtrarPorData = async () => {
  //   if (!filtroData) return alert("Informe uma data");
  //   try {
  //     const resposta = await InvestimentoService.filtrarDataExata(filtroData);
  //     setHistorico(resposta.data);
  //   } catch (error) {
  //     console.error(error);
  //     alert("Erro ao filtrar por data");
  //   }
  // };

  const filtrarPorData = async () => {
    if (!filtroData) return alert("Informe uma data");
    const dataFormatada = formatarDataParaBackend(filtroData);
    if (!dataFormatada) return alert("Formato de data inválido");

    try {
      const resposta = await InvestimentoService.filtrarDataExata(dataFormatada);
      setHistorico(resposta.data);
    } catch (error) {
      console.error(error);
      alert("Erro ao filtrar por data");
    }
  };

  const filtrarPorPrazo = async () => {
    if (!filtroPrazo) return alert("Informe um prazo");
    try {
      const resposta = await InvestimentoService.filtrarPrazo(filtroPrazo);
      setHistorico(resposta.data);
    } catch (error) {
      console.error(error);
      alert("Erro ao filtrar por prazo");
    }
  };

  const filtrarPorJuros = async () => {
    if (!filtroJuros) return alert("Informe a taxa de juros");
    try {
      const resposta = await InvestimentoService.filtrarJuros(filtroJuros);
      setHistorico(resposta.data);
    } catch (error) {
      console.error(error);
      alert("Erro ao filtrar por juros");
    }
  };

  function formatarDataParaBackend(dataString) {
    // espera dataString no formato dd/MM/yyyy
    const partes = dataString.split("/");
    if (partes.length !== 3) return null; // formato inválido
    const [dia, mes, ano] = partes;
    return `${ano}-${mes.padStart(2, "0")}-${dia.padStart(2, "0")}`;
  }


  return (
    <div className="calculo-container">
      <Header titulo="Formulário de Cálculo" />

      <h1>Cálculo de Investimento</h1>

      <input type="number" placeholder="Valor Inicial" value={valorInicial} onChange={e => setValorInicial(e.target.value)} />
      <input type="number" placeholder="Prazo (meses)" value={prazoMeses} onChange={e => setPrazoMeses(e.target.value)} />
      <input type="number" placeholder="Taxa de Juros Mensal (%)" value={taxaJurosMensal} onChange={e => setTaxaJurosMensal(e.target.value)} />

      <div>
        <button onClick={calcular}>Calcular</button>
        <button onClick={salvar}>Salvar</button>
        <button onClick={limparTabela}>Limpar Tabela</button>
      </div>

      {valorFinal && <p><strong>Valor Final:</strong> R$ {valorFinal.toFixed(2)}</p>}

      {/* Filtros */}
      <div className="filtros">
        <h2>Filtros</h2>
        <div>
          <input type="text" placeholder="Data (dd/MM/yyyy)" value={filtroData} onChange={e => setFiltroData(e.target.value)} />
          <button onClick={filtrarPorData}>Filtrar por Data</button>
        </div>
        <div>
          <input type="number" placeholder="Prazo (meses)" value={filtroPrazo} onChange={e => setFiltroPrazo(e.target.value)} />
          <button onClick={filtrarPorPrazo}>Filtrar por Prazo</button>
        </div>
        <div>
          <input type="number" placeholder="Taxa de Juros (%)" value={filtroJuros} onChange={e => setFiltroJuros(e.target.value)} />
          <button onClick={filtrarPorJuros}>Filtrar por Juros</button>
        </div>
      </div>

      {/* Tabela */}
      <table>
        <thead>
          <tr>
            <th>Valor Inicial</th>
            <th>Prazo (meses)</th>
            <th>Juros (%)</th>
            <th>Valor Final</th>
            <th>Data do Cálculo</th>
          </tr>
        </thead>
        <tbody>
          {historico.map(item => (
            <tr key={item.id}>
              <td>{item.valorInicial}</td>
              <td>{item.prazoMeses}</td>
              <td>{item.taxaJurosMensal}</td>
              <td>{item.valorFinal.toFixed(2)}</td>
              <td>{item.dataCalculo.split("-").reverse().join("/")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Calculo;



