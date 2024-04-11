package org.example.vaccine.service;

import org.example.vaccine.base.ResponseBase;
import org.springframework.http.ResponseEntity;

public interface ObjectInjectionService {
    ResponseEntity<ResponseBase> insert(String objectId);
}
