package org.example.vaccine.service.serviceImp;

import lombok.RequiredArgsConstructor;
import org.example.vaccine.base.CommonResponseCode;
import org.example.vaccine.base.ResponseBase;
import org.example.vaccine.base.ResponseData;

import org.example.vaccine.exception.DeleteException;
import org.example.vaccine.exception.UpdateException;
import org.example.vaccine.mapper.PlanMapper;
import org.example.vaccine.model.Plan;
import org.example.vaccine.model.request.PlanRequest;
import org.example.vaccine.model.response.PlanResponse;
import org.example.vaccine.service.PlanService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PlanServiceImp implements PlanService {
    private final PlanMapper planMapper;
    @Override
    @Transactional
    public ResponseEntity<ResponseBase> insert(PlanRequest request) {
        planMapper.insertPlan(request);
        String id = planMapper.getIdByScheduledDate(request.getScheduledDate());
        for (String vaccineId: request.getVaccineId()){
            planMapper.insertPlanDetail(vaccineId,id);
        }
        return ResponseEntity.ok(new ResponseBase());
    }

    @Override
    @Transactional
    public ResponseEntity<ResponseBase> updateById(Plan plan) throws UpdateException {
        int code =planMapper.updateById(plan);
        if(code ==0)
            throw new UpdateException();
        planMapper.deletePlanDetailById(plan.getId());
        try {
            for (String vaccineId: plan.getVaccineId()){
                planMapper.insertPlanDetail(vaccineId,plan.getId());
            }
        }catch (Exception e){
            throw new UpdateException();
        }
        return ResponseEntity.ok(new ResponseBase());
    }

    @Override
    @Transactional
    public ResponseEntity<ResponseBase> deleteById(String id) throws DeleteException {
        int code =  planMapper.deletePlanDetailById(id)* planMapper.deleteById(id);
        if(code == 0)
            throw new DeleteException();
        return ResponseEntity.ok().body(new ResponseBase());
    }

    @Override
    public ResponseEntity<ResponseBase> selectAll() {
        List<PlanResponse> planResponses = planMapper.selectAll();
        if(planResponses.isEmpty())
            return ResponseEntity.status(CommonResponseCode.NO_FOUND.getHttp()).body(new ResponseBase(CommonResponseCode.NO_FOUND));
        for (PlanResponse planResponse: planResponses){
            planResponse.setDetailResponses(planMapper.selectByPlanId(planResponse.getId()));
        }
        return ResponseEntity.ok().body(new ResponseData<>(planResponses));

    }

    @Override
    public ResponseEntity<ResponseBase>  selectByFromDateToDate(LocalDate fromDate,LocalDate toDate) {
        return null;
    }

    @Override
    public ResponseEntity<ResponseBase> selectById(String id) {
        return null;
    }
}
