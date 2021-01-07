package io.github.fabiojmf.clientes.service;

import io.github.fabiojmf.clientes.entity.Usuario;
import io.github.fabiojmf.clientes.exception.UsuarioCadastradoException;
import io.github.fabiojmf.clientes.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;

    public void save(Usuario usuario){
        boolean b = usuarioRepository.existsByUsername(usuario.getUsername());
        if(b){
            throw  new UsuarioCadastradoException(usuario.getUsername());
        }
        usuarioRepository.save(usuario);
    }
}
