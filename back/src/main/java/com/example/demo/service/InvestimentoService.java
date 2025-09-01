package com.example.demo.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.Investimento;
import com.example.demo.repository.InvestimentoRepository;

@Service
public class InvestimentoService {

    @Autowired
    private InvestimentoRepository repository;

    public double calcularValorFinal(double valorInicial, int prazoMeses, double taxaJurosMensal) {
        return valorInicial * Math.pow(1 + (taxaJurosMensal / 100), prazoMeses);
    }

    public Investimento salvarInvestimento(double valorInicial, int prazoMeses, double taxaJurosMensal) {
        double valorFinal = calcularValorFinal(valorInicial, prazoMeses, taxaJurosMensal);
        Investimento investimento = new Investimento(valorInicial, prazoMeses, taxaJurosMensal, valorFinal);
        return repository.save(investimento);
    }

    public List<Investimento> listarTodos() {
        return repository.findAll();
    }

    public void deletarTodos() {
        repository.deleteAll();
    }

    public void deletarPorId(Long id) {
        repository.deleteById(id);
    }

    public List<Investimento> filtrarPorPrazo(int prazoMeses) {
        return repository.findByPrazoMeses(prazoMeses);
    }

    public List<Investimento> filtrarPorJuros(double taxaJuros) {
        return repository.findByTaxaJurosMensal(taxaJuros);
    }

    public List<Investimento> filtrarPorData(LocalDate inicio, LocalDate fim) {
        return repository.findByDataCalculoBetween(inicio, fim);
    }

    public List<Investimento> filtrarPorDataExata(LocalDate data) {
        return repository.findByDataCalculo(data);
    }

    public List<Investimento> filtrarPrazoMaiorOuIgual(int prazo) {
        return repository.findByPrazoMesesGreaterThanEqual(prazo);
    }

    public List<Investimento> filtrarPrazoMenorOuIgual(int prazo) {
        return repository.findByPrazoMesesLessThanEqual(prazo);
    }

    public List<Investimento> filtrarJurosMaiorOuIgual(double taxa) {
        return repository.findByTaxaJurosMensalGreaterThanEqual(taxa);
    }

    public List<Investimento> filtrarJurosMenorOuIgual(double taxa) {
        return repository.findByTaxaJurosMensalLessThanEqual(taxa);
    }
}
