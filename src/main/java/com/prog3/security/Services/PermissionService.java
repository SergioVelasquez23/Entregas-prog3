package com.prog3.security.Services;

import com.prog3.security.Models.Permission;
import com.prog3.security.Models.RolePermission;
import com.prog3.security.Repositories.PermissionRepository;
import com.prog3.security.Repositories.RolePermissionRepository;
import com.prog3.security.Repositories.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class PermissionService {
    private final RolePermissionRepository rolePermissionRepository;
    private final PermissionRepository permissionRepository;

    @Autowired
    public PermissionService(RolePermissionRepository rolePermissionRepository,
                             PermissionRepository permissionRepository) {
        this.rolePermissionRepository = rolePermissionRepository;
        this.permissionRepository = permissionRepository;
    }

    public String findMostUsedPermissionUrlByRole(String roleId) {
        // Obtener todas las relaciones RolePermission para el roleId dado
        List<RolePermission> rolePermissions = rolePermissionRepository.findByRoleId(roleId);

        if (rolePermissions.isEmpty()) {
            return null;  // No hay permisos asociados al rol
        }

        // Contar ocurrencias de cada permissionId
        Map<String, Long> permissionCount = rolePermissions.stream()
                .collect(Collectors.groupingBy(RolePermission::getPermissionId, Collectors.counting()));

        // Encontrar el permissionId con más ocurrencias
        String mostUsedPermissionId = permissionCount.entrySet().stream()
                .max(Map.Entry.comparingByValue())
                .map(Map.Entry::getKey)
                .orElse(null);

        if (mostUsedPermissionId == null) {
            return null;
        }

        // Obtener la URL del permiso más usado
        return permissionRepository.findById(mostUsedPermissionId)
                .map(Permission::getUrl)
                .orElse(null);
    }

}