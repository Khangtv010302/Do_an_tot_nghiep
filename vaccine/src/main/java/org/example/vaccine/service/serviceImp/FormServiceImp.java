package org.example.vaccine.service.serviceImp;

import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.example.vaccine.base.CommonResponseCode;
import org.example.vaccine.base.ResponseBase;
import org.example.vaccine.base.ResponseData;
import org.example.vaccine.base.ResponseHandle;
import org.example.vaccine.mapper.FormMapper;
import org.example.vaccine.model.Form;
import org.example.vaccine.service.FormService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FormServiceImp implements FormService {
    private final FormMapper formMapper;
    private final ResponseHandle handle;
    @Override
    public ResponseEntity<ResponseBase> insert(String name){
        CommonResponseCode code = handle.response(formMapper.insert(name));
        return ResponseEntity.status(code.getHttp()).body(new ResponseBase(code));
    }

    @Override
    public ResponseEntity<ResponseBase> deleteById(String id) {
        CommonResponseCode code = handle.response(formMapper.deleteById(id));
        return ResponseEntity.status(code.getHttp()).body(new ResponseBase(code));
    }

    @Override
    public ResponseEntity<ResponseBase> selectAll() {
        List<Form> formList = formMapper.selectAll();
        if (formList.isEmpty())
            return ResponseEntity.status(CommonResponseCode.NO_FOUND.getHttp()).body(new ResponseBase(CommonResponseCode.NO_FOUND));
        return ResponseEntity.ok().body(new ResponseData<>(formList));
    }

    @Override
    public ResponseEntity<ResponseBase> selectById(String id) {
        Form form = formMapper.selectById(id);
        if(form == null)
            return ResponseEntity.status(CommonResponseCode.NO_FOUND.getHttp()).body(new ResponseBase(CommonResponseCode.NO_FOUND));
        return ResponseEntity.ok(new ResponseData<>(form));
    }
}
