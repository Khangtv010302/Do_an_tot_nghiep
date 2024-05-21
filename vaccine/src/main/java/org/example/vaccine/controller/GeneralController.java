package org.example.vaccine.controller;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import org.example.vaccine.base.ResponseBase;
import org.example.vaccine.service.GeneralService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;

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
    @GetMapping("/VaccineName")
    public ResponseEntity<ResponseBase> selectAllVaccineName(){
        return generalService.selectAllVaccineName();
    }
    @GetMapping("/Role")
    public ResponseEntity<ResponseBase> selectAllRole(){
        return generalService.selectAllRole();
    }
    @GetMapping("/History")
    public ResponseEntity<ResponseBase> selectObjectInjectionFromDateToDate(@RequestParam LocalDate fromDate,@RequestParam LocalDate toDate,
    @RequestParam Boolean reaction,@RequestParam Boolean state){
        return  generalService.selectObjectInjectionFromDateToDate(fromDate,toDate,reaction,state);
    }
}
