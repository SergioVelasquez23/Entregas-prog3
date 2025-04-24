package com.prog3.security.Models;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Setter
@Getter
@Data
@Document
public class Role {
    @Id
    private String _id;
    private String name;
    private String description;

    public Role(String name, String description) {
        this.name = name;
        this.description = description;
    }

    public String getId() { return _id; }
    public void setId(String id) { this._id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
}
