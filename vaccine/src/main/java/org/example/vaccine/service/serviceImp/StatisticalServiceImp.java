package org.example.vaccine.service.serviceImp;

import org.apache.poi.ss.usermodel.*;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.example.vaccine.base.ResponseBase;
import org.example.vaccine.base.ResponseData;
import org.example.vaccine.mapper.StatisticalMapper;
import org.example.vaccine.model.request.VaccineStatisticalRequest;
import org.example.vaccine.model.response.VaccineStatisticalResponse;
import org.example.vaccine.service.StatisticalService;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
public class StatisticalServiceImp implements StatisticalService {
    final StatisticalMapper statisticalMapper;

    public StatisticalServiceImp(StatisticalMapper statisticalMapper) {
        this.statisticalMapper = statisticalMapper;
    }

    @Override
    public ResponseEntity<ResponseBase> numberObjectInjected(LocalDate fromDate, LocalDate toDate) {
        return ResponseEntity.ok().body(new ResponseData<>(statisticalMapper.numberObjectInjected(fromDate,toDate)));
    }

    @Override
    public ResponseEntity<ResponseBase> numberOldVaccine(LocalDate fromDate, LocalDate toDate) {
        List<String> listIdReceiving=statisticalMapper.getIdReceiverFromDateToDate(fromDate,toDate);
        int number=0;
        for (String id : listIdReceiving){
            number += statisticalMapper.numberOldVaccine(id);
        }
        return ResponseEntity.ok().body(new ResponseData<>(number));
    }

    @Override
    public ResponseEntity<ResponseBase> numberNewVaccine(LocalDate fromDate, LocalDate toDate) {
       return ResponseEntity.ok().body(new ResponseData<>(statisticalMapper.numberNewVaccine(fromDate,toDate)));
    }

    @Override
    public ResponseEntity<ResponseBase> numberVaccineInjected(LocalDate fromDate, LocalDate toDate) {
        return ResponseEntity.ok().body(new ResponseData<>(statisticalMapper.numberVaccineInjected(fromDate,toDate)));
    }

    @Override
    public ResponseEntity<ResponseBase> numberObjectReaction(LocalDate fromDate, LocalDate toDate) {
        return ResponseEntity.ok().body(new ResponseData<>(statisticalMapper.numberObjectReaction(fromDate,toDate)));
    }

    @Override
    public ResponseEntity<ResponseBase> getAllNumberByVaccineId(LocalDate fromDate, LocalDate toDate, String vaccineId) {
        VaccineStatisticalResponse response = new VaccineStatisticalResponse();
        response.setObjectNumber(statisticalMapper.numberObjectInjectedByVaccineId(fromDate,toDate,vaccineId));
        List<String> listIdReceiving=statisticalMapper.getIdReceiverFromDateToDate(fromDate,toDate);
        int oldNumber=0;
        for (String id : listIdReceiving){
            oldNumber += statisticalMapper.numberOldVaccineByVaccineId(id,vaccineId);
        }
        response.setOldNumber(oldNumber);
        response.setNewNumber(statisticalMapper.numberNewVaccineByVaccineId(fromDate,toDate,vaccineId));
        response.setUseNumber(statisticalMapper.numberVaccineInjectedByVaccineId(fromDate,toDate,vaccineId));
        response.setReactionNumber(statisticalMapper.numberObjectReactionByVaccineId(fromDate,toDate,vaccineId));
        return ResponseEntity.ok().body(new ResponseData<>(response));
    }

