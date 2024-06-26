package org.example.vaccine.service;

import org.example.vaccine.base.ResponseBase;
import org.example.vaccine.model.Vaccine;
import org.example.vaccine.model.request.VaccineRequest;
import org.example.vaccine.model.request.VaccineSearchRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

public interface VaccineService {
    ResponseEntity<ResponseBase> insert(VaccineRequest vaccine,MultipartFile file);
    ResponseEntity<ResponseBase> updateById(Vaccine vaccine,MultipartFile file);
    ResponseEntity<ResponseBase> deleteById(String id);
    ResponseEntity<ResponseBase> selectAll();
    ResponseEntity<ResponseBase> selectByNameOrManufacturerId(String name,String manufacturerId);
    ResponseEntity<ResponseBase> selectById(String id);

}
