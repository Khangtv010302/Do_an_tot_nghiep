package org.example.vaccine.service;

import org.example.vaccine.base.ResponseBase;
import org.example.vaccine.model.HealthcareStaff;
import org.example.vaccine.model.request.HealthcareSearchRequest;
import org.example.vaccine.model.request.HealthcareStaffRequest;
import org.example.vaccine.model.request.HealthcareStaffUpdateRequest;
import org.springframework.http.ResponseEntity;

public interface HealthcareStaffService {
    ResponseEntity<ResponseBase> insert(HealthcareStaffRequest request);
    ResponseEntity<ResponseBase> updateById(HealthcareStaffUpdateRequest healthcareStaff);
    ResponseEntity<ResponseBase> deleteById(String id);
    ResponseEntity<ResponseBase> selectAll();
    ResponseEntity<ResponseBase> selectByNameOrEmailOrUsername(HealthcareSearchRequest healthcareSearchRequest);
    ResponseEntity<ResponseBase> selectById(String id);
}
