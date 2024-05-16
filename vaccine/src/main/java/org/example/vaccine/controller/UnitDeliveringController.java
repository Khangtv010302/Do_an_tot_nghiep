package org.example.vaccine.controller;

import lombok.RequiredArgsConstructor;
import org.example.vaccine.base.ResponseBase;
import org.example.vaccine.model.Manufacturer;
import org.example.vaccine.model.UnitDelivering;
import org.example.vaccine.model.request.ManufacturerRequest;
import org.example.vaccine.model.request.UnitDeliveringRequest;
import org.example.vaccine.service.ManufacturerService;
import org.example.vaccine.service.UnitDeliveringService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/API/UnitDelivering")
@RequiredArgsConstructor
public class UnitDeliveringController {
    private final UnitDeliveringService unitDeliveringService;
    @PostMapping("")
    public ResponseEntity<ResponseBase> insert(@RequestBody UnitDeliveringRequest request){
        return unitDeliveringService.insert(request);
    }
    @PutMapping("")
    public ResponseEntity<ResponseBase> updateById(@RequestBody UnitDelivering manufacturer){
        return unitDeliveringService.updateById(manufacturer);
    }
    @DeleteMapping("")
    public ResponseEntity<ResponseBase> deleteById(@RequestParam String id){
        return unitDeliveringService.deleteById(id);
    }
    @GetMapping("")
    public ResponseEntity<ResponseBase> selectByName(@RequestParam String name){
        return unitDeliveringService.selectByName(name);
    }
}
