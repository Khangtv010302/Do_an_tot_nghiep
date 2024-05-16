package org.example.vaccine.controller;

import lombok.RequiredArgsConstructor;
import org.example.vaccine.base.ResponseBase;
import org.example.vaccine.model.request.HealthcareStaffRequest;
import org.example.vaccine.model.request.HealthcareStaffUpdateRequest;
import org.example.vaccine.service.HealthcareStaffService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/API/HealthcareStaff")
@RequiredArgsConstructor
public class HealthcareStaffController {
    private final HealthcareStaffService healthcareStaffService;
    @PostMapping("")
    ResponseEntity<ResponseBase> insert(@RequestBody HealthcareStaffRequest request){
        return healthcareStaffService.insert(request);
    }
    @PutMapping("")
    ResponseEntity<ResponseBase> updateById(@RequestBody HealthcareStaffUpdateRequest request){
        return healthcareStaffService.updateById(request);
    }
    @DeleteMapping("")
    ResponseEntity<ResponseBase> deleteById(@RequestParam String id){
        return healthcareStaffService.deleteById(id);
    }
    @GetMapping("")
    ResponseEntity<ResponseBase> selectAll(){
        return healthcareStaffService.selectAll();
    }
    @GetMapping("/Search")
    ResponseEntity<ResponseBase> selectByNameOrEmailOrUsername(@RequestParam String info){
        return healthcareStaffService.selectByNameOrEmailOrUsername(info);
    }
    @GetMapping("/id")
    ResponseEntity<ResponseBase> selectById(@RequestParam String id){
        return healthcareStaffService.selectById(id);
    }

}
