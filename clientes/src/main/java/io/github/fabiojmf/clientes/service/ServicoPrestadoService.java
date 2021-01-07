package io.github.fabiojmf.clientes.service;

import io.github.fabiojmf.clientes.entity.ServicoPrestado;
import io.github.fabiojmf.clientes.repository.ServicoPrestadoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ServicoPrestadoService {

    private final ServicoPrestadoRepository servicoPrestadoRepository;

    @Autowired
    public ServicoPrestadoService(ServicoPrestadoRepository repository){
        this.servicoPrestadoRepository = repository;
    }

    public ServicoPrestado save(ServicoPrestado servicoPrestado){
        return servicoPrestadoRepository.save(servicoPrestado);
    }

    public List<ServicoPrestado> findByNomeAndMes(String nome, Integer mes) {
        return servicoPrestadoRepository.findByNomeAndMes(nome,mes);
    }

    public List<ServicoPrestado> findAll(){
        return servicoPrestadoRepository.findAll();
    }
}
