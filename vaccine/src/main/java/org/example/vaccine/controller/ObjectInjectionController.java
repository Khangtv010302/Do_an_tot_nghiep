package org.example.vaccine.controller;

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
    ResponseEntity<ResponseBase> deleteByObjectIdAndId (@RequestParam String objectId,@RequestParam String id){
        return objectInjectionService.deleteByObjectIdAndId(objectId,id);
    }
    @GetMapping("/SelectByObjectId")
    ResponseEntity<ResponseBase> selectByObjectId (@RequestParam String objectId){
        return objectInjectionService.selectByObjectID(objectId);
    }
    @GetMapping("/SelectByObjectIdAnId")
    ResponseEntity<ResponseBase> selectByObjectId (@RequestParam String objectId,@RequestParam String id){
        return objectInjectionService.selectByObjectIdAndId(objectId,id);
    }

}
