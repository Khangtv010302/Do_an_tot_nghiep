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
    @Insert("INSERT INTO object_injection (object_id, vaccine_id, month_old, vaccination_date, vaccination_location, quantity,state,reaction,lot_number) VALUE " +
            "(#{objectId},#{vaccineId},#{monthOld},#{vaccinationDate},#{vaccinationLocation},#{quantity},#{state},#{reaction},#{lotNumber})")
    int insert(ObjectInjectionRequest request);
    @Update("UPDATE object_injection SET vaccination_date = #{vaccinationDate}, vaccination_location =#{vaccinationLocation}," +
            " quantity = #{quantity}, state =  #{state}, reaction =#{reaction}, lot_number = #{lotNumber} WHERE id =#{id} AND object_id =#{objectId}")
    int updateById(ObjectInjectionUpdateRequest request);
    @Delete("DELETE FROM object_injection WHERE id = #{id} AND object_id = #{objectId}")
    int deleteById(String objectId,String id);
    @Select("SELECT ob.id, ob.object_id, va.name, quantity, state, vaccination_location, vaccination_date  FROM object_injection as ob INNER JOIN vaccine as va ON ob.vaccine_id = va.id WHERE object_id = #{objectId}")
    List<ObjectInjectionResponse> selectByObjectID(String objectId);
    @Select("SELECT  ob.id, ob.object_id, va.name, quantity, state, vaccination_location, vaccination_date,va.antigen,ob.reaction,ob.lot_number,ob.month_old  FROM object_injection as ob INNER JOIN vaccine as va ON ob.vaccine_id = va.id WHERE object_id = #{objectId} AND ob.id = #{id}")
    ObjectInjectionDetailResponse selectByObjectIdAndId(String objectId, String id);
}
