package org.example.vaccine.mapper;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface ObjectInjectionMapper {
    @Insert("INSERT INTO object_injection (object_id,vaccine_id,month_old) SELECT #{objectId}, general_injection.vaccine_id,general_injection.month_old FROM general_injection")
    int insert(String objectId);
}
