package com.prog3.security.Models;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Setter
@Getter
@Data
@Document
public class Permission {

    private String url;
    private String method;

    public Permission(String url, String method) {
        this.url = url;
        this.method = method;
    }
    @Id
    private String _id;

    @Field("role_id")
    private String roleId;

    @Field("permission_id")
    private String permissionId;

    public String getId() { return _id; }
    public void setId(String id) { this._id = id; }
    public String getRoleId() { return roleId; }
    public void setRoleId(String roleId) { this.roleId = roleId; }  // Línea 28 podría ser esta
    public String getPermissionId() { return permissionId; }
    public void setPermissionId(String permissionId) { this.permissionId = permissionId; }

    public String getUrl() { return url; }
    public void setUrl(String url) { this.url = url; }
}










//private int timesErrorValidationCode;
//
//java
//public Session() {
//    this.timesErrorValidationCode = 0;
//}
//}

