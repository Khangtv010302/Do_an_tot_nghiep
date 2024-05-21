<!DOCTYPE html>
<html lang="en">
<head>
    <meta http-equiv="Content-Type" content="text/html" charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome Email</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            padding: 20px;
            background-color: #ffffff;
        }
        .header {
            background-color: #34aeeb;
            padding: 5px;
            text-align: center;
        }
        .content {
            padding: 20px;
            text-align: left;
            line-height: 1.6;
        }
        .footer {
            padding: 10px;
            text-align: center;
            background-color: #34aeeb;

        }
        a {
            color: #3D85C6;
            text-decoration: underline;
        }
        .verification-code{
            font-weight: bold;
            font-size: 16px;
        }
    </style>
</head>
<body>
<div class="container">
    <div class="header">
        <h2>Nhắc hẹn tiêm chủng ở trạm y tế phường Vĩnh Thọ</h2>
    </div>
    <div class="content">
        <p>Kính gửi Quý phụ huynh,</p>
        <p>Chúng tôi xin nhắc nhở Quý phụ huynh về lịch hẹn tiêm chủng sắp tới của bé <b>${name}</b>.</p>
            <p>Lịch tiêm chủng sẽ diễn ra vào ngày <b>${scheduledDate}</b>. Trong lần tiêm này, bé ${name}
            sẽ được tiêm vắc xin <b>${vaccineName}</b> nhằm bảo vệ sức khỏe và ngăn ngừa các bệnh nguy hiểm.
            Chúng tôi khuyến khích Quý phụ huynh đưa bé đến đúng giờ để quá trình tiêm chủng diễn ra
            thuận lợi và hiệu quả nhất.</p>
        <p>Nếu có bất kỳ thắc mắc hay cần hỗ trợ thêm thông tin, vui lòng liên hệ với chúng tôi qua số điện thoại 0258 3834 009.</p>
        <p>Trân trọng,</p>
    </div>
    <div class="footer">
        Trạm y tế phường Vĩnh Thọ
    </div>
</div>
</body>
</html>