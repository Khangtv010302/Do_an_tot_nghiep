package org.example.vaccine.service;

import org.example.vaccine.base.ResponseBase;
import org.springframework.http.ResponseEntity;

public interface GeneralService {
    ResponseEntity<ResponseBase> selectAllVaccine();
    ResponseEntity<ResponseBase> selectAllRole();
}
