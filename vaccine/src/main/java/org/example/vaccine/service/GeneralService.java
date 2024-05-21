package org.example.vaccine.service;

import org.example.vaccine.base.ResponseBase;
import org.springframework.http.ResponseEntity;

import java.time.LocalDate;

public interface GeneralService {
    ResponseEntity<ResponseBase> selectAllVaccine();
    ResponseEntity<ResponseBase> selectAllVaccineName();
    ResponseEntity<ResponseBase> selectAllRole();
    ResponseEntity<ResponseBase>selectObjectInjectionFromDateToDate(LocalDate fromDate,LocalDate toDate,Boolean reaction,Boolean state);
}
