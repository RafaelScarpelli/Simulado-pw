package com.example.demo.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.model.Investimento;

public interface InvestimentoRepository extends JpaRepository<Investimento, Long> {

    List<Investimento> findByDataCalculoBetween(LocalDate inicio, LocalDate fim);

    List<Investimento> findByDataCalculo(LocalDate data);

    List<Investimento> findByPrazoMeses(int prazoMeses);

    List<Investimento> findByPrazoMesesGreaterThanEqual(int prazoMeses);

    List<Investimento> findByPrazoMesesLessThanEqual(int prazoMeses);

    List<Investimento> findByTaxaJurosMensal(double taxaJuros);

    List<Investimento> findByTaxaJurosMensalGreaterThanEqual(double taxaJuros);

    List<Investimento> findByTaxaJurosMensalLessThanEqual(double taxaJuros);
}