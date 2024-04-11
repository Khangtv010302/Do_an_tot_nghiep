package org.example.vaccine.controller;

import lombok.RequiredArgsConstructor;
import org.apache.ibatis.annotations.Delete;
import org.example.vaccine.base.ResponseBase;
import org.example.vaccine.model.Vaccine;
import org.example.vaccine.model.request.VaccineRequest;
import org.example.vaccine.model.request.VaccineSearchRequest;
import org.example.vaccine.service.VaccineService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/API/Vaccine")
@RequiredArgsConstructor
public class VaccineController {
    private final VaccineService vaccineService;
    @PostMapping(value = "",consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ResponseBase> insert(@RequestParam("file")MultipartFile file,
                                               @RequestParam String name,
                                               @RequestParam String antigen,
                                               @RequestParam int packing,
                                               @RequestParam String unit,
                                               @RequestParam String description,
                                               @RequestParam String origin,
                                               @RequestParam String contraindicated,
                                               @RequestParam String useWithCaution,
                                               @RequestParam String unWantedEffect,
                                               @RequestParam String preserve,
                                               @RequestParam String manufacturerId
                                               ){
        VaccineRequest vaccineRequest = VaccineRequest.builder()
                .contraindicated(contraindicated)
                .description(description)
                .manufacturerId(manufacturerId)
                .unwantedEffect(unWantedEffect)
                .antigen(antigen)
                .origin(origin)
                .packing(packing)
                .preserve(preserve)
                .name(name)
                .unit(unit)
                .useWithCaution(useWithCaution).build();
        return vaccineService.insert(vaccineRequest,file);
    }
    @PutMapping(value = "",consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ResponseBase> updateById(@RequestParam(required = false)MultipartFile file,
                                               @RequestParam String name,
                                               @RequestParam String antigen,
                                               @RequestParam int packing,
                                               @RequestParam String unit,
                                               @RequestParam String description,
                                               @RequestParam String origin,
                                               @RequestParam String contraindicated,
                                               @RequestParam String useWithCaution,
                                               @RequestParam String unWantedEffect,
                                               @RequestParam String preserve,
                                               @RequestParam String manufacturerId,
                                               @RequestParam String id,
                                               @RequestParam String image
    ){
//
        Vaccine vaccine = new Vaccine(manufacturerId,name,antigen,packing,unit,description,origin,contraindicated,useWithCaution,unWantedEffect,preserve,image,id);
        return vaccineService.updateById(vaccine,file);
    }
    @DeleteMapping("")
    public ResponseEntity<ResponseBase> deleteById(@RequestParam String id){
        return vaccineService.deleteById(id);
    }
    @GetMapping("")
    public ResponseEntity<ResponseBase> selectAll(){
        return vaccineService.selectAll();
    }
    @GetMapping("/Id")
    public ResponseEntity<ResponseBase> selectById(@RequestParam String id){
        return vaccineService.selectById(id);
    }
    @PostMapping("/Search")
    public ResponseEntity<ResponseBase> selectByNameOrManufacturerId(@RequestBody VaccineSearchRequest request){
        return vaccineService.selectByNameOrManufacturerId(request);
    }
}