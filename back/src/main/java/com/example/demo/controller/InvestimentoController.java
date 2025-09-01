package com.example.demo.controller;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.model.Investimento;
import com.example.demo.service.InvestimentoService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/investimentos")
@CrossOrigin(origins = "*")
public class InvestimentoController {

    @Autowired
    private InvestimentoService investimentoService;

    @PostMapping("/calcular")
    public ResponseEntity<Double> calcular(@Valid @RequestBody Investimento investimento) {
        double valorFinal = investimentoService.calcularValorFinal(
                investimento.getValorInicial(),
                investimento.getPrazoMeses(),
                investimento.getTaxaJurosMensal());
        return ResponseEntity.ok(valorFinal);
    }

    @PostMapping
    public ResponseEntity<Investimento> salvar(@Valid @RequestBody Investimento investimento) {
        return ResponseEntity.ok(
                investimentoService.salvarInvestimento(
                        investimento.getValorInicial(),
                        investimento.getPrazoMeses(),
                        investimento.getTaxaJurosMensal()));
    }

    @GetMapping
    public ResponseEntity<List<Investimento>> listar() {
        return ResponseEntity.ok(investimentoService.listarTodos());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deletar(@PathVariable("id") long id) {
        investimentoService.deletarPorId(id);
        return ResponseEntity.ok("Investimento removido com sucesso!");
    }

    @DeleteMapping
    public ResponseEntity<String> deletarTodos() {
        investimentoService.deletarTodos();
        return ResponseEntity.ok("Todos os investimentos foram removidos!");
    }

    @GetMapping("/filtrar/data")
    public ResponseEntity<List<Investimento>> filtrarData(
            @RequestParam String inicio,
            @RequestParam String fim) {

        LocalDate inicioDt = LocalDate.parse(inicio);
        LocalDate fimDt = LocalDate.parse(fim);

        return ResponseEntity.ok(investimentoService.filtrarPorData(inicioDt, fimDt));
    }

    @GetMapping("/filtrar/data/{data}")
    public ResponseEntity<List<Investimento>> filtrarDataExata(@PathVariable String data) {
        LocalDate dataFiltrada = LocalDate.parse(data);
        return ResponseEntity.ok(investimentoService.filtrarPorDataExata(dataFiltrada));
    }

    @GetMapping("/filtrar/prazo/{prazo}")
    public ResponseEntity<List<Investimento>> filtrarPrazo(@PathVariable int prazo) {
        return ResponseEntity.ok(investimentoService.filtrarPorPrazo(prazo));
    }

    @GetMapping("/filtrar/juros/{taxa}")
    public ResponseEntity<List<Investimento>> filtrarJuros(@PathVariable double taxa) {
        return ResponseEntity.ok(investimentoService.filtrarPorJuros(taxa));
    }

    @GetMapping("/filtrar/prazo/maiorOuIgual/{prazo}")
    public ResponseEntity<List<Investimento>> filtrarPrazoMaior(@PathVariable int prazo) {
        return ResponseEntity.ok(investimentoService.filtrarPrazoMaiorOuIgual(prazo));
    }

    @GetMapping("/filtrar/prazo/menorOuIgual/{prazo}")
    public ResponseEntity<List<Investimento>> filtrarPrazoMenor(@PathVariable int prazo) {
        return ResponseEntity.ok(investimentoService.filtrarPrazoMenorOuIgual(prazo));
    }

    @GetMapping("/filtrar/juros/maiorOuIgual/{taxa}")
    public ResponseEntity<List<Investimento>> filtrarJurosMaior(@PathVariable double taxa) {
        return ResponseEntity.ok(investimentoService.filtrarJurosMaiorOuIgual(taxa));
    }

    @GetMapping("/filtrar/juros/menorOuIgual/{taxa}")
    public ResponseEntity<List<Investimento>> filtrarJurosMenor(@PathVariable double taxa) {
        return ResponseEntity.ok(investimentoService.filtrarJurosMenorOuIgual(taxa));
    }
}
