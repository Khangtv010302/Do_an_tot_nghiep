package org.example.vaccine.controller;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import org.example.vaccine.base.ResponseBase;
import org.example.vaccine.service.DashBoardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/API/DashBoard")
@SecurityRequirement(name = "userAuth")
public class DashBoardController {
    DashBoardService dashBoardService;

    @Autowired
    public DashBoardController(DashBoardService dashBoardService) {
        this.dashBoardService = dashBoardService;
    }
    @GetMapping("/SelectNumberObjectReminder")
    ResponseEntity<ResponseBase> selectNumberObjectReminder(){
        return  dashBoardService.selectNumberObjectReminder();
    }
    @GetMapping("/SelectNumberVaccineByVaccineId")
    ResponseEntity<ResponseBase> selectNumberVaccineByVaccineId(@RequestParam String vaccineId){
        return dashBoardService.selectNumberVaccineByVaccineId(vaccineId);
    }
    @GetMapping("/SelectNumberPlanComplete")
    ResponseEntity<ResponseBase> selectNumberPlanComplete(){
        return dashBoardService.selectNumberPlanComplete();
    }
    @GetMapping("/SelectNumberReceiveDeliver")
    ResponseEntity<ResponseBase> selectNumberReceiveDeliver(){
        return dashBoardService.selectNumberReceiveDeliver();

    }
    @GetMapping("/SelectNumberVaccine")
    ResponseEntity<ResponseBase> selectNumberVaccine(){
        return dashBoardService.selectNumberVaccine();
    }
}
