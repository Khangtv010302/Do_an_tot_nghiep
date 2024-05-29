package org.example.vaccine.controller;

import lombok.RequiredArgsConstructor;
import org.apache.ibatis.annotations.Delete;
import org.example.vaccine.base.ResponseBase;

import org.example.vaccine.exception.DeleteException;
import org.example.vaccine.exception.DuplicateScheduledDate;
import org.example.vaccine.exception.UpdateException;
import org.example.vaccine.model.Plan;
import org.example.vaccine.model.request.PlanRequest;
import org.example.vaccine.service.PlanService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@RestController
@RequestMapping("/API/Plan")
@RequiredArgsConstructor
public class PlanController {
    private final PlanService planService;
    @PostMapping("")
    ResponseEntity<ResponseBase> insert(@RequestBody PlanRequest request) throws DuplicateScheduledDate {
        return planService.insert(request);
    }
    @PutMapping("")
    ResponseEntity<ResponseBase> updateById(@RequestBody Plan plan) throws UpdateException, DuplicateScheduledDate {
        return planService.updateById(plan);
    }
    @DeleteMapping("")
    ResponseEntity<ResponseBase> deleteById(@RequestParam String id) throws DeleteException {
        return planService.deleteById(id);
    }
    @GetMapping("")
    ResponseEntity<ResponseBase> selectByFromDayToDay(@RequestParam LocalDate fromDay,@RequestParam LocalDate toDay){
        return planService.selectByFromDayToDay(fromDay,toDay);
    }
    @GetMapping("/Reminder")
    ResponseEntity<ResponseBase> reminder(@RequestParam LocalDate scheduledDate){
       planService.reminder(scheduledDate);
       return ResponseEntity.ok().body(new ResponseBase("Đã gửi email nhắc hẹn thành công"));
    }
}
