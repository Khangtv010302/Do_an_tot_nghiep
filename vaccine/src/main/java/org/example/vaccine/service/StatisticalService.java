package org.example.vaccine.service;

import org.example.vaccine.base.ResponseBase;
import org.example.vaccine.model.request.VaccineStatisticalRequest;
import org.springframework.http.ResponseEntity;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;

public interface StatisticalService {
    ResponseEntity<ResponseBase> numberObjectInjected(LocalDate fromDate,LocalDate toDate);
    ResponseEntity<ResponseBase> numberOldVaccine(LocalDate fromDate,LocalDate toDate);
    ResponseEntity<ResponseBase> numberNewVaccine(LocalDate fromDate,LocalDate toDate);
    ResponseEntity<ResponseBase> numberVaccineInjected(LocalDate fromDate,LocalDate toDate);
    ResponseEntity<ResponseBase> numberObjectReaction(LocalDate fromDate,LocalDate toDate);
    ResponseEntity<ResponseBase> getAllNumberByVaccineId(LocalDate fromDate,LocalDate toDate,String vaccineId);
    ResponseEntity<byte[]> createExcel(List<VaccineStatisticalRequest> requestList) throws IOException;
}
