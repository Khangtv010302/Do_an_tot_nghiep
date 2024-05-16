package org.example.vaccine.controller;

import jakarta.validation.GroupSequence;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.apache.ibatis.annotations.Select;
import org.example.vaccine.base.ResponseBase;
import org.example.vaccine.exception.DeleteException;
import org.example.vaccine.exception.InsertException;
import org.example.vaccine.exception.UpdateException;
import org.example.vaccine.model.ReceiveDeliver;
import org.example.vaccine.model.request.ReceiveDeliverRequest;
import org.example.vaccine.service.ReceiveDeliverService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@RestController
@RequestMapping("/API/ReceiveDeliver")
@RequiredArgsConstructor
public class ReceiveDeliverController {
    private final ReceiveDeliverService receiveDeliverService;
    @PostMapping("")
    ResponseEntity<ResponseBase> insert(@RequestBody ReceiveDeliverRequest request){
        return receiveDeliverService.insert(request);
    }
    @PutMapping("")
    ResponseEntity<ResponseBase> updateById(@RequestBody ReceiveDeliver receiveDeliver) throws UpdateException {
        return receiveDeliverService.updateById(receiveDeliver);
    }
    @DeleteMapping("")
    ResponseEntity<ResponseBase> deleteByReceiverDeliverId(@RequestParam String receiverDeliverId) throws DeleteException {
        return receiveDeliverService.deleteByReceiveDeliverID(receiverDeliverId);
    }
    @DeleteMapping("Detail")
    ResponseEntity<ResponseBase> deleteByReceiverDeliverId(@RequestParam String receiverDeliverId,@RequestParam String vaccineId) throws DeleteException {
        return receiveDeliverService.deleteDetailByReceiveDeliverIDAndVaccineId(receiverDeliverId,vaccineId);
    }
    @GetMapping("/FromDate-ToDateByDateReceiving")
    ResponseEntity<ResponseBase> selectDateReceivingFromDateToDate(@RequestParam LocalDate fromDay,@RequestParam LocalDate toDay)  {
        return receiveDeliverService.selectDateReceivingFromDateToDate(fromDay,toDay);
    }
    @GetMapping("/DetailByReceiveDeliverId")
    ResponseEntity<ResponseBase> selectDetailByReceiveDeliverId(@RequestParam String receiveDeliverId)  {
        return receiveDeliverService.selectDetailByReceiveDeliverId(receiveDeliverId);
    }
}
