package org.example.vaccine.mapper;

import org.apache.ibatis.annotations.*;
import org.example.vaccine.model.Plan;
import org.example.vaccine.model.request.PlanRequest;
import org.example.vaccine.model.response.ObjectMonthOldResponse;
import org.example.vaccine.model.response.PlanDetailResponse;
import org.example.vaccine.model.response.PlanResponse;
import org.example.vaccine.model.response.ReminderResponse;

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
    @Select("SELECT * FROM plan WHERE scheduled_date >= #{fromDay} AND scheduled_date <= #{toDay} ")
    List<PlanResponse> selectByFromDayToDay(LocalDate fromDay,LocalDate toDay);
    @Select("SELECT * FROM plan WHERE id = #{id}")
    Plan selectById(String id);
    @Select("SELECT vaccine_id from plan_detail where plan_id = #{id}")
    List<String> selectByPlanId(String id);
    @Select("SELECT oi.month_old, oi.object_id FROM object_injection oi INNER JOIN object o ON oi.object_id = o.id " +
            " WHERE oi.month_old <= TIMESTAMPDIFF(MONTH, o.birth_date, #{scheduledDate}) AND oi.vaccine_id IN " +
            " (SELECT vaccine_id FROM plan_detail WHERE plan_detail.plan_id = #{planId}) AND oi.state = FALSE AND o.reminder = true")
    List<ObjectMonthOldResponse> getListObjectMonthOld(LocalDate scheduledDate,String planId);
    @Update("UPDATE object_injection SET vaccination_date = #{scheduledDate} WHERE object_id = #{objectId} AND month_old = #{monthOld}")
    void updateScheduledDateInVaccinationDate (LocalDate scheduledDate,String objectId,int monthOld);
    @Update("UPDATE object_injection SET vaccination_date = null WHERE state =false AND vaccination_date = #{scheduledDate}")
    void updateObjectInjectionDateWhenDeletePlan(LocalDate scheduledDate);
    @Select("SELECT ob.fullname AS objectName,ob.email, GROUP_CONCAT(va.name SEPARATOR ' và ') AS vaccineName FROM object_injection AS oi INNER JOIN" +
            "    object AS ob ON oi.object_id = ob.id INNER JOIN vaccine AS va ON va.id = oi.vaccine_id WHERE vaccination_date = #{scheduledDate} GROUP BY ob.fullname,ob.email")
    List<ReminderResponse> getListObjectInjectionByScheduledDate(LocalDate scheduledDate);

}

