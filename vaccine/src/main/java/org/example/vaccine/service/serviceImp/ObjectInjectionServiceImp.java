package org.example.vaccine.service.serviceImp;

import lombok.RequiredArgsConstructor;
import org.example.vaccine.base.CommonResponseCode;
import org.example.vaccine.base.ResponseBase;
import org.example.vaccine.base.ResponseData;
import org.example.vaccine.base.ResponseHandle;
import org.example.vaccine.mapper.GeneralInjectionMapper;
import org.example.vaccine.mapper.ObjectInjectionMapper;
import org.example.vaccine.model.GeneralInjection;
import org.example.vaccine.model.ObjectInjection;
import org.example.vaccine.model.request.ObjectInjectionRequest;
import org.example.vaccine.model.request.ObjectInjectionUpdateRequest;
import org.example.vaccine.model.response.GeneralInjectionResponse;
import org.example.vaccine.model.response.ObjectInjectionDetailResponse;
import org.example.vaccine.model.response.ObjectInjectionResponse;
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
    public ResponseEntity<ResponseBase> insertAll(String objectId) {
        //insert All from general_injection
        List<GeneralInjectionResponse> generalInjections = generalInjectionMapper.selectAll();
        if (generalInjections.isEmpty())
            ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ResponseBase(0,"No found general injection"));
        objectInjectionMapper.insertAll(objectId);
        return ResponseEntity.ok().body(new ResponseBase());
    }

    @Override
    public ResponseEntity<ResponseBase> insert(ObjectInjectionRequest request) {
        CommonResponseCode code = handle.response(objectInjectionMapper.insert(request));
        return ResponseEntity.status(code.getHttp()).body(new ResponseBase(code));
    }

    @Override
    public ResponseEntity<ResponseBase> updateById(ObjectInjectionUpdateRequest request) {
        CommonResponseCode code = handle.response(objectInjectionMapper.updateById(request));
        return ResponseEntity.status(code.getHttp()).body(new ResponseBase(code));
    }

    @Override
    public ResponseEntity<ResponseBase> deleteByObjectIdAndId(String objectId, String id) {
        CommonResponseCode code = handle.response(objectInjectionMapper.deleteById(objectId,id));
        return ResponseEntity.status(code.getHttp()).body(new ResponseBase(code));
    }

    @Override
    public ResponseEntity<ResponseBase> selectByObjectIdAndId(String objectId,String id) {
        ObjectInjectionDetailResponse objectInjection = objectInjectionMapper.selectByObjectIdAndId(objectId,id);
        if (objectInjection == null)
            return ResponseEntity.status(CommonResponseCode.NO_FOUND.getHttp()).body(new ResponseBase(CommonResponseCode.NO_FOUND));
        return ResponseEntity.ok().body(new ResponseData<>(objectInjection));
    }

    @Override
    public ResponseEntity<ResponseBase> selectByObjectID(String objectId) {
        List<ObjectInjectionResponse> objectInjectionList = objectInjectionMapper.selectByObjectID(objectId);
        if(objectInjectionList.isEmpty())
            return ResponseEntity.status(CommonResponseCode.NO_FOUND.getHttp()).body(new ResponseBase(CommonResponseCode.NO_FOUND));
        return ResponseEntity.ok().body(new ResponseData<>(objectInjectionList));
    }
}
