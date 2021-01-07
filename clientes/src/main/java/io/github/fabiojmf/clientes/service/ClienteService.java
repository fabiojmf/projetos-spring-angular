package io.github.fabiojmf.clientes.service;

import io.github.fabiojmf.clientes.entity.Cliente;
import io.github.fabiojmf.clientes.repository.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class ClienteService {

    private final ClienteRepository clienteRepository;

    @Autowired
    public ClienteService(ClienteRepository clienteRepository) {
        this.clienteRepository = clienteRepository;
    }

    public Cliente save(Cliente cliente){
        return clienteRepository.save(cliente);
    }

    public Cliente findById(Long id){
        return clienteRepository
                .findById(id)
                .orElseThrow( () -> new ResponseStatusException(HttpStatus.NOT_FOUND,"Cliente nao encontrado"));
    }

    public void deleteById(Long id){
        clienteRepository
                .findById(id)
                .map( cliente -> {
                    clienteRepository.deleteById(id);
                    return Void.TYPE;
                })
                .orElseThrow( () -> new ResponseStatusException(HttpStatus.NOT_FOUND,"Cliente nao encontrado"));
    }

    public void updateCliente(Long id, Cliente cliente){
        clienteRepository
                .findById(id)
                .map(cliente1 -> {
                    cliente.setId(cliente1.getId());
                    return clienteRepository.save(cliente);
                })
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,"Cliente nao encontrado"));
    }

    public List<Cliente> findAll(){
        return clienteRepository.findAll();
    }
}
