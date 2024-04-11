package org.example.vaccine.mapper;

import org.apache.ibatis.annotations.*;
import org.example.vaccine.model.Plan;
import org.example.vaccine.model.request.PlanRequest;
import org.example.vaccine.model.response.PlanDetailResponse;
import org.example.vaccine.model.response.PlanResponse;

import java.time.LocalDate;
import java.util.List;

@Mapper
public interface PlanMapper {
    @Insert("INSERT INTO plan (form, scheduled_date, number_date, location, number_object, state) value (#{form},#{scheduledDate},#{numberDate},#{location},#{numberObject},#{state})")
    void insertPlan(PlanRequest request);
    @Update("UPDATE plan SET form = #{form}, scheduled_date = #{scheduledDate}, number_date= #{numberDate},number_object=#{numberObject},state=#{state}, location =#{location} WHERE id = #{id}")
    int updateById(Plan plan);
    @Delete("DELETE FROM plan_detail WHERE plan_id =#{planId}")
    int deletePlanDetailById (String planId);
    @Delete("DELETE FROM plan where id=#{id}")
    int deleteById(String id);

    @Insert("INSERT INTO plan_detail (vaccine_id, plan_id) VALUE (#{vaccineId},#{planId})")
    void insertPlanDetail(String vaccineId, String planId);
    @Select("SELECT id FROM plan WHERE scheduled_date = #{scheduledDate}")
    String getIdByScheduledDate(LocalDate scheduledDate);
    @Select("SELECT * FROM plan")
    List<PlanResponse> selectAll();
    @Select("SELECT * FROM plan WHERE id = #{id}")
    Plan selectById(String id);
    @Select("SELECT * FROM plan_detail INNER JOIN vaccine on plan_detail.vaccine_id = vaccine.id WHERE plan_id =#{planId}")
    List<PlanDetailResponse> selectByPlanId(String id);

}
