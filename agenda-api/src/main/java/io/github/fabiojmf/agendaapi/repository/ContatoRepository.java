package io.github.fabiojmf.agendaapi.repository;

import io.github.fabiojmf.agendaapi.entity.Contato;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContatoRepository extends JpaRepository<Contato, Integer> {
}
