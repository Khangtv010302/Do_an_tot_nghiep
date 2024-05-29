package org.example.vaccine.service.serviceImp;

import lombok.RequiredArgsConstructor;
import org.example.vaccine.base.CommonResponseCode;
import org.example.vaccine.base.ResponseBase;
import org.example.vaccine.base.ResponseData;
import org.example.vaccine.base.ResponseHandle;

import org.example.vaccine.mapper.ObjectInjectionMapper;
import org.example.vaccine.mapper.ObjectMapper;
import org.example.vaccine.model.ObjectInjection;
import org.example.vaccine.model.Objects;
import org.example.vaccine.model.request.ObjectRequest;
import org.example.vaccine.service.ObjectService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ObjectServiceImp implements ObjectService {
    private final ObjectMapper objectMapper;
    private final ResponseHandle handle;
    private final ObjectInjectionMapper objectInjectionMapper;
    @Override
    public ResponseEntity<ResponseBase> insert(ObjectRequest objectRequest)  {
        Objects objects = objectMapper.selectByEmail(objectRequest.getEmail());
        if(objects != null)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ResponseBase("Email đã tồn tại"));
        int isExisting = objectMapper.insert(objectRequest);
        return ResponseEntity.ok(new ResponseBase());
    }

    @Override
    public ResponseEntity<ResponseBase> updateById(Objects objects) {
        if(objectMapper.updateById(objects) == 3)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ResponseBase("Email đã tồn tại"));
        if(objectMapper.updateById(objects) == 0)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ResponseBase("Không thấy tìm thấy đối tượng"));
        return ResponseEntity.ok().body(new ResponseBase("Cập nhật thành công"));
    }

    @Override
    @Transactional
    public ResponseEntity<ResponseBase> deleteById(String id) {
        try {
            objectInjectionMapper.deleteByObjectId(id);
            CommonResponseCode code = handle.response(objectMapper.deleteById(id));
            return ResponseEntity.status(code.getHttp()).body(new ResponseBase(code));
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ResponseBase("Không thể xóa đối tượng"));
        }


    }

    @Override
    public ResponseEntity<ResponseBase> selectAll() {
        List<Objects> objectsList = objectMapper.selectAll();
        return ResponseEntity.ok(new ResponseData<>(objectsList));
    }

    @Override
    public ResponseEntity<ResponseBase> selectByNameOrEmailOrGuardianName(String info) {
        List<Objects> objectsList = objectMapper.selectByNameOrEmailOrGuardianName(info);
        return ResponseEntity.ok(new ResponseData<>(objectsList));
    }

    @Override
    public ResponseEntity<ResponseBase> selectById(String id) {
        Objects objects = objectMapper.selectById(id);
        if (objects == null)
            return ResponseEntity.status(CommonResponseCode.NO_FOUND.getHttp()).body(new ResponseBase(CommonResponseCode.NO_FOUND));
        return ResponseEntity.ok(new ResponseData<>(objects));
    }

    @Override
    public ResponseEntity<ResponseBase> isExistObjectInjection(String objectId) {
            return ResponseEntity.status(HttpStatus.OK).body(new ResponseData(objectInjectionMapper.isExistObjectInjection(objectId)));
    }
}
