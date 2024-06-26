package org.example.vaccine.service.serviceImp;

import lombok.RequiredArgsConstructor;
import org.example.vaccine.base.CommonResponseCode;
import org.example.vaccine.base.ResponseBase;
import org.example.vaccine.base.ResponseData;
import org.example.vaccine.base.ResponseHandle;
import org.example.vaccine.exception.RoleConstraintException;
import org.example.vaccine.mapper.RoleMapper;
import org.example.vaccine.model.Role;
import org.example.vaccine.model.request.RoleRequest;
import org.example.vaccine.service.RoleService;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.sql.SQLIntegrityConstraintViolationException;
import java.util.List;


@Service
@RequiredArgsConstructor
public class RoleServiceImp implements RoleService {
    private final RoleMapper roleMapper;
    private final ResponseHandle handle;

    @Override
    public ResponseEntity<ResponseBase> insert(RoleRequest request) {
        try {
            CommonResponseCode code = handle.response(roleMapper.insertRole(request));
            return ResponseEntity.status(code.getHttp()).body(new ResponseBase(code));
        }catch (Exception e){
            return ResponseEntity.status(CommonResponseCode.EXISTING_ROLE_CODE.getHttp()).body(new ResponseBase(CommonResponseCode.EXISTING_ROLE_CODE));
        }

    }



    @Override
    public ResponseEntity<ResponseBase> deleteById(String id) {
        try {
            CommonResponseCode code = handle.response(roleMapper.deleteRole(id));
            return ResponseEntity.status(code.getHttp()).body(new ResponseBase(code));
        } catch (DataIntegrityViolationException e) {
            throw new RoleConstraintException("");
        }


    }

    @Override
    public ResponseEntity<ResponseBase> selectAll() {
        List<Role> roleList = roleMapper.selectAll();
        return ResponseEntity.ok().body(new ResponseData<>(roleList));
    }

    @Override
    public ResponseEntity<ResponseBase> selectById(String id) {
        Role role = roleMapper.selectById(id);
        if (role == null)
            return ResponseEntity.status(CommonResponseCode.NO_FOUND.getHttp()).body(new ResponseBase(CommonResponseCode.NO_FOUND));
        return ResponseEntity.ok().body(new ResponseData<>(role));
    }
}
