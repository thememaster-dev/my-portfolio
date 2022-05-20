const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");
const Owner = require("../models/owner");

const createToken = require("../helpers/generateToken");
const createOtp = require("../helpers/generateOtp");

const { invite } = require("../mail-templates/invite");
const { sendPassResetEmail } = require("../mail-templates/resetPass");

exports.me = async function (req, res) {
  try {
    const user = await User.findById(req.user.id);
    const token = createToken.generateToken(user);

    res.status(200).json({ success: true, token: `Bearer ${token}` });
  } catch (err) {
    res.status(500).json({
      message: "token err",
    });
  }
};

exports.register = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const extUser = await Owner.find({});

    if (extUser.length > 0) {
      return res.status(403).json({
        message: "There is an owner already!",
      });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const owner = new Owner({
      name,
      email,
      password: hashedPassword,
    });

    await owner.save();

    const user = new User({
      name,
      email,
      activeStatus: true,
      password: hashedPassword,
      role: "admin",
    });

    const savedUser = await user.save();

    const token = createToken.generateToken(savedUser);

    return res.status(200).json({
      success: true,
      token: `Bearer ${token}`,
    });
  } catch (err) {
    res.status(500).send({ message: "Internal server error!" });
  }
};
exports.activeMail = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const actUser = await User.findOne({ email, activeStatus: true });

    if (actUser) {
      return res.status(403).json({
        message: "This mail is already active!",
      });
    }
    const invUser = await User.findOne({ email, activeStatus: false });

    if (!invUser) {
      return res.status(403).json({
        message: "This mail is not invited!",
      });
    }

    const admin = await User.findOne({ role: "admin" });

    const hashedPassword = bcrypt.hashSync(password, 10);
    const updated = await User.findOneAndUpdate(
      { email },
      {
        $set: {
          name,
          password: hashedPassword,
          role: admin ? "visitor" : "admin",
          activeStatus: true,
        },
      },
      { new: true, useFindAndModify: false }
    );

    const token = createToken.generateToken(updated);

    return res.status(200).json({
      success: true,
      token: `Bearer ${token}`,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Internal server error!" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "User not found!!",
      });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(404).json({
        message: "Password incorrect !!",
      });
    }

    const token = createToken.generateToken(user);

    return res.status(200).json({ success: true, token: `Bearer ${token}` });
  } catch (err) {
    res.status(500).send({ message: "Internal server error!" });
  }
};

exports.forgetPassword = async function (req, res) {
  try {
    const { email } = req.body;

    const { otp, otpExpiry } = createOtp.generateOtp();

    const user = await User.findOneAndUpdate(
      { email },
      {
        $set: {
          forgetPassOtp: otp,
          forgetPassOtpExpiry: otpExpiry,
        },
      }
    );

    if (!user) {
      return res.status(404).json({
        message: "User does not exist! ",
      });
    }

    if (user.name === null) {
      const emailObj = {
        name: "",
        email,
        otp,
      };
      await sendPassResetEmail(emailObj);
    } else {
      const emailObj = {
        name: user.name,
        email,
        otp,
      };
      await sendPassResetEmail(emailObj);
    }

    res.status(200).json({
      success: true,
      email,
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal erver error!",
    });
  }
};

exports.matchOtp = async function (req, res) {
  try {
    const { otp, email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "User does not exist! ",
      });
    }
    if (user.forgetPassOtp != otp) {
      return res.status(404).json({
        message: "Your link is expired ! ",
      });
    }
    if (user.forgetPassOtpExpiry <= Date.now()) {
      return res.status(404).json({
        message: "Your link is expired55 ! ",
      });
    }

    const token = jwt.sign(
      {
        email,
        forgetPassOtp: user.forgetPassOtp,
      },
      config.secretOrKey,
      { expiresIn: "24h" }
    );

    res.status(200).json({
      success: true,
      token,
    });
  } catch (err) {
    res.status(500).send({ message: "Internal server error!!" });
  }
};
exports.resetPassword = async function (req, res) {
  try {
    const { password } = req.body;

    const user = await User.findOne({ email: req.user.email });
    if (!user) {
      return res.status(404).json({
        message: "User does not exist! ",
      });
    }
    if (user.forgetPassOtp != req.user.forgetPassOtp) {
      return res.status(404).json({
        message: "Your link is expired ! ",
      });
    }
    if (user.forgetPassOtpExpiry <= Date.now()) {
      return res.status(404).json({
        message: "Your link is expired ! ",
      });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    const updatedUser = await User.findOneAndUpdate(
      { email: req.user.email },
      {
        $set: {
          password: hashedPassword,
          forgetPassOtp: null,
          forgetPassOtpExpiry: null,
        },
      },
      { new: true, useFindAndModify: false }
    );

    const token = createToken.generateToken(updatedUser);

    res.status(200).json({
      success: true,
      token,
    });
  } catch (err) {
    res.status(500).send({ message: "Internal server error!!" });
  }
};
exports.invite = async function (req, res) {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({
        message: "User not found!!",
      });
    }
    if (user.role !== "admin") {
      return res.status(403).json({
        message: "Only admin may invite!!",
      });
    }
    const { invitedEmails } = req.body;
    const memberArray = await User.aggregate([
      { $match: { email: { $in: invitedEmails } } },
      {
        $project: {
          email: 1,
        },
      },
    ]);
    if (memberArray.length === 1) {
      return res.status(403).json({
        message: "A mail included  is already registerd!",
        registerd: memberArray,
      });
    }
    if (memberArray.length > 1) {
      return res.status(403).json({
        message: "Some mails included  are already registerd!",
        registerd: memberArray,
      });
    }
    for (let i = 0; i < invitedEmails.length; i++) {
      invite({ email: invitedEmails[i] });
    }

    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({
      message: "token err",
    });
  }
};
// exports.empower = async function (req, res) {
//   try {
//     const user = await User.findById(req.user.id);
//     if (!user) {
//       return res.status(404).json({
//         message: "User not found!!",
//       });
//     }
//     if (user.role !== "admin") {
//       return res.status(403).json({
//         message: "Only admin may change role!!",
//       });
//     }
//     const { invitedEmails } = req.body;
//     const memberArray = await User.aggregate([
//       { $match: { email: { $in: invitedEmails } } },
//       {
//         $project: {
//           email: 1,
//         },
//       },
//     ]);
//     if (memberArray.length === 1) {
//       return res.status(403).json({
//         message: "A mail included  is already registerd!",
//         registerd: memberArray,
//       });
//     }
//     if (memberArray.length > 1) {
//       return res.status(403).json({
//         message: "Some mails included  are already registerd!",
//         registerd: memberArray,
//       });
//     }
//     for (let i = 0; i < invitedEmails.length; i++) {
//       invite({ email: invitedEmails[i] });
//     }

//     res.status(200).json({ success: true });
//   } catch (err) {
//     res.status(500).json({
//       message: "token err",
//     });
//   }
// };
