package com.prog3.security.Models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Data
@Document
public class RolePermission {

    @Id
    private String _id;
    @DBRef
    private Role role;
    @DBRef
    private Permission permission;
    private int usageCount; // Nuevo atributo para contar las veces que se usa el permiso

    public RolePermission() {
        this.usageCount = 0; // Inicializar el contador en 0
    }
}
