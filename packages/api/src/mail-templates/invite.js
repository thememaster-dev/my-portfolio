// const path = require("path");
const hbs = require("nodemailer-express-handlebars");

const { transport } = require("../utils/permission");

require("dotenv").config();
const { MAIL_USER } = process.env;

async function invite(mailObj) {
  const { email } = mailObj;

  try {
    // const handlebarOptions = {
    //   viewEngine: {
    //     extName: ".handlebars",
    //     partialsDir: path.join(__dirname, "/handlebarTemplates"),
    //     defaultLayout: false,
    //   },
    //   viewPath: path.join(__dirname, "/handlebarTemplates"),
    //   extName: ".handlebars",
    // };

    // transport.use("compile", hbs(handlebarOptions));
    // const verifyUrl = `${DASHBOARD_URL}/auth/guest?token=${token}`;

    const mailOptions = {
      from: MAIL_USER,
      to: email,
      subject: "Invitation to team",
      text: "you are invited to my_portfolio app",
      // template: "invite",
      // context: {
      //   // DASHBOARD_URL,
      //   verifyUrl,
      // },
    };

    await transport.sendMail(mailOptions);
  } catch (error) {
    throw error;
  }
}

module.exports = {
  invite,
};
