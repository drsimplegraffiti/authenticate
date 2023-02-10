const AdminMessage = require("../models/adminMessage");
const sendEmail = require("../utils/sendEmail");
const { sendWelcomeTemplate } = require("../utils/templates/welcome.template");

const sendMessage = async (req, res) => {
  try {
    const { email, message, subject } = req.body;

    await sendEmail({
      email: email,
      subject: subject,
      html: await sendWelcomeTemplate(email),
    });

    const createNewMessage = await AdminMessage.create({
      to: email,
      subject,
      message,
    });

    return res.status(201).json({
      message: "sent email from postman successful",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: error.message,
    });
  }
};

module.exports = {
  sendMessage,
};
