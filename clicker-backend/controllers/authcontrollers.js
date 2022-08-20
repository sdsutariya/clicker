import User from "../models/User.js";
import bcrypt from "bcrypt";

class authcontroller {
  //signup
  static signup = async (req, res) => {
    try {
      //generate new password
      const salt = await bcrypt.genSalt(10);
      const hashedpassword = await bcrypt.hash(req.body.password, salt);

      const userexists = await User.findOne({ email: req.body.email });
      console.log("userexists  :: ",userexists);
      if (userexists) {
        res.status(404).json({
          success: false,
          data: null,
          error: "user already exists",
        });
      }

      //create new user
      const newUser = await new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedpassword,
      });

      //save user and return response
      const user = await newUser.save();
      res.status(200).json({
        success: true,
        data: user,
        message: 'Registration sucessfuly',
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        data: null,
        error: error.toString(),
      });
    }
  };

  //signin
  static signin = async (req, res) => {
    try {
      //check user exists or not
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        res.status(404).json({
          success: false,
          data: null,
          error: "user not found",
        });
      }

      const validpassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!validpassword) {
        res.status(400).json({
          success: false,
          data: null,
          error: "wrong password",
        });
      }

      res.status(200).json({
        success: true,
        data: user,
        message: 'Login sucessfuly',
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        data: null,
        error: error.toString(),
      });
    }
  };
}

export default authcontroller;
