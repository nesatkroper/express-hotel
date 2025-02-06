const nodemailer = require("nodemailer");
const crypto = require("crypto");

// ! OTP
const otps = {};

// ! nodemailer configuration
// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   host: "smtp.gmail.com",
//   port: 465,
//   secure: true,
//   auth: {
//     user: process.env.GMAIL_USER,
//     pass: process.env.GMAIL_PASS,
//   },
// });

// ! mailhog configuration
const transporter = nodemailer.createTransport({
  host: "localhost",
  port: 1025,
  secure: false,
});

// ! Generate and Send OTP
exports.send = async (req, res) => {
  const { email } = req.body;
  const otp = crypto.randomInt(10000, 99999);

  otps[email] = { otp, expiresAt: Date.now() + 5 * 60 * 1000 };

  const mailOptions = {
    // from: process.env.GMAIL_USER,
    from: "no-reply@hotel-reservation.com",
    to: email,
    subject: "Your OTP Code",
    // text: `Your OTP is: ${otp}. It is valid for 5 minutes.`,
    html: `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your One-Time Password (OTP)</title>
    <style>
    @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Khmer:wght@100..900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
        body {
            font-family: "Poppins", serif;
            background-color: #f7fafc;
            margin: 0;
            padding: 0;
            color: #333;
        }
        .container {
            max-width: 400px;
            margin: 20px auto;
            padding: 20px;
            background-color: #ffffff;
            border-radius: 12px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            padding: 20px 0;
            border-bottom: 1px solid #e0e0e0;
        }
        .header img {
            width: 150px;
            margin-bottom: 10px;
            border-radius: 10px;
        }
        .header h2 {
            color: #2d3748;
            margin: 0;
            font-size: 24px;
            font-weight: 600;
        }
        .content {
            padding: 20px 0;
            text-align: center;
        }
        .otp-code {
            font-size: 32px;
            font-weight: 700;
            color: #4CAF50;
            margin: 20px 0;
            padding: 15px;
            background-color: #f0f8f0;
            border-radius: 8px;
            display: inline-block;
            letter-spacing: 4px;
        }
        .info {
            font-size: 14px;
            color: #4a5568;
            margin: 10px 0;
        }
        .cta-button {
            display: inline-block;
            margin: 20px 0;
            padding: 12px 24px;
            background-color: #4CAF50;
            color: #ffffff;
            text-decoration: none;
            border-radius: 6px;
            font-size: 16px;
            font-weight: 600;
        }
        .footer {
            text-align: center;
            font-size: 12px;
            color: #718096;
            padding-top: 20px;
            border-top: 1px solid #e0e0e0;
        }
        .footer a {
            color: #4CAF50;
            text-decoration: none;
        }
        .footer a:hover {
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- Header -->
        <div class="header">
            <img src="https://scontent.fpnh2-2.fna.fbcdn.net/v/t39.30808-6/471600851_1296793751348093_7550025448735272664_n.jpg?stp=dst-jpg_s960x960_tt6&_nc_cat=111&ccb=1-7&_nc_sid=cc71e4&_nc_eui2=AeGnj5ZzUnq_rRGmM7M1txEZtZHt5IklJ2O1ke3kiSUnY6E4wLAN7RN95wgbYY7bfHMhXFaBjVNeFNKc8kIwAQ90&_nc_ohc=XCfAqD5zljEQ7kNvgHJUjEK&_nc_zt=23&_nc_ht=scontent.fpnh2-2.fna&_nc_gid=AkyUDkUZ5Ck3YFKbTv8zh_G&oh=00_AYBOspnbgErjEDnPVAHmZNk_HOfDEYRAjViEOyCry4bfDQ&oe=67A76743" alt="YourApp Logo">
            <h2>Your One-Time Password (OTP)</h2>
        </div>

        <!-- Content -->
        <div class="content">
            <p>Hello, <b>${email}</b></p>
            <p>We received a request to verify your account. Please use the following One-Time Password (OTP) to complete your verification:</p>
            <div class="otp-code">${otp}</div>
            <p class="info">This code is valid for <strong>5 minutes</strong>. Do not share it with anyone.</p>
            <p class="info">If you did not request this OTP, please ignore this email or contact our support team immediately.</p>
        </div>

        <!-- Footer -->
        <div class="footer">
            <p>Need help? Contact our support team at <a href="mailto:support@yourapp.com">support@yourapp.com</a>.</p>
            <p>&copy; 2023 YourApp. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
  `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send("OTP sent successfully!");
  } catch (error) {
    console.error(error);
    res.status(500).send("Failed to send OTP.");
  }
};

// ! Verify OTP
exports.verify = (req, res) => {
  try {
    const { email, otp } = req.body;
    const record = otps[email];

    if (!record) {
      return res.status(400).send("Invalid or expired OTP.");
    }

    if (record.otp === parseInt(otp) && record.expiresAt > Date.now()) {
      delete otps[email];
      return res.status(200).send("OTP verified!");
    }

    res.status(400).send("Invalid or expired OTP.");
  } catch (error) {
    console.error(error);
  }
};
