package org.example.vaccine.service;

import org.example.vaccine.base.ResponseBase;
import org.example.vaccine.model.Manufacturer;
import org.example.vaccine.model.request.ManufacturerRequest;
import org.springframework.http.ResponseEntity;

public interface ManufacturerService {
    ResponseEntity<ResponseBase> insert(ManufacturerRequest request);
    ResponseEntity<ResponseBase> updateById(Manufacturer manufacturer);
    ResponseEntity<ResponseBase> deleteById(String id);
    ResponseEntity<ResponseBase> selectAll();
}
