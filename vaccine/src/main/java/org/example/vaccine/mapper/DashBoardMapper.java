package org.example.vaccine.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

@Mapper
public interface DashBoardMapper {
    @Select("SELECT COUNT(*) FROM object WHERE reminder = true")
    int selectNumberObjectReminder();
    @Select("SELECT COUNT(*) FROM object_injection WHERE vaccine_id = #{vaccineId} AND state =true AND lot_number IS NOT NULL")
    int selectNumberVaccineByVaccineId(String vaccineId);
    @Select("SELECT  COUNT(*) FROM plan WHERE state=true")
    int selectNumberPlanComplete();
    @Select("SELECT  COUNT(*) FROM receive_deliver ")
    int selectNumberReceiveDeliver();
    @Select("SELECT COUNT(*) FROM vaccine")
    int selectNumberVaccine();
}
