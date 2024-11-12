const express = require("express");
const router = express.Router();
const Mail = require("../models/userMail"); // Імпорт моделі Mail

// Маршрут для отримання всіх повідомлень
router.get("/mails", async (req, res) => {
  try {
    const mails = await Mail.find();
    res.json(mails);
  } catch (err) {
    console.error("Error in GET /mails:", err.message);
    res.status(500).send("Server Error");
  }
});

// Маршрут для створення нового повідомлення
router.post("/mails", async (req, res) => {
  const { name, mobile, mail, subject, message } = req.body;
  console.log("Received data:", req.body); // Логування отриманих даних

  try {
    const newMail = new Mail({
      name,
      mobile,
      mail,
      subject,
      message,
    });

    await newMail.save();
    console.log("Mail saved:", newMail); // Логування збережених даних
    res.json(newMail);
  } catch (err) {
    console.error("Error in POST /mails:", err.message);
    res.status(500).send("Server Error");
  }
});

// Маршрут для видалення повідомлення за id
router.delete("/mails/:id", async (req, res) => {
  try {
    const mail = await Mail.findById(req.params.id);

    if (!mail) {
      return res.status(404).json({ msg: "Mail not found" });
    }

    await Mail.findByIdAndDelete(req.params.id);

    res.json({ msg: "Mail removed" });
  } catch (err) {
    console.error("Error in DELETE /mails/:id:", err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
