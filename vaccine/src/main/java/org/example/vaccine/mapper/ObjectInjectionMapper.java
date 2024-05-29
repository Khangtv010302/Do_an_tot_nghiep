package org.example.vaccine.mapper;

import org.apache.ibatis.annotations.*;
import org.example.vaccine.model.ObjectInjection;
import org.example.vaccine.model.request.ObjectInjectionRequest;
import org.example.vaccine.model.request.ObjectInjectionUpdateRequest;
import org.example.vaccine.model.response.ObjectInjectionDetailResponse;
import org.example.vaccine.model.response.ObjectInjectionResponse;

import java.util.List;

@Mapper
public interface ObjectInjectionMapper {
    @Insert("INSERT INTO object_injection (object_id,vaccine_id,month_old) SELECT #{objectId}, general_injection.vaccine_id,general_injection.month_old FROM general_injection")
    void insertAll(String objectId);
    @Insert("INSERT INTO object_injection (object_id, vaccine_id, month_old, vaccination_date, vaccination_location,state,reaction,lot_number) VALUE " +
            "(#{objectId},#{vaccineId},#{monthOld},#{vaccinationDate},#{vaccinationLocation},#{state},#{reaction},#{lotNumber})")
    int insert(ObjectInjectionRequest request);
    @Update("UPDATE object_injection SET vaccination_date = #{vaccinationDate}, vaccination_location =#{vaccinationLocation}," +
            " quantity = #{quantity}, state =  #{state}, reaction =#{reaction}, lot_number = #{lotNumber}, month_old =#{monthOld    } WHERE id =#{id} ")
    int updateById(ObjectInjectionUpdateRequest request);
    @Delete("DELETE FROM object_injection WHERE id = #{id}")
    int deleteById(String id);
    @Select("SELECT  vaccine_id, ob.id, ob.object_id, va.name, quantity, state, vaccination_location, vaccination_date,va.antigen,ob.reaction,ob.lot_number,ob.month_old  FROM object_injection as ob INNER JOIN vaccine as va ON ob.vaccine_id = va.id WHERE object_id = #{objectId}")
    List<ObjectInjectionDetailResponse> selectByObjectID(String objectId);
    @Select("SELECT vaccine_id, ob.id, ob.object_id, va.name, quantity, state, vaccination_location, vaccination_date,va.antigen,ob.reaction,ob.lot_number,ob.month_old  FROM object_injection as ob INNER JOIN vaccine as va ON ob.vaccine_id = va.id WHERE object_id = #{objectId} AND ob.id = #{id}")
    ObjectInjectionDetailResponse selectByObjectIdAndId(String objectId, String id);
    @Select("SELECT vaccine_id, ob.id, ob.object_id, va.name, quantity, state, vaccination_location, vaccination_date,va.antigen,ob.reaction,ob.lot_number,ob.month_old  FROM object_injection as ob INNER JOIN vaccine as va ON ob.vaccine_id = va.id WHERE object_id = #{objectId} AND  va.name LIKE CONCAT('%',#{name},'%')")
    List<ObjectInjectionDetailResponse> selectByObjectIdAndName(String objectId, String name);
    @Delete("DELETE FROM object_injection WHERE object_id = #{objectId}")
    int deleteByObjectId(String objectId);
    @Select("SELECT count(*)  FROM  object_injection WHERE object_id = #{objectId} ")
    int isExistObjectInjection(String objectId);
    @Select("SELECT *  FROM  object_injection WHERE id = #{id} ")
    ObjectInjection isExistObjectInjectionById(String id);
    @Update("UPDATE receive_deliver_detail SET quantity_delivering = quantity_delivering +1 WHERE vaccine_id= (SELECT vaccine_id FROM object_injection WHERE id =#{id}) AND lot_number = #{lotNumber}")
    void updateAddNumberReceiverDeliver(String lotNumber,String id);
    @Update("UPDATE receive_deliver_detail SET quantity_delivering = quantity_delivering +1 WHERE vaccine_id= #{vaccineId} AND lot_number = #{lotNumber}")
    void updateAddNumberReceiverDeliverByVaccineId(String lotNumber,String vaccineId);
    @Update("UPDATE receive_deliver_detail SET quantity_delivering = quantity_delivering -1 WHERE vaccine_id= (SELECT vaccine_id FROM object_injection WHERE id =#{id}) AND lot_number = #{lotNumber}")
    void updateMinusNumberReceiverDeliver(String lotNumber,String id);
    @Select("SELECT  COUNT(*) FROM receive_deliver_detail WHERE vaccine_id= (SELECT vaccine_id FROM object_injection WHERE id =#{id}) AND lot_number = #{lotNumber}" +
            " AND quantity_delivering < quantity_receiving")
    int isExistLotNumberByIdAdd(String lotNumber,String id);
    @Select("SELECT state FROM object_injection WHERE id =#{id}")
    Boolean getStateById(String id);
    @Select("SELECT  COUNT(*) FROM receive_deliver_detail WHERE vaccine_id= (SELECT vaccine_id FROM object_injection WHERE id =#{id}) AND lot_number = #{lotNumber}" +
            " AND quantity_delivering >= quantity_receiving")
    int isExistLotNumberByIdMinus(String lotNumber,String id);
    @Select("SELECT  COUNT(*) FROM receive_deliver_detail WHERE vaccine_id= #{vaccineId} AND lot_number = #{lotNumber}" +
            " AND quantity_delivering < quantity_receiving")
    int isExistLotNumberByVaccineId(String lotNumber,String vaccineId);

}
