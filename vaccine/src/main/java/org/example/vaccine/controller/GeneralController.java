package org.example.vaccine.controller;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import org.example.vaccine.base.ResponseBase;
import org.example.vaccine.service.GeneralService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/API/General")
@SecurityRequirement(name = "userAuth")
public class GeneralController {

    GeneralService generalService;

    @Autowired
    public GeneralController(GeneralService generalService) {
        this.generalService = generalService;
    }

    @GetMapping("/Vaccine")
    public ResponseEntity<ResponseBase> selectAllVaccine(){
        return generalService.selectAllVaccine();
    }
    @GetMapping("/Role")
    public ResponseEntity<ResponseBase> selectAllRole(){
        return generalService.selectAllRole();
    }
}
