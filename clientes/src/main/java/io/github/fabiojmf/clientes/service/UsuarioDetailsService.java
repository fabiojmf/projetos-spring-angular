package io.github.fabiojmf.clientes.service;

import io.github.fabiojmf.clientes.entity.Usuario;
import io.github.fabiojmf.clientes.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UsuarioDetailsService implements UserDetailsService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Override
    public UserDetails loadUserByUsername(String username) {
        Optional<Usuario> user = usuarioRepository.findUserByUsername(username);

        Usuario u = user.orElseThrow(()-> new UsernameNotFoundException("Usuario nao encontrado"));

        return new SecurityUser(u);
    }
}
