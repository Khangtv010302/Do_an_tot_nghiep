package org.example.vaccine.service;

import org.apache.ibatis.annotations.Select;
import org.example.vaccine.base.ResponseBase;
import org.springframework.http.ResponseEntity;

public interface DashBoardService {
    ResponseEntity<ResponseBase> selectNumberObjectReminder();

    ResponseEntity<ResponseBase> selectNumberVaccineByVaccineId(String vaccineId);

    ResponseEntity<ResponseBase> selectNumberPlanComplete();

    ResponseEntity<ResponseBase> selectNumberReceiveDeliver();
    ResponseEntity<ResponseBase> selectNumberVaccine();
}
