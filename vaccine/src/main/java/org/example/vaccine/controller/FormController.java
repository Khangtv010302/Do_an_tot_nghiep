package org.example.vaccine.controller;

import lombok.RequiredArgsConstructor;
import org.example.vaccine.base.ResponseBase;
import org.example.vaccine.mapper.FormMapper;
import org.example.vaccine.service.FormService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/API/Form")
@RequiredArgsConstructor
public class FormController {
    private final FormService formService;
    @PostMapping("")
    public ResponseEntity<ResponseBase> insert(@RequestParam String name){
        return formService.insert(name);
    }
    @DeleteMapping("")
    public ResponseEntity<ResponseBase> deleteById(@RequestParam String id){
        return formService.deleteById(id);
    }
    @GetMapping("")
    public ResponseEntity<ResponseBase> selectAll(){
        return formService.selectAll();
    }
}
