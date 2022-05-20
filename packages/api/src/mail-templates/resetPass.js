const path = require("path");
const hbs = require("nodemailer-express-handlebars");

const { transport } = require("../utils/permission");

require("dotenv").config();
const { DASHBOARD_URL, MAIL_PASS } = process.env;

async function sendPassResetEmail(mailObj) {
  const { name, email, otp } = mailObj;

  try {
    const handlebarOptions = {
      viewEngine: {
        extName: ".handlebars",
        partialsDir: path.join(__dirname, "/handlebarTemplates"),
        defaultLayout: false,
      },
      viewPath: path.join(__dirname, "/handlebarTemplates"),
      extName: ".handlebars",
    };

    transport.use("compile", hbs(handlebarOptions));
    // const verifyUrl = `${DASHBOARD_URL}/recovery/verify?otp=${otp}&email=${email}`;

    const mailOptions = {
      from: MESSANGER_MAIL,
      to: email,
      subject: "Reset  Password",
      template: "resetPassword",
      context: {
        name: name && name,
        // DASHBOARD_URL,
        // verifyUrl,
        otp,
      },
    };

    await transport.sendMail(mailOptions);
  } catch (error) {
    throw error;
  }
}

module.exports = {
  sendPassResetEmail,
};
