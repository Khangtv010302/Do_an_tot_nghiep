package org.example.vaccine.service;

import org.example.vaccine.base.ResponseBase;
import org.example.vaccine.model.Role;
import org.example.vaccine.model.request.RoleRequest;
import org.springframework.http.ResponseEntity;

public interface RoleService {
    ResponseEntity<ResponseBase> insert(RoleRequest request);
    ResponseEntity<ResponseBase> updateById(Role role);
    ResponseEntity<ResponseBase> deleteById(String id);
    ResponseEntity<ResponseBase> selectAll();
}