    @Override
    public ResponseEntity<byte[]> createExcel(List<VaccineStatisticalRequest> requestList) throws IOException {
        XSSFWorkbook workbook = new XSSFWorkbook();
        Sheet sheet = workbook.createSheet("Báo cáo");



        CellStyle YTE = workbook.createCellStyle();
        CellStyle BAO = workbook.createCellStyle();
        CellStyle KH = workbook.createCellStyle();
        CellStyle defaultStyle = workbook.createCellStyle();
        CellStyle defaultStyle1 = workbook.createCellStyle();
        CellStyle borderCell = workbook.createCellStyle();

        BAO.setAlignment(HorizontalAlignment.CENTER); // Căn giữa văn bản
        defaultStyle1.setAlignment(HorizontalAlignment.CENTER);
        borderCell.setAlignment(HorizontalAlignment.CENTER);

        BorderStyle borderStyle = BorderStyle.THIN;
        Font font = workbook.createFont();

        font.setFontName("Times New Roman"); // Tên font chữ
        font.setBold(true); // Đặt ch
        font.setFontHeightInPoints((short) 14); // Cỡ chữ

        Font defaultFont = workbook.createFont();
        defaultFont.setFontName("Times New Roman");
        defaultFont.setFontHeightInPoints((short) 12); // Cỡ chữ

        YTE.setFont(font);
        KH.setFont(defaultFont);
        BAO.setFont(font);
        defaultStyle.setFont(defaultFont);
        defaultStyle1.setFont(defaultFont);
        borderCell.setFont(defaultFont);

        // Tạo dòng và ô trong Sheet
        String[] data = {
                "BÁO CÁO TÌNH HÌNH SỬ DỤNG VẮC XIN VÀ DỤNG CỤ TIÊM CHỦNG",
                "Xã gửi lên huyện trước ngày 5 tháng sau",
                "Huyện gửi lên tỉnh trước ngày 10 tháng sau",
                "Tỉnh gửi TCMRQG và khu vực trước ngày 1      Mẫu 01/11 TCMR"
        };

        String[] values = {
                "Số:",
                "BỘ Y TẾ",
                "CHƯƠNG TRÌNH TCMR",
                "Tỉnh, thành phố: Khánh Hòa",
                "Huyện, quận, thị: Nha Trang",
                "Xã, phường: Vĩnh thọ"
        };
        for (int i = 0; i < values.length; i++) {
            Row row = sheet.createRow(i); // Tạo hàng cho mỗi giá trị
            // Tạo ô đầu tiên và đồng thời gộp ba cột lại

            Cell cell = row.createCell(0);
            cell.setCellValue(values[i]);
            cell.setCellStyle(defaultStyle);
            if (values[i].equals(values[1])){
                cell.setCellStyle(YTE);
            }
            if (values[i].equals(values[3])){
                cell.setCellStyle(KH);
            }
            if (i != 0 && data.length >= i) { // Kiểm tra xem index i có hợp lệ trong mảng data không
                Cell cell1 = row.createCell(2);
                cell1.setCellValue(data[i-1]);
                cell1.setCellStyle(defaultStyle1);
                if (data[i-1].equals(data[0])){
                    cell1.setCellStyle(BAO);
                }
            }
            sheet.addMergedRegion(new CellRangeAddress(i, i, 0, 1));
            sheet.addMergedRegion(new CellRangeAddress(i, i, 2, 7));
        }
        for (int i = values.length +1; i < requestList.size() + values.length +2; i++) {
            borderCell.setBorderTop(borderStyle);
            borderCell.setBorderBottom(borderStyle);
            borderCell.setBorderLeft(borderStyle);
            borderCell.setBorderRight(borderStyle);
            Row row = sheet.createRow(i); // Tạo hàng cho mỗi giá trị
            if(i == values.length +1){
                Cell cell = row.createCell(0);
                cell.setCellValue("Loại vật tư vắc xin");
                Cell cell1 = row.createCell(1);
                cell1.setCellValue("Số đối tượng được tiêm");
                Cell cell2 = row.createCell(2);
                cell2.setCellValue("SL tồn cũ");
                Cell cell3 = row.createCell(3);
                cell3.setCellValue("SL tồn mới nhận");
                Cell cell4 = row.createCell(4);
                cell4.setCellValue("SL sử dụng");
                Cell cell5 = row.createCell(5);
                cell5.setCellValue("Số đối tượng có phản ứng");
                Cell cell6 = row.createCell(6);
                cell6.setCellValue("Vắc xin dự trù");
                cell.setCellStyle(borderCell);
                cell1.setCellStyle(borderCell);
                cell2.setCellStyle(borderCell);
                cell3.setCellStyle(borderCell);
                cell4.setCellStyle(borderCell);
                cell5.setCellStyle(borderCell);
                cell6.setCellStyle(borderCell);

            }else {
                Cell cell6 = row.createCell(0);
                System.out.println("Đây là i: "+i);
                System.out.println(values.length-2);
                cell6.setCellValue(requestList.get(i- values.length -2).getName());
                Cell cell7 = row.createCell(1);
                cell7.setCellValue(requestList.get(i- values.length-2).getObjectNumber());
                Cell cell8 = row.createCell(2);
                cell8.setCellValue(requestList.get(i - values.length-2).getOldNumber());
                Cell cell9 = row.createCell(3);
                cell9.setCellValue(requestList.get(i- values.length-2).getNewNumber());
                Cell cell10 = row.createCell(4);
                cell10.setCellValue(requestList.get(i- values.length-2).getUseNumber());
                Cell cell11 = row.createCell(5);
                cell11.setCellValue(requestList.get(i- values.length-2).getReactionNumber());
                Cell cell12 = row.createCell(6);
                cell12.setCellValue(0);
                cell6.setCellStyle(borderCell);
                cell7.setCellStyle(borderCell);
                cell8.setCellStyle(borderCell);
                cell9.setCellStyle(borderCell);
                cell10.setCellStyle(borderCell);
                cell11.setCellStyle(borderCell);
                cell12.setCellStyle(borderCell);
            }

        }
        LocalDate today = LocalDate.now();

        // Định dạng ngày theo "Ngày dd tháng MM năm yyyy"
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("'Ngày' dd 'tháng' MM 'năm' yyyy");
        Font defaultFont2 = workbook.createFont();
        defaultFont.setFontName("Times New Roman");
        defaultFont.setFontHeightInPoints((short) 12); // Cỡ chữ
        defaultFont2.setItalic(true);

        Row row = sheet.createRow(requestList.size() + values.length +2); // Tạo hàng cho mỗi giá trị
        Cell cell = row.createCell(0);
        cell.setCellValue("Chỉ báo cáo các loại vắc xin có trong chương trình TCMR");
        Cell cell1 = row.createCell(4);
        cell1.setCellValue(today.format(formatter));
        defaultStyle.setFont(defaultFont2);
        cell.setCellStyle(defaultStyle);
        cell1.setCellStyle(defaultStyle1);
        sheet.addMergedRegion(new CellRangeAddress(requestList.size() + values.length +2, requestList.size() + values.length +2, 0, 2));
        sheet.addMergedRegion(new CellRangeAddress(requestList.size() + values.length +2, requestList.size() + values.length +2, 4, 6));

        Row row1 = sheet.createRow(requestList.size() + values.length +3); // Tạo hàng cho mỗi giá trị
        Cell cell2 = row1.createCell(0);
        cell2.setCellValue("Người làm báo cáo");
        Cell cell3 = row1.createCell(4);
        cell3.setCellValue("Thủ trường cơ quan");
        defaultStyle.setFont(defaultFont2);
        cell2.setCellStyle(defaultStyle1);
        cell3.setCellStyle(defaultStyle1);
        sheet.addMergedRegion(new CellRangeAddress(requestList.size() + values.length +3, requestList.size() + values.length +3, 0, 2));
        sheet.addMergedRegion(new CellRangeAddress(requestList.size() + values.length +3, requestList.size() + values.length +3, 4, 6));
        Row row2 = sheet.createRow(requestList.size() + values.length +4); // Tạo hàng cho mỗi giá trị
        Cell cell4 = row2.createCell(4);
        cell4.setCellValue("(Ký tên và đóng dấu)");
        cell4.setCellStyle(defaultStyle1);
        sheet.addMergedRegion(new CellRangeAddress(requestList.size() + values.length +4, requestList.size() + values.length +4, 0, 2));
        sheet.addMergedRegion(new CellRangeAddress(requestList.size() + values.length +4, requestList.size() + values.length +4, 4, 6));
        try (ByteArrayOutputStream bos = new ByteArrayOutputStream()) {
            workbook.write(bos);
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(new MediaType("application", "vnd.openxmlformats-officedocument.spreadsheetml.sheet"));
            headers.setContentDispositionFormData("attachment", "Báo cáo.xlsx");
            workbook.close();
            return new ResponseEntity<>(bos.toByteArray(), headers, HttpStatus.OK);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}
