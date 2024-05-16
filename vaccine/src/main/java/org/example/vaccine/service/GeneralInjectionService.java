package org.example.vaccine.service;

import org.example.vaccine.base.ResponseBase;
import org.example.vaccine.model.request.GeneralInjectionRequest;
import org.springframework.http.ResponseEntity;

public interface GeneralInjectionService {
    ResponseEntity<ResponseBase> insert(GeneralInjectionRequest request);
    ResponseEntity<ResponseBase> updateById(String id,String monthOld);
    ResponseEntity<ResponseBase> deleteByVaccineIdAndMonthOld(String vaccineId,int monthOld);
    ResponseEntity<ResponseBase> deleteByVaccineId(String vaccineId);
    ResponseEntity<ResponseBase> selectAll();
}
