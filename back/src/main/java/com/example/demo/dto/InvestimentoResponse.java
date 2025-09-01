package com.example.demo.dto;

import java.time.LocalDate;

import lombok.Data;

@Data
public class InvestimentoResponse {
    private double valorFinal;
    private LocalDate dataCalculo;

    public InvestimentoResponse(double valorFinal, LocalDate dataCalculo) {
        this.valorFinal = valorFinal;
        this.dataCalculo = dataCalculo;
    }

}
