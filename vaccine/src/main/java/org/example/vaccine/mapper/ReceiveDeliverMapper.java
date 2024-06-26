package org.example.vaccine.mapper;

import org.apache.ibatis.annotations.*;
import org.example.vaccine.model.ReceiveDeliver;
import org.example.vaccine.model.ReceiveDeliverDetail;
import org.example.vaccine.model.request.ReceiveDeliverDetailRequest;
import org.example.vaccine.model.request.ReceiveDeliverRequest;
import org.example.vaccine.model.response.ReceiveDetailResponse;
import org.example.vaccine.model.response.ReceiveResponse;

import java.time.LocalDate;
import java.util.List;

@Mapper
public interface ReceiveDeliverMapper {
    @Insert("INSERT INTO receive_deliver (id,unit_receiving, unit_delivering_id, officer_receiving, officer_delivering, date_receiving, date_delivering, note) " +
            "VALUE(#{id},#{unitReceiving},#{unitDeliveringId},#{officerReceiving},#{officerDelivering},#{dateReceiving},#{dateDelivering},#{note})")
    int insert(ReceiveDeliver receiveDeliver);

    @Insert("INSERT INTO receive_deliver_detail (vaccine_id, receive_deliver_id, quantity_receiving, expired_date, lot_number) " +
            "VALUE (#{vaccineId},#{receiveDeliverId},#{quantityReceiving},#{expiredDate},#{lotNumber})")
    void insertDetail(String vaccineId, String receiveDeliverId, int quantityReceiving, LocalDate expiredDate, String lotNumber);
    @Insert("INSERT INTO receive_deliver_detail (vaccine_id, receive_deliver_id, quantity_receiving, expired_date, lot_number,quantity_delivering) " +
            "VALUE (#{vaccineId},#{receiveDeliverId},#{quantityReceiving},#{expiredDate},#{lotNumber},#{quantityDelivering})")
    void updateDetail(String vaccineId, String receiveDeliverId, int quantityReceiving, LocalDate expiredDate, String lotNumber,int quantityDelivering);

    @Select("SELECT id FROM receive_deliver WHERE date_receiving = #{dateReceiving}")
    String selectIdByDateReceiving(LocalDate dateReceiving);

    @Update("UPDATE receive_deliver SET unit_receiving = #{unitReceiving}, unit_delivering_id = #{unitDeliveringId}, officer_delivering = #{officerDelivering}, officer_receiving =#{officerReceiving}," +
            " date_receiving = #{dateReceiving}, date_delivering = #{dateDelivering}, note = #{note} WHERE id = #{id}")
    int updateById(ReceiveDeliver receiveDeliver);

    @Update("UPDATE  receive_deliver_detail SET lot_number = #{lotNumber}, expired_date = #{expiredDate}, quantity_delivering = #{quantityDelivering}" +
            ",quantity_receiving = #{quantityReceiving} WHERE vaccine_id = #{vaccineId} AND receive_deliver_id = #{receiveDeliverId}")
    int updateDetailById(ReceiveDeliverDetail receiveDeliverDetail);

    @Delete("DELETE FROM receive_deliver WHERE id = #{receiveDeliverId}")
    int deleteById(String receiveDeliverId);

    @Delete("DELETE FROM receive_deliver_detail WHERE receive_deliver_id = #{receiveDeliverId}")
    int deleteAllDetailByReceiveDeliverId(String receiveDeliverId);

    @Delete("DELETE FROM receive_deliver_detail WHERE vaccine_id = #{vaccineId} AND receive_deliver_id = #{receiveDeliverId}")
    int deleteDetailByReceiveDeliverIdAndVaccineID(String receiveDeliverId, String vaccineId);

    @Select("SELECT * FROM receive_deliver WHERE date_receiving >= #{fromDate} AND date_receiving <= #{toDate}")
    List<ReceiveResponse> selectDateReceivingFromDateToDate(LocalDate fromDate, LocalDate toDate);

    @Select("SELECT vaccine_id, name, quantity_receiving, unit,packing,lot_number,expired_date,quantity_delivering FROM receive_deliver_detail as re INNER JOIN vaccine as va on re.vaccine_id = va.id WHERE receive_deliver_id = #{receiveDeliverId}")
    List<ReceiveDetailResponse> selectDetailByReceiveDeliverId(String receiveDeliverId);

    @Select("SELECT count(*)  FROM  receive_deliver WHERE unit_delivering_id <> #{unitDeliveringId} AND date_delivering=#{dateDelivering}")
    int isExistUnitDeliveringIdAndDateDelivering(String unitDeliveringId, LocalDate dateDelivering);
    @Select("SELECT  count(*) FROM receive_deliver_detail WHERE lot_number =#{lotNumber} AND vaccine_id = #{vaccineId}")
    int isExistLotNumberVaccineId(String lotNumber,String vaccineId);

}
