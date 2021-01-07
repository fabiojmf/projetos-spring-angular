package io.github.fabiojmf.agendaapi.controller;

import io.github.fabiojmf.agendaapi.entity.Contato;
import io.github.fabiojmf.agendaapi.service.ContatoService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Part;

@RestController
@RequestMapping("/contatos")
@RequiredArgsConstructor
public class ContatoController {

    private final ContatoService contatoService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Contato save(@RequestBody @Validated Contato contato){
        return contatoService.save(contato);
    }

    @DeleteMapping("{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteById(@PathVariable Integer id){
        contatoService.deleteById(id);
    }

    @GetMapping
    public Page<Contato> findAll(
            @RequestParam(value = "page", defaultValue = "0") Integer pagina,
            @RequestParam(value = "size", defaultValue = "10") Integer tamanhoPagina){
        return contatoService.findAll(pagina,tamanhoPagina);
    }

    @PatchMapping("{id}/favorito")
    public void favorite(@PathVariable Integer id){
        contatoService.favorite(id);
    }

    @PutMapping("{id}/foto")
    public byte[] addAvatar(@PathVariable Integer id, @RequestParam("foto") Part file){
        return contatoService.addAvatar(id,file);
    }
}
