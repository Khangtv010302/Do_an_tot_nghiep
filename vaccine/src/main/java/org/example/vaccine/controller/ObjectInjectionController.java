package org.example.vaccine.controller;

import lombok.RequiredArgsConstructor;
import org.example.vaccine.base.ResponseBase;
import org.example.vaccine.service.ObjectInjectionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/API/ObjectInjection")
@RequiredArgsConstructor
public class ObjectInjectionController {
    private final ObjectInjectionService objectInjectionService;
    @PostMapping("")
    ResponseEntity<ResponseBase> insert (@RequestParam String objectId){
        return objectInjectionService.insert(objectId);
    }
}
