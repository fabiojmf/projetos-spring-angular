package io.github.fabiojmf.clientes.repository;

import io.github.fabiojmf.clientes.entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    Optional<Usuario> findUserByUsername(String username);
    Boolean existsByUsername(String username);
}
