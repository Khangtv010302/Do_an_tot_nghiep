package org.example.vaccine.controller;

import lombok.RequiredArgsConstructor;
import org.example.vaccine.base.ResponseBase;
import org.example.vaccine.model.request.GeneralInjectionRequest;
import org.example.vaccine.service.GeneralInjectionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/API/GeneralInjection")
@RequiredArgsConstructor
public class GeneralInjectionController {
    private final GeneralInjectionService generalInjectionService;
    @PostMapping("")
    ResponseEntity<ResponseBase> insert (@RequestBody GeneralInjectionRequest request)
    {
        return generalInjectionService.insert(request);
    }
    @PutMapping("")
    ResponseEntity<ResponseBase> updateById (@RequestParam String id,@RequestParam String monthOld)
    {
        return generalInjectionService.updateById(id,monthOld);
    }
    @DeleteMapping("")
    ResponseEntity<ResponseBase> deleteById (@RequestParam String id)
    {
        return generalInjectionService.deleteById(id);
    }
    @GetMapping("")
    ResponseEntity<ResponseBase> selectAll ()
    {
        return generalInjectionService.selectAll();
    }


}
