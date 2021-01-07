package io.github.fabiojmf.clientes.exception;

import lombok.Getter;

import java.util.Arrays;
import java.util.List;

public class ApiExceptions {

    @Getter
    private List<String> error;

    public ApiExceptions(List<String> erros){
        this.error = erros;
    }

    public ApiExceptions(String erro){
        this.error = Arrays.asList(erro);
    }
}
