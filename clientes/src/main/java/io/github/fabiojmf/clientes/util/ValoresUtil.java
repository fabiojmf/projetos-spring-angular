package io.github.fabiojmf.clientes.util;

import org.springframework.stereotype.Component;

import java.math.BigDecimal;

@Component
public class ValoresUtil {

    public BigDecimal formatarMoeda(String s){
        if(s == null){
            return null;
        }
        s = s.replace(".","").replace(",",".");
        return new BigDecimal(s);
    }
}
