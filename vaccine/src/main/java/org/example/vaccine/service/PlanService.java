package org.example.vaccine.service;

import org.example.vaccine.base.ResponseBase;
import org.example.vaccine.exception.DeleteException;
import org.example.vaccine.exception.DuplicateScheduledDate;
import org.example.vaccine.exception.UpdateException;
import org.example.vaccine.model.Plan;
import org.example.vaccine.model.request.PlanRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Scheduled;

import java.time.LocalDate;

public interface PlanService {
    ResponseEntity<ResponseBase> insert(PlanRequest request) throws DuplicateScheduledDate;
    ResponseEntity<ResponseBase> updateById(Plan plan) throws UpdateException, DuplicateScheduledDate;
    ResponseEntity<ResponseBase> deleteById(String id) throws DeleteException;
    ResponseEntity<ResponseBase> selectByFromDayToDay(LocalDate fromDay,LocalDate toDay);
    ResponseEntity<ResponseBase> selectById(String id);
    void reminder(LocalDate scheduledDate);
}
