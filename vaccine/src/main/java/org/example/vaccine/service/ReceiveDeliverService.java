package org.example.vaccine.service;

import org.example.vaccine.base.ResponseBase;
import org.example.vaccine.exception.DeleteException;
import org.example.vaccine.exception.InsertException;
import org.example.vaccine.exception.UpdateException;
import org.example.vaccine.model.ReceiveDeliver;
import org.example.vaccine.model.request.ReceiveDeliverRequest;
import org.springframework.http.ResponseEntity;

import java.time.LocalDate;

public interface ReceiveDeliverService {
    ResponseEntity<ResponseBase> insert(ReceiveDeliverRequest request);
    ResponseEntity<ResponseBase> updateById(ReceiveDeliver receiveDeliver) throws UpdateException;
    ResponseEntity<ResponseBase> deleteByReceiveDeliverID(String receiveDeliverID) throws DeleteException;
    ResponseEntity<ResponseBase> deleteDetailByReceiveDeliverIDAndVaccineId(String receiveDeliverID,String vaccineId);

    ResponseEntity<ResponseBase> selectDateReceivingFromDateToDate(LocalDate fromDate,LocalDate toDate);
    ResponseEntity<ResponseBase> selectDetailByReceiveDeliverId(String receiveDeliveringId);
}
