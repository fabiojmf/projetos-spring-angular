package io.github.fabiojmf.clientes.repository;

import io.github.fabiojmf.clientes.entity.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClienteRepository extends JpaRepository<Cliente, Long> {
}
