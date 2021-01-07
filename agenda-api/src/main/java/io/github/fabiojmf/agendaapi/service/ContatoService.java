package io.github.fabiojmf.agendaapi.service;

import io.github.fabiojmf.agendaapi.entity.Contato;
import io.github.fabiojmf.agendaapi.repository.ContatoRepository;
import lombok.RequiredArgsConstructor;
import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.querydsl.QPageRequest;
import org.springframework.stereotype.Service;

import javax.servlet.http.Part;
import java.io.IOException;
import java.io.InputStream;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ContatoService {

    private final ContatoRepository contatoRepository;

    public Contato save(Contato contato){
        return contatoRepository.save(contato);
    }

    public void deleteById(Integer id){
        contatoRepository.deleteById(id);
    }

    public Page<Contato> findAll(Integer pagina, Integer tamanho){
        Sort sort = Sort.by(Sort.Direction.ASC,"nome");
        PageRequest pageRequest = PageRequest.of(pagina,tamanho,sort);
        return contatoRepository.findAll(pageRequest);
    }

    public void favorite(Integer id){
        Optional<Contato> contato = contatoRepository.findById(id);
        contato.ifPresent( contato1 -> {
            contato1.setFavorito(!contato1.getFavorito());
            contatoRepository.save(contato1);
        });
    }

    public byte[] addAvatar(Integer id, Part part){
        Optional<Contato> contato = contatoRepository.findById(id);

        return contato.map( contato1 -> {
          try{
              InputStream inputStream = part.getInputStream();
              byte[] bytes = new byte[(int)part.getSize()];
              IOUtils.readFully(inputStream, bytes);
              contato1.setFoto(bytes);
              contatoRepository.save(contato1);
              inputStream.close();
              return bytes;
          }catch (IOException e){
            return  null;
          }
        }).orElse(null);
    }
}
