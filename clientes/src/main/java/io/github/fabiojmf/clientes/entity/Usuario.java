package io.github.fabiojmf.clientes.entity;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;

@Entity
@Data
@NoArgsConstructor
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    @NotEmpty(message = "{campo.username.obrigatorio}")
    private String username;

    @Column
    @NotEmpty(message = "{campo.password.obrigatorio}")
    private String password;
}
