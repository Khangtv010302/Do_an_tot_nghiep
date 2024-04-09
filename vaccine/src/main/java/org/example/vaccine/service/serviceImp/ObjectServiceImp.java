package org.example.vaccine.service.serviceImp;

import lombok.RequiredArgsConstructor;
import org.example.vaccine.base.CommonResponseCode;
import org.example.vaccine.base.ResponseBase;
import org.example.vaccine.base.ResponseData;
import org.example.vaccine.base.ResponseHandle;
import org.example.vaccine.mapper.ObjectMapper;
import org.example.vaccine.model.Objects;
import org.example.vaccine.model.request.ObjectRequest;
import org.example.vaccine.service.ObjectService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ObjectServiceImp implements ObjectService {
    private final ObjectMapper objectMapper;
    private final ResponseHandle handle;
    @Override
    public ResponseEntity<ResponseBase> insert(ObjectRequest objectRequest) {
        CommonResponseCode code = handle.response(objectMapper.insert(objectRequest));
        return ResponseEntity.status(code.getHttp()).body(new ResponseBase(code));
    }

    @Override
    public ResponseEntity<ResponseBase> updateById(Objects objects) {
        CommonResponseCode code = handle.response(objectMapper.updateById(objects));
        return ResponseEntity.status(code.getHttp()).body(new ResponseBase(code));
    }

    @Override
    public ResponseEntity<ResponseBase> deleteById(String id) {
        CommonResponseCode code = handle.response(objectMapper.deleteById(id));
        return ResponseEntity.status(code.getHttp()).body(new ResponseBase(code));
    }

    @Override
    public ResponseEntity<ResponseBase> selectAll() {
        List<Objects> objectsList = objectMapper.selectAll();
        if(objectsList.isEmpty())
            return ResponseEntity.status(CommonResponseCode.NO_FOUND.getHttp()).body(new ResponseBase(CommonResponseCode.NO_FOUND));
        return ResponseEntity.ok(new ResponseData<>(objectsList));
    }

    @Override
    public ResponseEntity<ResponseBase> selectByNameOrEmailOrGuardianName(String info) {
        List<Objects> objectsList = objectMapper.selectByNameOrEmailOrGuardianName(info);
        if(objectsList.isEmpty())
            return ResponseEntity.status(CommonResponseCode.NO_FOUND.getHttp()).body(new ResponseBase(CommonResponseCode.NO_FOUND));
        return ResponseEntity.ok(new ResponseData<>(objectsList));
    }

    @Override
    public ResponseEntity<ResponseBase> selectById(String id) {
        Objects objects = objectMapper.selectById(id);
        if (objects == null)
            return ResponseEntity.status(CommonResponseCode.NO_FOUND.getHttp()).body(new ResponseBase(CommonResponseCode.NO_FOUND));
        return ResponseEntity.ok(new ResponseData<>(objects));
    }
}
