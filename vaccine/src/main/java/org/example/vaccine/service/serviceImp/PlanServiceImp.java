package org.example.vaccine.service.serviceImp;

import freemarker.template.Configuration;
import freemarker.template.Template;
import freemarker.template.TemplateException;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.example.vaccine.base.ResponseBase;
import org.example.vaccine.base.ResponseData;

import org.example.vaccine.exception.DeleteException;
import org.example.vaccine.exception.DuplicateScheduledDate;
import org.example.vaccine.exception.UpdateException;
import org.example.vaccine.mapper.PlanMapper;
import org.example.vaccine.model.Plan;
import org.example.vaccine.model.request.PlanRequest;
import org.example.vaccine.model.response.ObjectMonthOldResponse;
import org.example.vaccine.model.response.PlanResponse;
import org.example.vaccine.model.response.ReminderResponse;
import org.example.vaccine.service.PlanService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.freemarker.FreeMarkerTemplateUtils;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.Future;

@Service
@RequiredArgsConstructor
@Slf4j
public class PlanServiceImp implements PlanService {
    private final PlanMapper planMapper;
    private final JavaMailSender mailSender;
    @Value("$(spring.mail.username)")
    private String fromMail;
    private final Configuration config;
    @Override
    @Transactional
    public ResponseEntity<ResponseBase> insert(PlanRequest request) throws DuplicateScheduledDate {
        try {
            planMapper.insertPlan(request);
        }catch (Exception e){
            throw new DuplicateScheduledDate();
        }

        String id = planMapper.getIdByScheduledDate(request.getScheduledDate());
        for (String vaccineId: request.getVaccineId()){
            planMapper.insertPlanDetail(vaccineId,id);
        }
        List<ObjectMonthOldResponse> responseList = planMapper.getListObjectMonthOld(request.getScheduledDate(),id);
        updateScheduledDate(responseList,request.getScheduledDate());
        return ResponseEntity.ok(new ResponseBase());
    }

    @Override
    @Transactional
    public ResponseEntity<ResponseBase> updateById(Plan plan) throws UpdateException {
        int code =planMapper.updateById(plan);
        if(code ==0)
            throw new UpdateException();
        planMapper.deletePlanDetailById(plan.getId());
        try {
            for (String vaccineId: plan.getVaccineId()){
                planMapper.insertPlanDetail(vaccineId,plan.getId());
            }
        }catch (Exception e){
            throw new UpdateException();
        }
        List<ObjectMonthOldResponse> responseList = planMapper.getListObjectMonthOld(plan.getScheduledDate(),plan.getId());
        updateScheduledDate(responseList,plan.getScheduledDate());
        return ResponseEntity.ok(new ResponseBase());
    }

    @Override
    @Transactional
    public ResponseEntity<ResponseBase> deleteById(String id) throws DeleteException {
        Plan plan = planMapper.selectById(id);
        if(plan == null)
            throw new DeleteException();
        int code =  planMapper.deletePlanDetailById(id)* planMapper.deleteById(id);
        planMapper.updateObjectInjectionDateWhenDeletePlan(plan.getScheduledDate());
        return ResponseEntity.ok().body(new ResponseBase());
    }

    @Override
    public ResponseEntity<ResponseBase> selectByFromDayToDay(LocalDate fromDay,LocalDate toDay) {
        List<PlanResponse> planResponses = planMapper.selectByFromDayToDay(fromDay,toDay);
        if(planResponses.isEmpty())
            return ResponseEntity.ok().body(new ResponseData<>(planResponses));
        for (PlanResponse planResponse: planResponses){
            planResponse.setVaccineId(planMapper.selectByPlanId(planResponse.getId()));
        }
        return ResponseEntity.ok().body(new ResponseData<>(planResponses));

    }

    @Override
    public ResponseEntity<ResponseBase> selectById(String id) {
        return null;
    }

    @Override
    @Async
    public void reminder(LocalDate scheduledDate) {
        List<ReminderResponse> reminderResponseList = planMapper.getListObjectInjectionByScheduledDate(scheduledDate);
        for(ReminderResponse reminderResponse:reminderResponseList){
            isSendMail(reminderResponse.getEmail(),reminderResponse.getObjectName(),
                    reminderResponse.getVaccineName(),scheduledDate);
        }
    }
    void updateScheduledDate (List<ObjectMonthOldResponse> list,LocalDate scheduledDate){
        Map<String, Integer> idToMinMonthOld = new HashMap<>();
        // Find the smallest monthOld for each id
        for (ObjectMonthOldResponse entry : list) {
            String id = entry.getObjectId();
            int monthOld = entry.getMonthOld();
            if (!idToMinMonthOld.containsKey(id) || monthOld < idToMinMonthOld.get(id)) {
                idToMinMonthOld.put(id, monthOld);
            }
        }
        // Filter the entries based on the smallest monthOld for each id
        List<ObjectMonthOldResponse> filteredEntries = new ArrayList<>();
        for (ObjectMonthOldResponse entry : list) {
            String id = entry.getObjectId();
            int monthOld = entry.getMonthOld();
            if (monthOld == idToMinMonthOld.get(id)) {
                filteredEntries.add(entry);
            }
        }

        // Print the filtered entries
        for (ObjectMonthOldResponse entry : filteredEntries) {
            planMapper.updateScheduledDateInVaccinationDate(scheduledDate,entry.getObjectId(),entry.getMonthOld());
        }
    }
    @Async
    protected Boolean isSendMail(String email, String name, String vaccineName, LocalDate scheduledDate){
        try {
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
            Thread.sleep(1000);
            Map<String,Object> model= new HashMap<>();
            model.put("name",name);
            model.put("vaccineName",vaccineName);
            model.put("scheduledDate",scheduledDate.format(formatter));
            MimeMessage message = mailSender.createMimeMessage();
            try {
                MimeMessageHelper helper = new MimeMessageHelper(message, MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED,
                        StandardCharsets.UTF_8.name());

                Template t = config.getTemplate("email-reminder.ftl");

                String html = FreeMarkerTemplateUtils.processTemplateIntoString(t,model);

                helper.setTo(email);
                helper.setFrom(fromMail);
                helper.setText(html,true);
                helper.setSubject("Nhắc hẹn cho trẻ đi tiêm chủng");

                mailSender.send(message);

                return true;
            } catch (MessagingException | TemplateException | IOException e){
                return false;
            }
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }


    }
}
