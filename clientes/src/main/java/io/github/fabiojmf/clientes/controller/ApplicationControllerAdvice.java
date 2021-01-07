package io.github.fabiojmf.clientes.controller;

import io.github.fabiojmf.clientes.exception.ApiExceptions;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.stream.Collectors;

@RestControllerAdvice
public class ApplicationControllerAdvice {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ApiExceptions handleValidationErros(MethodArgumentNotValidException exception){
        BindingResult result = exception.getBindingResult();
        List<String> resposta = result.getAllErrors()
                .stream()
                .map(erro -> erro.getDefaultMessage())
                .collect(Collectors.toList());
        return new ApiExceptions(resposta);
    }

    @ExceptionHandler(ResponseStatusException.class)
    public ResponseEntity handleResponseStatusException(ResponseStatusException exception){
        String s = exception.getReason();
        HttpStatus httpStatus = exception.getStatus();
        ApiExceptions apiExceptions = new ApiExceptions(s);
        return new ResponseEntity(apiExceptions,httpStatus);
    }
}
