package org.example.vaccine.service;

import org.example.vaccine.base.ResponseBase;
import org.example.vaccine.model.Manufacturer;
import org.example.vaccine.model.UnitDelivering;
import org.example.vaccine.model.request.ManufacturerRequest;
import org.example.vaccine.model.request.UnitDeliveringRequest;
import org.springframework.http.ResponseEntity;

public interface UnitDeliveringService {
    ResponseEntity<ResponseBase> insert(UnitDeliveringRequest request);
    ResponseEntity<ResponseBase> updateById(UnitDelivering manufacturer);
    ResponseEntity<ResponseBase> deleteById(String id);
    ResponseEntity<ResponseBase> selectByName(String name);
}
