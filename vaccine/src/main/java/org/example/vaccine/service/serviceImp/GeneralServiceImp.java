package org.example.vaccine.service.serviceImp;

import lombok.RequiredArgsConstructor;
import org.example.vaccine.base.ResponseBase;
import org.example.vaccine.base.ResponseData;
import org.example.vaccine.mapper.GeneralMapper;
import org.example.vaccine.model.Role;
import org.example.vaccine.model.response.HistoryResponse;
import org.example.vaccine.model.response.VaccineOnlyNameResponse;
import org.example.vaccine.model.response.VaccineResponse;
import org.example.vaccine.service.GeneralService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
@Service
public class GeneralServiceImp implements GeneralService {
    GeneralMapper generalMapper;
    @Autowired
    public GeneralServiceImp(GeneralMapper generalMapper) {
        this.generalMapper = generalMapper;
    }

    @Override
    public ResponseEntity<ResponseBase> selectAllVaccine() {
        List<VaccineResponse> vaccineList = generalMapper.selectAllVaccine();
        return ResponseEntity.ok().body(new ResponseData<>(vaccineList));
    }

    @Override
    public ResponseEntity<ResponseBase> selectAllVaccineName() {
        List<VaccineOnlyNameResponse> vaccineList = generalMapper.selectAllVaccineName();
        return ResponseEntity.ok().body(new ResponseData<>(vaccineList));
    }

    @Override
    public ResponseEntity<ResponseBase> selectAllRole() {
        List<Role> roleList = generalMapper.selectAllRole();
        return ResponseEntity.ok().body(new ResponseData<>(roleList));
    }

    @Override
    public ResponseEntity<ResponseBase> selectObjectInjectionFromDateToDate(LocalDate fromDate, LocalDate toDate,Boolean reaction,Boolean state) {
        List<HistoryResponse> historyResponseList;
        if(reaction)
            historyResponseList = generalMapper.selectObjectInjectionFromDateToDateReactionTrue(fromDate,toDate,state);
        else  historyResponseList = generalMapper.selectObjectInjectionFromDateToDateReactionFalse(fromDate,toDate,state);
        return ResponseEntity.ok().body(new ResponseData<>(historyResponseList));
    }
}
