package org.example.vaccine.service.serviceImp;

import lombok.RequiredArgsConstructor;
import org.example.vaccine.base.CommonResponseCode;
import org.example.vaccine.base.ResponseBase;
import org.example.vaccine.base.ResponseHandle;
import org.example.vaccine.mapper.GeneralInjectionMapper;
import org.example.vaccine.mapper.ObjectInjectionMapper;
import org.example.vaccine.model.GeneralInjection;
import org.example.vaccine.model.response.GeneralInjectionResponse;
import org.example.vaccine.service.ObjectInjectionService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ObjectInjectionServiceImp implements ObjectInjectionService {
    private final ObjectInjectionMapper objectInjectionMapper;
    private final GeneralInjectionMapper generalInjectionMapper;
    private final ResponseHandle handle;

    @Override
    public ResponseEntity<ResponseBase> insert(String objectId) {
        List<GeneralInjectionResponse> generalInjections = generalInjectionMapper.selectAll();
        if (generalInjections.isEmpty())
            ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ResponseBase(0,"No found general injection"));
        objectInjectionMapper.insert(objectId);
        return ResponseEntity.ok().body(new ResponseBase());
    }
}
