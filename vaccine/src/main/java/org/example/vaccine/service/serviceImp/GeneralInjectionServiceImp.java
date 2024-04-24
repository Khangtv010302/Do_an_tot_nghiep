package org.example.vaccine.service.serviceImp;

import lombok.RequiredArgsConstructor;
import org.example.vaccine.base.CommonResponseCode;
import org.example.vaccine.base.ResponseBase;
import org.example.vaccine.base.ResponseData;
import org.example.vaccine.base.ResponseHandle;
import org.example.vaccine.mapper.GeneralInjectionMapper;
import org.example.vaccine.model.GeneralInjection;
import org.example.vaccine.model.request.GeneralInjectionRequest;
import org.example.vaccine.model.response.GeneralInjectionResponse;
import org.example.vaccine.service.GeneralInjectionService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class GeneralInjectionServiceImp implements GeneralInjectionService {
    private final GeneralInjectionMapper generalInjectionMapper;
    private final ResponseHandle handle;

    @Override
    public ResponseEntity<ResponseBase> insert(GeneralInjectionRequest request) {
        CommonResponseCode code = handle.response(generalInjectionMapper.insert(request));
        return ResponseEntity.status(code.getHttp()).body(new ResponseBase(code));
    }

    @Override
    public ResponseEntity<ResponseBase> updateById(String id, String monthOld) {
        CommonResponseCode code = handle.response(generalInjectionMapper.updateById(id,monthOld));
        return ResponseEntity.status(code.getHttp()).body(new ResponseBase(code));
    }

    @Override
    public ResponseEntity<ResponseBase> deleteById(String id) {
        CommonResponseCode code = handle.response(generalInjectionMapper.delete(id));
        return ResponseEntity.status(code.getHttp()).body(new ResponseBase(code));
    }

    @Override
    public ResponseEntity<ResponseBase> selectAll() {
        List<GeneralInjectionResponse> generalInjections = generalInjectionMapper.selectAll();
        return ResponseEntity.ok(new ResponseData<>(generalInjections));
    }
}
