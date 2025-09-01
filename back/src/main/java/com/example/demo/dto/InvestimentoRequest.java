package com.example.demo.dto;

import lombok.Data;

@Data
public class InvestimentoRequest {

    private double valorInicial;
    private int prazoMeses;
    private double taxaJurosMensal;
    
}
