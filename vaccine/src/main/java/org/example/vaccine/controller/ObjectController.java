package org.example.vaccine.controller;

import lombok.RequiredArgsConstructor;
import org.example.vaccine.base.ResponseBase;
import org.example.vaccine.model.Objects;
import org.example.vaccine.model.request.ObjectRequest;
import org.example.vaccine.service.ObjectService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/API/Object")
@RequiredArgsConstructor
public class ObjectController {
    private final ObjectService objectService;
    @PostMapping("")
    ResponseEntity<ResponseBase> insert(@RequestBody ObjectRequest objectRequest){
        return objectService.insert(objectRequest);
    }
    @PutMapping("")
    ResponseEntity<ResponseBase> updateById(@RequestBody Objects objects){
        return objectService.updateById(objects);
    }
    @DeleteMapping("")
    ResponseEntity<ResponseBase> deleteById(@RequestParam String id){
        return objectService.deleteById(id);
    }
    @GetMapping("/Id")
    ResponseEntity<ResponseBase> selectById(@RequestParam String id){
        return objectService.selectById(id);
    }
    @GetMapping("")
    ResponseEntity<ResponseBase> selectAll(){
        return objectService.selectAll();
    }
    @GetMapping("/Info")
    ResponseEntity<ResponseBase> selectByNameOrEmailOrGuardianName(@RequestParam String info){
        return objectService.selectByNameOrEmailOrGuardianName(info);
    }

}
