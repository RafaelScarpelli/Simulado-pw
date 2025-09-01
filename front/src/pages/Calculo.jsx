import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import InvestimentoService from "../services/InvestimentoService";

function Calculo() {
  const [valorInicial, setValorInicial] = useState("");
  const [prazoMeses, setPrazoMeses] = useState("");
  const [taxaJurosMensal, setTaxaJurosMensal] = useState("");
  const [valorFinal, setValorFinal] = useState(null);
  const [historico, setHistorico] = useState([]);

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
        setValorFinal(resposta.data);
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

  return (
    <div>
      <Header titulo="Formulário de Cálculo" />
      <div style={{ padding: "20px" }}>
        <h1>Cálculo de Investimento</h1>

        <input
          type="number"
          placeholder="Valor Inicial"
          value={valorInicial}
          onChange={e => setValorInicial(e.target.value)}
        />
        <input
          type="number"
          placeholder="Prazo (meses)"
          value={prazoMeses}
          onChange={e => setPrazoMeses(e.target.value)}
        />
        <input
          type="number"
          placeholder="Taxa de Juros Mensal (%)"
          value={taxaJurosMensal}
          onChange={e => setTaxaJurosMensal(e.target.value)}
        />

        <div>
          <button onClick={calcular}>Calcular</button>
          <button onClick={salvar}>Salvar</button>
          <button onClick={limparTabela}>Limpar Tabela</button>
        </div>

        {valorFinal !== null && (
          <p>
            <strong>Valor Final:</strong> R$ {valorFinal.toFixed(2)}
          </p>
        )}

        <h2>Histórico</h2>
        <table border="1">
          <thead>
            <tr>
              <th>Valor Inicial</th>
              <th>Prazo (meses)</th>
              <th>Juros (%)</th>
              <th>Valor Final</th>
            </tr>
          </thead>
          <tbody>
            {historico.map(item => (
              <tr key={item.id}>
                <td>{item.valorInicial}</td>
                <td>{item.prazoMeses}</td>
                <td>{item.taxaJurosMensal}</td>
                <td>{item.valorFinal.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Calculo;