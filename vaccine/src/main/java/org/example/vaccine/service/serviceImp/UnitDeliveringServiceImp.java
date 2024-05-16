package org.example.vaccine.service.serviceImp;

import lombok.RequiredArgsConstructor;
import org.example.vaccine.base.CommonResponseCode;
import org.example.vaccine.base.ResponseBase;
import org.example.vaccine.base.ResponseData;
import org.example.vaccine.base.ResponseHandle;
import org.example.vaccine.exception.RoleConstraintException;
import org.example.vaccine.mapper.ManufacturerMapper;
import org.example.vaccine.mapper.UnitDeliveringMapper;
import org.example.vaccine.model.Manufacturer;
import org.example.vaccine.model.UnitDelivering;
import org.example.vaccine.model.request.ManufacturerRequest;
import org.example.vaccine.model.request.UnitDeliveringRequest;
import org.example.vaccine.service.ManufacturerService;
import org.example.vaccine.service.UnitDeliveringService;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UnitDeliveringServiceImp implements UnitDeliveringService {
    private final UnitDeliveringMapper unitDeliveringMapper;
    private final ResponseHandle handle;

    @Override
    public ResponseEntity<ResponseBase> insert(UnitDeliveringRequest request) {
        if(unitDeliveringMapper.isExistName(request.getName()) >0)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ResponseBase("Tên đơn vị xuất đã tồn tại"));
        CommonResponseCode code = handle.response(unitDeliveringMapper.insertManufacturer(request));
        return ResponseEntity.status(code.getHttp()).body(new ResponseBase(code));

    }

    @Override
    public ResponseEntity<ResponseBase> updateById(UnitDelivering manufacturer) {
        CommonResponseCode code = handle.response(unitDeliveringMapper.updateManufacturer(manufacturer));
        return ResponseEntity.status(code.getHttp()).body(new ResponseBase(code));
    }

    @Override
    public ResponseEntity<ResponseBase> deleteById(String id) {
        try {
            CommonResponseCode code = handle.response(unitDeliveringMapper.deleteManufacturer(id));
            return ResponseEntity.status(code.getHttp()).body(new ResponseBase(code));
        } catch (DataIntegrityViolationException e) {
            throw new RoleConstraintException("");
        }
    }

    @Override
    public ResponseEntity<ResponseBase> selectByName(String name) {
        List<Manufacturer> manufacturerList = unitDeliveringMapper.selectByName(name);
        return ResponseEntity.ok().body(new ResponseData<>(manufacturerList));
    }
}
