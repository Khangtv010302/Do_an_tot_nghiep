package org.example.vaccine.service;

import org.example.vaccine.base.ResponseBase;
import org.example.vaccine.model.Form;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface FormService {
    ResponseEntity<ResponseBase> insert(String name);
    ResponseEntity<ResponseBase> deleteById(String id);
    ResponseEntity<ResponseBase> selectAll();
}
