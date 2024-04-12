package org.example.vaccine.service;

import org.example.vaccine.base.ResponseBase;
import org.example.vaccine.exception.DeleteException;
import org.example.vaccine.exception.UpdateException;
import org.example.vaccine.model.Plan;
import org.example.vaccine.model.request.PlanRequest;
import org.springframework.http.ResponseEntity;

import java.time.LocalDate;

public interface PlanService {
    ResponseEntity<ResponseBase> insert(PlanRequest request);
    ResponseEntity<ResponseBase> updateById(Plan plan) throws UpdateException;
    ResponseEntity<ResponseBase> deleteById(String id) throws DeleteException;
    ResponseEntity<ResponseBase> selectAll();
    ResponseEntity<ResponseBase> selectByFromDateToDate(LocalDate fromDate,LocalDate toDate);
    ResponseEntity<ResponseBase> selectById(String id);
}
