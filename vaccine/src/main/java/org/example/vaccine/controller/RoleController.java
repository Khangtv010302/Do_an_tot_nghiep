package org.example.vaccine.controller;

import lombok.RequiredArgsConstructor;
import org.example.vaccine.base.ResponseBase;
import org.example.vaccine.exception.RoleConstraintException;
import org.example.vaccine.model.Role;
import org.example.vaccine.model.request.RoleRequest;
import org.example.vaccine.service.RoleService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/API/Role")
@RequiredArgsConstructor
public class RoleController {
    private final RoleService roleService;
    @PostMapping("")
    public ResponseEntity<ResponseBase> insertRole(@RequestBody RoleRequest request){
        return roleService.insert(request);
    }
    @GetMapping("")
    public ResponseEntity<ResponseBase> selectAll(){
        return roleService.selectAll();
    }
    @DeleteMapping("")
    public ResponseEntity<ResponseBase> deleteRoleById(@RequestParam String id)  {
    return roleService.deleteById(id);
    }
    @GetMapping("/id")
    public  ResponseEntity<ResponseBase> getRoleById(@RequestParam String roleId){
        return roleService.selectById(roleId);
    }
}
