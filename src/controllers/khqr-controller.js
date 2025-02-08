const { BakongKHQR, khqrData, IndividualInfo } = require("bakong-khqr");

const RequestQR = (req, res) => {
  const { account, name, city, amount } = req.body;

  try {
    const optionalData = {
      currency: khqrData.currency.khr,
      amount: amount,
    };

    const individualInfo = new IndividualInfo(
      account,
      name,
      city,
      optionalData
    );
    const KHQR = new BakongKHQR();
    const individual = KHQR.generateIndividual(individualInfo);

    res.json({ md5: individual.data.md5, qr: individual.data.qr });
  } catch (error) {
    console.error("Failed to generate KHQR:", error);
    res.status(500).json({ error: "Failed to generate KHQR" });
  }
};

module.exports = { RequestQR };
