package org.example.vaccine.service.serviceImp;

import lombok.RequiredArgsConstructor;
import org.example.vaccine.base.CommonResponseCode;
import org.example.vaccine.base.ResponseBase;
import org.example.vaccine.base.ResponseData;
import org.example.vaccine.base.ResponseHandle;
import org.example.vaccine.mapper.GeneralInjectionMapper;
import org.example.vaccine.mapper.ObjectInjectionMapper;
import org.example.vaccine.model.ObjectInjection;
import org.example.vaccine.model.request.ObjectInjectionRequest;
import org.example.vaccine.model.request.ObjectInjectionUpdateRequest;
import org.example.vaccine.model.response.GeneralInjectionResponse;
import org.example.vaccine.model.response.LotNumberResponse;
import org.example.vaccine.model.response.ObjectInjectionDetailResponse;
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
            ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ResponseBase("No found general injection"));
        objectInjectionMapper.insertAll(objectId);
        return ResponseEntity.ok().body(new ResponseBase());
    }

    @Override
    public ResponseEntity<ResponseBase> insert(ObjectInjectionRequest request) {
        int isExistLotNumber = objectInjectionMapper.isExistLotNumberByVaccineId(request.getLotNumber(), request.getVaccineId());
        if (isExistLotNumber <= 0 && request.getLotNumber()!=null)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ResponseBase("Số lô vắc xin không đúng hoặc đã hết vắc xin của lô hàng này"));
        int isInsertSuccess = objectInjectionMapper.insert(request);
        if (isInsertSuccess == 0 )
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ResponseBase("Thêm vắc xin thất bại"));
        if ( request.getLotNumber()!=null && request.getState() ) {
            objectInjectionMapper.updateAddNumberReceiverDeliverByVaccineId(request.getLotNumber(), request.getVaccineId());
        }
        return ResponseEntity.ok().body(new ResponseBase("Đã thêm vắc xin vào danh sách"));
    }

    @Override
    public ResponseEntity<ResponseBase> updateById(ObjectInjectionUpdateRequest request) {
        Boolean state = objectInjectionMapper.getStateById(request.getId());
        if(state == request.getState()){
            int isUpdateSuccess = objectInjectionMapper.updateById(request);
            if (isUpdateSuccess == 0)
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ResponseBase("Cập nhật thất bại"));
            else  return ResponseEntity.ok().body(new ResponseBase("Cập nhật thành công"));
        }
        int isExistLotNumber ;
        if(request.getState())
            isExistLotNumber = objectInjectionMapper.isExistLotNumberByIdAdd(request.getLotNumber(), request.getId());
        else   isExistLotNumber = objectInjectionMapper.isExistLotNumberByIdMinus(request.getLotNumber(), request.getId());
        if (isExistLotNumber <= 0 && request.getLotNumber() != null)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ResponseBase("Số lô vắc xin không đúng hoặc đã hết vắc xin của lô hàng này"));
        int isUpdateSuccess = objectInjectionMapper.updateById(request);
        if (isUpdateSuccess == 0)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ResponseBase("Cập nhật thất bại"));
        if(request.getLotNumber() != null){
            if (request.getState())
                objectInjectionMapper.updateAddNumberReceiverDeliver(request.getLotNumber(), request.getId());
            else objectInjectionMapper.updateMinusNumberReceiverDeliver(request.getLotNumber(), request.getId());
        }
        return ResponseEntity.ok().body(new ResponseBase("Cập nhật thành công"));
    }

    @Override
    public ResponseEntity<ResponseBase> deleteByObjectIdAndId(String id) {
        ObjectInjection isExistObjectInjection = objectInjectionMapper.isExistObjectInjectionById(id);
        if (isExistObjectInjection == null)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ResponseBase("Không có vắc xin trong sổ tiêm"));
        if (isExistObjectInjection.getState())
            objectInjectionMapper.updateMinusNumberReceiverDeliver(isExistObjectInjection.getLotNumber(), isExistObjectInjection.getId());
        CommonResponseCode code = handle.response(objectInjectionMapper.deleteById(id));
        return ResponseEntity.status(code.getHttp()).body(new ResponseBase(code));
    }

    @Override
    public ResponseEntity<ResponseBase> selectByObjectIdAndId(String objectId, String id) {
        ObjectInjectionDetailResponse objectInjection = objectInjectionMapper.selectByObjectIdAndId(objectId, id);
        return ResponseEntity.ok().body(new ResponseData<>(objectInjection));
    }

    @Override
    public ResponseEntity<ResponseBase> selectByObjectID(String objectId) {
        List<ObjectInjectionDetailResponse> objectInjectionList = objectInjectionMapper.selectByObjectID(objectId);
        return ResponseEntity.ok().body(new ResponseData<>(objectInjectionList));
    }

    @Override
    public ResponseEntity<ResponseBase> selectByObjectIdAndName(String objectId, String name) {
        List<ObjectInjectionDetailResponse> objectInjectionList = objectInjectionMapper.selectByObjectIdAndName(objectId, name);
        return ResponseEntity.ok().body(new ResponseData<>(objectInjectionList));
    }

    @Override
    public ResponseEntity<ResponseBase> selectListLotNumberByVaccineId(String vaccineId) {
        List<LotNumberResponse> list = objectInjectionMapper.selectListLotNumberByVaccineId(vaccineId);
        return ResponseEntity.ok().body(new ResponseData<>(list));
    }
}
