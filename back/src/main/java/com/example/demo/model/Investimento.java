package com.example.demo.model;

import java.time.LocalDate;

import jakarta.persistence.*;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Positive;
import lombok.Data;

@Data
@Entity
@Table(name = "investimentos")
public class Investimento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Positive(message = "O valor inicial deve ser maior que zero")
    private double valorInicial;

    @Min(value = 1, message = "O prazo deve ser de pelo menos 1 mês")
    private int prazoMeses;

    @DecimalMin(value = "0.0", inclusive = false, message = "A taxa de juros deve ser maior que zero")
    private double taxaJurosMensal;

    private double valorFinal;

    @Column(updatable = false)
    private LocalDate dataCalculo;

    public Investimento() {
        
    }

    public Investimento(double valorInicial, int prazoMeses, double taxaJurosMensal, double valorFinal) {
        this.valorInicial = valorInicial;
        this.prazoMeses = prazoMeses;
        this.taxaJurosMensal = taxaJurosMensal;
        this.valorFinal = valorFinal;
        this.dataCalculo = LocalDate.now();
    }
}
