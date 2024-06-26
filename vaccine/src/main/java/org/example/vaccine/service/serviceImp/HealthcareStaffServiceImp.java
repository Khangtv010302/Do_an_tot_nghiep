package org.example.vaccine.service.serviceImp;

import lombok.RequiredArgsConstructor;
import org.example.vaccine.base.CommonResponseCode;
import org.example.vaccine.base.ResponseBase;
import org.example.vaccine.base.ResponseData;
import org.example.vaccine.base.ResponseHandle;
import org.example.vaccine.mapper.HealthcareStaffMapper;
import org.example.vaccine.model.HealthcareStaff;
import org.example.vaccine.model.request.HealthcareStaffRequest;
import org.example.vaccine.model.request.HealthcareStaffUpdateRequest;
import org.example.vaccine.model.response.HealthcareStaffResponse;
import org.example.vaccine.service.HealthcareStaffService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class HealthcareStaffServiceImp implements HealthcareStaffService {
    private final HealthcareStaffMapper healthcareStaffMapper;
    private final ResponseHandle handle;
    @Override
    public ResponseEntity<ResponseBase> insert(HealthcareStaffRequest request) {
        int checkUsernameAndEmail = healthcareStaffMapper.checkUsernameAndEmail(request.getUsername(), request.getEmail());
        if (checkUsernameAndEmail == 0)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ResponseBase("Username đã tồn tại"));
        if (checkUsernameAndEmail == 1)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ResponseBase("Email đã tồn tại"));
        request.setPassword(bCryptPasswordEncoder(request.getPassword()));
        CommonResponseCode code = handle.response(healthcareStaffMapper.insert(request));
        return ResponseEntity.status(code.getHttp()).body(new ResponseBase(code));
    }

    @Override
    public ResponseEntity<ResponseBase> updateById(HealthcareStaffUpdateRequest request) {
        CommonResponseCode code = handle.response(healthcareStaffMapper.updateById(request));
        return ResponseEntity.status(code.getHttp()).body(new ResponseBase(code));
    }

    @Override
    public ResponseEntity<ResponseBase> deleteById(String id) {
        CommonResponseCode code = handle.response(healthcareStaffMapper.deleteById(id));
        return ResponseEntity.status(code.getHttp()).body(new ResponseBase(code));
    }

    @Override
    public ResponseEntity<ResponseBase> selectAll() {
        List<HealthcareStaffResponse> staffList = healthcareStaffMapper.selectAll();
        return ResponseEntity.ok(new ResponseData<>(staffList));
    }

    @Override
    public ResponseEntity<ResponseBase> selectByNameOrEmailOrUsername(String info) {
        List<HealthcareStaffResponse> staffList = healthcareStaffMapper.selectByNameOrEmailOrUsername(info);
        return ResponseEntity.ok(new ResponseData<>(staffList));
    }

    @Override
    public ResponseEntity<ResponseBase> selectById(String id) {
        HealthcareStaff staff= healthcareStaffMapper.selectById(id);
        if (staff == null)
            return ResponseEntity.status(CommonResponseCode.NO_FOUND.getHttp()).body(new ResponseBase(CommonResponseCode.NO_FOUND));
        return ResponseEntity.ok().body(new ResponseData<>(staff));
    }
    public String bCryptPasswordEncoder(String password){
        BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
        return bCryptPasswordEncoder.encode(password);
    }
}
