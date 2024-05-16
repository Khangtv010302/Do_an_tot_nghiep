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
            text-align: center;
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
        <h2>Mã xác nhận</h2>
    </div>
    <div class="content">
        <p>Mã xác nhận của bạn là: <span class="verification-code">${code}</span></p>
        <p style="font-weight: bold">Lưu ý: <span style="color: #cc0000">Mã xác nhận chỉ sử dụng 1 lần !!</span> </p>
    </div>
    <div class="footer">
        Trạm y tế phường Vĩnh Thọ
    </div>
</div>
</body>
</html>