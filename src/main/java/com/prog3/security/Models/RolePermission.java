package com.prog3.security.Models;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Setter
@Getter
@Data
@Document
public class RolePermission {
    @DBRef
    private Role role;
    @DBRef
    private Permission permission;

    public RolePermission() {

    }
    @Id
    private String id;

    @Field("role_id")
    private String roleId;

    @Field("permission_id")
    private String permissionId;

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getRoleId() { return roleId; }
    public void setRoleId(String roleId) { this.roleId = roleId; }  // Línea 28 podría ser esta
    public String getPermissionId() { return permissionId; }
    public void setPermissionId(String permissionId) { this.permissionId = permissionId; }
}
