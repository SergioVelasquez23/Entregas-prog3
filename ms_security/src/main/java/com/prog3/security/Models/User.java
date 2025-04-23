package com.prog3.security.Models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Data //para que guarde esa clase en persistencia, se almacena en una base de datos
@Document //de mongo, como quiere lo que se llame la tabla en la base de datos, toma el nombre por defecto del usuario
public class User {

    @Id //a mongo, para decirle que el atributo Id se cree automaticamente
    private String _id;
    private String name;
    private String email;
    private String password;
    private int numeroDeSesiones = 0;

    public User() {
    }

    public User(String name, String email, String password) {
        this.name = name;
        this.email = email;
        this.password = password;
    }

}
