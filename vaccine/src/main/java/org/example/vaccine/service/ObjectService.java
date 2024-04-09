package org.example.vaccine.service;

import org.example.vaccine.base.ResponseBase;
import org.example.vaccine.model.Objects;
import org.example.vaccine.model.request.ObjectRequest;
import org.springframework.http.ResponseEntity;

public interface ObjectService {
    ResponseEntity<ResponseBase> insert(ObjectRequest objectRequest);
    ResponseEntity<ResponseBase> updateById(Objects objects);
    ResponseEntity<ResponseBase> deleteById(String id);
    ResponseEntity<ResponseBase> selectAll();
    ResponseEntity<ResponseBase> selectByNameOrEmailOrGuardianName(String info);
    ResponseEntity<ResponseBase> selectById(String id);
}
