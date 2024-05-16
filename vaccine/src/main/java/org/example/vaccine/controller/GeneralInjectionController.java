package org.example.vaccine.controller;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import org.example.vaccine.base.ResponseBase;
import org.example.vaccine.model.request.GeneralInjectionRequest;
import org.example.vaccine.service.GeneralInjectionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/API/GeneralInjection")
@RequiredArgsConstructor
@SecurityRequirement(name = "userAuth")
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
    @DeleteMapping("/VaccineId-MonthOld")
    ResponseEntity<ResponseBase> deleteById (@RequestParam String vaccineId,@RequestParam int monthOld)
    {
        return generalInjectionService.deleteByVaccineIdAndMonthOld(vaccineId,monthOld);
    }
    @DeleteMapping("/VaccineId")
    ResponseEntity<ResponseBase> deleteById (@RequestParam String vaccineId)
    {
        return generalInjectionService.deleteByVaccineId(vaccineId);
    }
    @GetMapping("")
    ResponseEntity<ResponseBase> selectAll ()
    {
        return generalInjectionService.selectAll();
    }


}
