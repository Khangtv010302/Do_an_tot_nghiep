package org.example.vaccine.service;

import org.example.vaccine.base.ResponseBase;
import org.example.vaccine.model.ObjectInjection;
import org.example.vaccine.model.request.ObjectInjectionRequest;
import org.example.vaccine.model.request.ObjectInjectionUpdateRequest;
import org.springframework.http.ResponseEntity;

public interface ObjectInjectionService {
    ResponseEntity<ResponseBase> insertAll(String objectId);
    ResponseEntity<ResponseBase> insert(ObjectInjectionRequest request);
    ResponseEntity<ResponseBase> updateById(ObjectInjectionUpdateRequest request);
    ResponseEntity<ResponseBase> deleteByObjectIdAndId(String objectId, String id);
    ResponseEntity<ResponseBase> selectByObjectIdAndId(String objectId,String id);
    ResponseEntity<ResponseBase> selectByObjectID(String objectID);
}
