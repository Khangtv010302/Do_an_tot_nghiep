package org.example.vaccine.service;

import org.apache.ibatis.annotations.Select;
import org.example.vaccine.model.Vaccine;

interface ListGeneralService {
     selectByName(String name);
}
