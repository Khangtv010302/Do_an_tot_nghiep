package org.example.vaccine.service;

import org.example.vaccine.base.ResponseBase;
import org.example.vaccine.exception.RoleConstraintException;
import org.example.vaccine.model.Role;
import org.example.vaccine.model.request.RoleRequest;
import org.springframework.http.ResponseEntity;

public interface RoleService {
    ResponseEntity<ResponseBase> insert(RoleRequest request);
    ResponseEntity<ResponseBase> deleteById(String id) throws RoleConstraintException;
    ResponseEntity<ResponseBase> selectAll();
    ResponseEntity<ResponseBase> selectById(String id);
}
