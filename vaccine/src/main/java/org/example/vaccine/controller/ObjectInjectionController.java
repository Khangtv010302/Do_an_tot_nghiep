package org.example.vaccine.controller;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import org.example.vaccine.base.ResponseBase;
import org.example.vaccine.model.ObjectInjection;
import org.example.vaccine.model.request.ObjectInjectionRequest;
import org.example.vaccine.model.request.ObjectInjectionUpdateRequest;
import org.example.vaccine.service.ObjectInjectionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/API/ObjectInjection")
@RequiredArgsConstructor
@SecurityRequirement(name = "userAuth")
public class ObjectInjectionController {
    private final ObjectInjectionService objectInjectionService;
    @PostMapping("/InsertAll")
    ResponseEntity<ResponseBase> insertAll (@RequestParam String objectId){
        return objectInjectionService.insertAll(objectId);
    }
    @PostMapping("")
    ResponseEntity<ResponseBase> insert (@RequestBody ObjectInjectionRequest request){
        return objectInjectionService.insert(request);
    }
    @PutMapping("")
    ResponseEntity<ResponseBase> updateById (@RequestBody ObjectInjectionUpdateRequest request){
        return objectInjectionService.updateById(request);
    }
    @DeleteMapping("")
    ResponseEntity<ResponseBase> deleteByObjectIdAndId (@RequestParam String id){
        return objectInjectionService.deleteByObjectIdAndId(id);
    }
    @GetMapping("/SelectByObjectId")
    ResponseEntity<ResponseBase> selectByObjectId (@RequestParam String objectId){
        return objectInjectionService.selectByObjectID(objectId);
    }
    @GetMapping("/SelectByObjectIdAndId")
    ResponseEntity<ResponseBase> selectByObjectId (@RequestParam String objectId,@RequestParam String id){
        return objectInjectionService.selectByObjectIdAndId(objectId,id);
    }
    @GetMapping("/SelectByObjectIdAndName")
    ResponseEntity<ResponseBase> selectByObjectIdAndName (@RequestParam String objectId,@RequestParam String name){
        return objectInjectionService.selectByObjectIdAndName(objectId,name);
    }
    @GetMapping("/SelectListLotNumberByVaccineId")
    ResponseEntity<ResponseBase> selectByObjectIdAndName (@RequestParam String vaccineId){
        return objectInjectionService.selectListLotNumberByVaccineId(vaccineId);
    }


}
