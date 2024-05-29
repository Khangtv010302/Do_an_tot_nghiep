package org.example.vaccine.mapper;

import org.apache.ibatis.annotations.*;
import org.example.vaccine.model.GeneralInjection;
import org.example.vaccine.model.request.GeneralInjectionRequest;
import org.example.vaccine.model.response.GeneralInjectionResponse;

import java.util.List;

@Mapper
public interface GeneralInjectionMapper {
    @Insert("INSERT INTO general_injection (vaccine_id, month_old) VALUE (#{vaccineId},#{monthOld})")
    int insert (GeneralInjectionRequest request);
    @Update("UPDATE general_injection SET month_old = #{monthOld} WHERE id =#{id}")
    int updateById(String id, String monthOld);
    @Delete("DELETE FROM general_injection WHERE vaccine_id=#{vaccineId} AND month_old = #{monthOld}")
    int deletebyVaccineIdAndMonthOld (String vaccineId,int monthOld);
    @Delete("DELETE FROM general_injection WHERE vaccine_id=#{vaccineId} ")
    int deletebyVaccineId (String vaccineId);
    @Select("SELECT vaccine_id,month_old, general_injection.id, vaccine.name, vaccine.antigen,vaccine.image  FROM general_injection INNER JOIN vaccine on general_injection.vaccine_id = vaccine.id")
    List<GeneralInjectionResponse> selectAll();
}
