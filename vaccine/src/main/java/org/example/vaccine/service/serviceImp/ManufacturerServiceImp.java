package org.example.vaccine.service.serviceImp;

import lombok.RequiredArgsConstructor;
import org.example.vaccine.base.CommonResponseCode;
import org.example.vaccine.base.ResponseBase;
import org.example.vaccine.base.ResponseData;
import org.example.vaccine.base.ResponseHandle;
import org.example.vaccine.mapper.ManufacturerMapper;
import org.example.vaccine.model.Manufacturer;
import org.example.vaccine.model.request.ManufacturerRequest;
import org.example.vaccine.service.ManufacturerService;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.sql.SQLIntegrityConstraintViolationException;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ManufacturerServiceImp implements ManufacturerService {
    private final ManufacturerMapper manufacturerMapper;
    private final ResponseHandle handle;

    @Override
    public ResponseEntity<ResponseBase> insert(ManufacturerRequest request) {
            CommonResponseCode code = handle.response(manufacturerMapper.insertManufacturer(request));
            return ResponseEntity.status(code.getHttp()).body(new ResponseBase(code));

    }

    @Override
    public ResponseEntity<ResponseBase> updateById(Manufacturer manufacturer) {
        CommonResponseCode code = handle.response(manufacturerMapper.updateManufacturer(manufacturer));
        return ResponseEntity.status(code.getHttp()).body(new ResponseBase(code));
    }

    @Override
    public ResponseEntity<ResponseBase> deleteById(String id) {
        CommonResponseCode code = handle.response(manufacturerMapper.deleteManufacturer(id));
        return ResponseEntity.status(code.getHttp()).body(new ResponseBase(code));
    }

    @Override
    public ResponseEntity<ResponseBase> selectAll() {
        List<Manufacturer> manufacturerList = manufacturerMapper.selectAll();
        return ResponseEntity.ok().body(new ResponseData<>(manufacturerList));
    }
}
