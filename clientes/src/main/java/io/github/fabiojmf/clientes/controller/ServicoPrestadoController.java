package io.github.fabiojmf.clientes.controller;

import io.github.fabiojmf.clientes.controller.dto.ServicoPrestadoDTO;
import io.github.fabiojmf.clientes.entity.Cliente;
import io.github.fabiojmf.clientes.entity.ServicoPrestado;
import io.github.fabiojmf.clientes.service.ClienteService;
import io.github.fabiojmf.clientes.service.ServicoPrestadoService;
import io.github.fabiojmf.clientes.util.ValoresUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

@RestController
@RequestMapping("/api/servico-prestado")
@RequiredArgsConstructor
public class ServicoPrestadoController {

    private final ServicoPrestadoService servicoPrestadoService;
    private final ClienteService clienteService;
    private final ValoresUtil valoresUtil;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ServicoPrestado save(@RequestBody @Valid ServicoPrestadoDTO dto){
        ServicoPrestado aux = transformaDados(dto);
        return servicoPrestadoService.save(aux);
    }

    @GetMapping
    public List<ServicoPrestado> findByNomeAndMes(
            @RequestParam(value = "nome",required = false, defaultValue = "") String nome,
            @RequestParam(value = "mes",required = false) Integer mes){
        return servicoPrestadoService.findByNomeAndMes("%"+nome+"%",mes);
    }

    @GetMapping(value = "/listarServicos")
    public List<ServicoPrestado> findAll(){
        return  servicoPrestadoService.findAll();
    }

    @NotNull
    private ServicoPrestado transformaDados(@NotNull ServicoPrestadoDTO dto) {
        ServicoPrestado temp = new ServicoPrestado();

        temp.setData(LocalDate.parse(dto.getData(), DateTimeFormatter.ofPattern("dd/MM/yyyy")));
        temp.setDescricao(dto.getDescricao());

        Cliente retorno = clienteService.findById(dto.getIdCliente());
        temp.setCliente(retorno);
        temp.setValor(valoresUtil.formatarMoeda(dto.getPreco()));
        return temp;
    }
}
