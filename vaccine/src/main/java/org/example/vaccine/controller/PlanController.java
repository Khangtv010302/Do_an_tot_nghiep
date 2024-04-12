package org.example.vaccine.controller;

import lombok.RequiredArgsConstructor;
import org.apache.ibatis.annotations.Delete;
import org.example.vaccine.base.ResponseBase;

import org.example.vaccine.exception.DeleteException;
import org.example.vaccine.exception.UpdateException;
import org.example.vaccine.model.Plan;
import org.example.vaccine.model.request.PlanRequest;
import org.example.vaccine.service.PlanService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/API/Plan")
@RequiredArgsConstructor
public class PlanController {
    private final PlanService planService;
    @PostMapping("")
    ResponseEntity<ResponseBase> insert(@RequestBody PlanRequest request){
        return planService.insert(request);
    }
    @PutMapping("")
    ResponseEntity<ResponseBase> updateById(@RequestBody Plan plan) throws UpdateException {
        return planService.updateById(plan);
    }
    @DeleteMapping("")
    ResponseEntity<ResponseBase> deleteById(@RequestParam String id) throws DeleteException {
        return planService.deleteById(id);
    }
    @GetMapping("")
    ResponseEntity<ResponseBase> selectAll(){
        return planService.selectAll();
    }
}
