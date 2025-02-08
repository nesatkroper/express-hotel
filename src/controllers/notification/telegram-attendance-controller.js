const fetch = require("node-fetch");

const sendAttendance = async (req, res) => {
  const { employee_name, address } = req.body;

  const token = process.env.TOKEN;
  const channel = process.env.CHANNEL_ATTENDANCE;

  if (!employee_name || !address) {
    return res
      .status(400)
      .json({ success: false, error: "All details are required." });
  }

  const message = `
*New Attendance Received!*
---------------------------------------------------------
  -*Employee:* *${employee_name}*
  -*Employee Code:* *EMP-001*
  -*From Address:* ${address}
---------------------------------------------------------
📅 *Register Date:* ${new Date().toLocaleString()}
`;

  const url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${channel}&text=${encodeURIComponent(
    message
  )}&parse_mode=Markdown`;

  try {
    const response = await fetch(url);
    const result = await response.json();

    if (response.ok) {
      res.status(200).json({ success: true, telegramResponse: result });
    } else {
      res.status(400).json({ success: false, error: result });
    }
  } catch (error) {
    console.error("Error sending order notification:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

module.exports = { sendAttendance };
