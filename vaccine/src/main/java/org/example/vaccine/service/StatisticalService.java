package org.example.vaccine.service;

import org.example.vaccine.base.ResponseBase;
import org.springframework.http.ResponseEntity;

import java.time.LocalDate;

public interface StatisticalServer {
    ResponseEntity<ResponseBase> numberObjectInjected(LocalDate fromDate,LocalDate toDate);
}
