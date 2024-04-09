package org.example.vaccine.mapper;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.example.vaccine.model.Form;

import java.util.List;

@Mapper
public interface FormMapper {
    @Insert("INSERT INTO form (name) value (#{name})")
    int insert(String name);
    @Delete("DELETE FROM  form WHERE id =#{id}")
    int deleteById(String id);
    @Select("SELECT * FROM form")
    List<Form> selectAll();
    @Select("SELECT * FROM form WHERE id = #{id}")
    Form selectById(String id);
}
