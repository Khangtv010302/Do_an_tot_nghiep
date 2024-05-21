package org.example.vaccine.controller;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import org.example.vaccine.base.ResponseBase;
import org.example.vaccine.model.request.VaccineStatisticalRequest;
import org.example.vaccine.model.response.VaccineStatisticalResponse;
import org.example.vaccine.service.StatisticalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/API/Statistical")
@SecurityRequirement(name = "userAuth")
public class StatisticalController {
    StatisticalService statisticalService;

    @Autowired
    public StatisticalController(StatisticalService statisticalService) {
        this.statisticalService = statisticalService;
    }

    @GetMapping("/NumberObject")
    ResponseEntity<ResponseBase> numberObjectInjected(@RequestParam LocalDate fromDate,@RequestParam LocalDate toDate){
        return statisticalService.numberObjectInjected(fromDate,toDate);
    }
    @GetMapping("/NumberOldVaccine")
    ResponseEntity<ResponseBase> numberOldVaccine(@RequestParam LocalDate fromDate,@RequestParam LocalDate toDate){
        return statisticalService.numberOldVaccine(fromDate,toDate);
    }
    @GetMapping("/NumberNewVaccine")
    ResponseEntity<ResponseBase> numberNewVaccine(@RequestParam LocalDate fromDate,@RequestParam LocalDate toDate){
        return statisticalService.numberNewVaccine(fromDate,toDate);
    }
    @GetMapping("/NumberVaccineInjected")
    ResponseEntity<ResponseBase> numberVaccineInjected(@RequestParam LocalDate fromDate,@RequestParam LocalDate toDate){
        return statisticalService.numberVaccineInjected(fromDate,toDate);
    }
    @GetMapping("/NumberObjectReaction")
    ResponseEntity<ResponseBase> numberObjectReaction(@RequestParam LocalDate fromDate,@RequestParam LocalDate toDate){
        return statisticalService.numberObjectReaction(fromDate,toDate);
    }
    @GetMapping("/GetAllNumberByVaccineId")
    ResponseEntity<ResponseBase> getAllNumberByVaccineId(@RequestParam LocalDate fromDate,
                                                         @RequestParam LocalDate toDate,
                                                         @RequestParam String vaccineId){
        return statisticalService.getAllNumberByVaccineId(fromDate,toDate,vaccineId);
    }
    @PostMapping("/CreateExcel")
    ResponseEntity<byte[]> createExcel(@RequestBody List<VaccineStatisticalRequest> requestList) throws IOException {
        return statisticalService.createExcel(requestList);
    }
}
