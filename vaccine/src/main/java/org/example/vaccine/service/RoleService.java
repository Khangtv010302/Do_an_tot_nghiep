package org.example.vaccine.service;

import org.example.vaccine.base.ResponseBase;
import org.example.vaccine.model.Role;
import org.example.vaccine.model.request.RoleRequest;
import org.springframework.http.ResponseEntity;

public interface RoleService {
    ResponseEntity<ResponseBase> insertRole(RoleRequest request);
    ResponseEntity<ResponseBase> updateRole(Role role);
    ResponseEntity<ResponseBase> deleteRole(String id);
    ResponseEntity<ResponseBase> selectAll();
}
