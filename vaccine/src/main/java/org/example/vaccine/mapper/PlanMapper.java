package org.example.vaccine.mapper;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.example.vaccine.model.request.PlanRequest;

@Mapper
public interface PlanMapper {
    @Insert("INSERT INTO plan (form_id, scheduled_date, number_date, location, number_object, state) value (#{formId},#{scheduledId},#{numberDate},#{location},#{numberObject},#{state})")
    int insert(PlanRequest request);

}
