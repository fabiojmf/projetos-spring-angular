package io.github.fabiojmf.clientes.exception;

public class UsuarioCadastradoException extends RuntimeException{
    public UsuarioCadastradoException(String usr){
        super("Usuario " + usr + " já cadastrado");
    }
}
