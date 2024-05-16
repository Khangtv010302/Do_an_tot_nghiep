package org.example.vaccine.controller;

import lombok.RequiredArgsConstructor;
import org.apache.ibatis.annotations.Delete;
import org.example.vaccine.base.ResponseBase;
import org.example.vaccine.model.Manufacturer;
import org.example.vaccine.model.request.ManufacturerRequest;
import org.example.vaccine.service.ManufacturerService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/API/Manufacturer")
@RequiredArgsConstructor
public class ManufacturerController {
    private final ManufacturerService manufacturerService;
    @PostMapping("")
    public ResponseEntity<ResponseBase> insert(@RequestBody ManufacturerRequest request){
        return manufacturerService.insert(request);
    }
    @PutMapping("")
    public ResponseEntity<ResponseBase> updateById(@RequestBody Manufacturer manufacturer){
        return manufacturerService.updateById(manufacturer);
    }
    @DeleteMapping("")
    public ResponseEntity<ResponseBase> deleteById(@RequestParam String id){
        return manufacturerService.deleteById(id);
    }
    @GetMapping("")
    public ResponseEntity<ResponseBase> selectAll(){
        return manufacturerService.selectAll();
    }
}
