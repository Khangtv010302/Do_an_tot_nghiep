package org.example.vaccine.service.serviceImp;

import lombok.RequiredArgsConstructor;
import org.example.vaccine.base.CommonResponseCode;
import org.example.vaccine.base.ResponseBase;
import org.example.vaccine.base.ResponseData;
import org.example.vaccine.base.ResponseHandle;
import org.example.vaccine.exception.DeleteException;
import org.example.vaccine.exception.InsertException;
import org.example.vaccine.exception.UpdateException;
import org.example.vaccine.mapper.ReceiveDeliverMapper;
import org.example.vaccine.model.ReceiveDeliver;
import org.example.vaccine.model.ReceiveDeliverDetail;
import org.example.vaccine.model.request.ReceiveDeliverDetailRequest;
import org.example.vaccine.model.request.ReceiveDeliverRequest;
import org.example.vaccine.model.request.ReceiveDeliverUpdateRequest;
import org.example.vaccine.model.response.ReceiveDetailResponse;
import org.example.vaccine.model.response.ReceiveResponse;
import org.example.vaccine.service.ReceiveDeliverService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ReceiveDeliverServiceImp implements ReceiveDeliverService {
    private final ReceiveDeliverMapper receiveDeliverMapper;
    private final ResponseHandle handle;

    @Override
    public ResponseEntity<ResponseBase> insert(ReceiveDeliverRequest request) {
        try {
            receiveDeliverMapper.insert(request);
            String receiveDeliverId = receiveDeliverMapper.selectIdByDateReceiving(request.getDateReceiving());
            for (ReceiveDeliverDetailRequest deliverDetailRequest : request.getDeliverDetailRequests()) {
                receiveDeliverMapper.insertDetail(deliverDetailRequest.getVaccineId(), receiveDeliverId, deliverDetailRequest.getQuantityReceiving(), deliverDetailRequest.getExpiredDate(), deliverDetailRequest.getLotNumber());
            }
            return ResponseEntity.ok(new ResponseBase());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ResponseBase(0, "Insert failed"));
        }

    }

    @Override
    @Transactional
    public ResponseEntity<ResponseBase> updateById(ReceiveDeliver receiveDeliver) throws UpdateException {
        int code;
        code = receiveDeliverMapper.updateById(receiveDeliver);
        if (code == 0)
            throw new UpdateException();
        for (ReceiveDeliverUpdateRequest deliverUpdateRequest : receiveDeliver.getReceiveDeliverUpdateRequests()) {
            ReceiveDeliverDetail receiveDeliverDetail = new ReceiveDeliverDetail(deliverUpdateRequest, receiveDeliver.getId());
            code = receiveDeliverMapper.updateDetailById(receiveDeliverDetail);
            if (code == 0)
                throw new UpdateException();
        }
        return ResponseEntity.ok().body(new ResponseBase());
    }

    @Override
    @Transactional
    public ResponseEntity<ResponseBase> deleteByReceiveDeliverID(String receiveDeliverID) throws DeleteException {
        int code;
        code = receiveDeliverMapper.deleteAllDetailByReceiveDeliverId(receiveDeliverID) * receiveDeliverMapper.deleteById(receiveDeliverID);
        if (code == 0)
            throw new DeleteException();
        return ResponseEntity.ok().body(new ResponseBase());
    }

    @Override
    public ResponseEntity<ResponseBase> deleteDetailByReceiveDeliverIDAndVaccineId(String receiveDeliverID, String vaccineId) {
        int code;
        code = receiveDeliverMapper.deleteDetailByReceiveDeliverIdAndVaccineID(receiveDeliverID, vaccineId);
        if (code == 0)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ResponseBase(0, "Delete failed"));
        return ResponseEntity.ok().body(new ResponseBase());
    }

    @Override
    public ResponseEntity<ResponseBase> selectAll() {
        List<ReceiveResponse> receiveResponseList = receiveDeliverMapper.selectALl();
        if (receiveResponseList.isEmpty())
            return ResponseEntity.status(CommonResponseCode.NO_FOUND.getHttp()).body(new ResponseBase(CommonResponseCode.NO_FOUND));
        return ResponseEntity.ok(new ResponseData<>(receiveResponseList));
    }

    @Override
    public ResponseEntity<ResponseBase> selectDateReceivingFromDateToDate(LocalDate fromDate, LocalDate toDate) {
        List<ReceiveResponse> receiveResponseList = receiveDeliverMapper.selectDateReceivingFromDateToDate(fromDate,toDate);
        if (receiveResponseList.isEmpty())
            return ResponseEntity.status(CommonResponseCode.NO_FOUND.getHttp()).body(new ResponseBase(CommonResponseCode.NO_FOUND));
        return ResponseEntity.ok(new ResponseData<>(receiveResponseList));
    }

    @Override
    public ResponseEntity<ResponseBase> selectDetailByReceiveDeliverId(String receiveDeliveringId) {
        List<ReceiveDetailResponse> receiveDetailResponseList = receiveDeliverMapper.selectDetailByReceiveDeliverId(receiveDeliveringId);
        if (receiveDetailResponseList.isEmpty())
            return ResponseEntity.status(CommonResponseCode.NO_FOUND.getHttp()).body(new ResponseBase(CommonResponseCode.NO_FOUND));
        return ResponseEntity.ok(new ResponseData<>(receiveDetailResponseList));
    }


}
