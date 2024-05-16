package org.example.vaccine.service.serviceImp;

import org.example.vaccine.base.ResponseBase;
import org.example.vaccine.base.ResponseData;
import org.example.vaccine.mapper.DashBoardMapper;
import org.example.vaccine.service.DashBoardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class DashBoardServiceImp implements DashBoardService {

    final DashBoardMapper dashBoardMapper;

    public DashBoardServiceImp(DashBoardMapper dashBoardMapper) {
        this.dashBoardMapper = dashBoardMapper;
    }

    @Override
    public ResponseEntity<ResponseBase> selectNumberObjectReminder() {
        return ResponseEntity.ok().body(new ResponseData<>(dashBoardMapper.selectNumberObjectReminder()));
    }

    @Override
    public ResponseEntity<ResponseBase> selectNumberVaccineByVaccineId(String vaccineId) {
        return ResponseEntity.ok().body(new ResponseData<>(dashBoardMapper.selectNumberVaccineByVaccineId(vaccineId)));
    }

    @Override
    public ResponseEntity<ResponseBase> selectNumberPlanComplete() {
        return ResponseEntity.ok().body(new ResponseData<>(dashBoardMapper.selectNumberPlanComplete()));
    }

    @Override
    public ResponseEntity<ResponseBase> selectNumberReceiveDeliver() {
        return ResponseEntity.ok().body(new ResponseData<>(dashBoardMapper.selectNumberReceiveDeliver()));
    }

    @Override
    public ResponseEntity<ResponseBase> selectNumberVaccine() {
        return ResponseEntity.ok().body(new ResponseData<>(dashBoardMapper.selectNumberVaccine()));
    }
}
