import User from "../models/User.js";
import bcrypt from "bcrypt";

class usercontroller {
  //update user
  static updateUser = async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
      if (req.body.password) {
        try {
          const salt = await bcrypt.genSalt(10);
          req.body.password = await bcrypt.hash(req.body.password, salt);
        } catch (error) {
          return res.status(500).json({
            sucess: false,
            data: null,
            error: error.toString(),
          });
        }
      }
      try {
        const user = await User.findByIdAndUpdate(req.params.id, {
          $set: req.body,
        });
        res.status(200).json({
          sucess: true,
          data: user,
          message: "Account has been updated",
        });
      } catch (error) {
        return res.status(500).json({
          sucess: false,
          data: null,
          error: error.toString(),
        });
      }
    } else {
      return res.status(403).json({
        sucess: false,
        data: null,
        error: "you can update only your account",
      });
    }
  };

  //delete user
  static deleteUser = async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
      try {
        const user = await User.findByIdAndDelete(req.params.id);
        res.status(200).json({
          sucess: true,
          data: user,
          message: "Account has been deleted",
        });
      } catch (error) {
        return res.status(500).json({
          sucess: false,
          data: null,
          error: error.toString(),
        });
      }
    } else {
      return res.status(403).json({
        sucess: false,
        data: null,
        error: "you can delete only your account",
      });
    }
  };

  //get a user
  static getUser = async (req, res) => {
    try {
      const user = await User.findById(req.params.id);

      //remove password and other unimportant things
      const { password, updatedAt, createdAt, ...other } = user._doc;
      res.status(200).json({
        sucess: true,
        data: other,
        error: "User details has been fetched sucessfully",
      });
    } catch (error) {
      return res.status(403).json({
        sucess: false,
        data: null,
        error: "you can delete only your account",
      });
    }
  };

  //follow a user
  static follower = async (req, res) => {
    if (req.body.userId !== req.params.id) {
      try {
        const user = await User.findById(req.params.id);
        const currentuser = await User.findById(req.body.userId);

        if (!user.followers.includes(req.body.userId)) {
          await user.updateOne({ $push: { followers: req.body.userId } });
          await currentuser.updateOne({ $push: { followings: req.params.id } });
          res.status(200).json({
            sucess: true,
          data: {},
          message: "user has been followed",
          });
        } else {
          res.status(403).json({
            sucess: false,
            data: null,
            error: "you already follow this user",
          });
        }
      } catch (error) {
        return res.status(500).json({
          sucess: false,
          data: null,
          error: error.toString(),
        });
      }
    } else {
      return res.status(403).json({
        sucess: false,
        data: null,
        error: "you can`t follow yourself",
      });
    }
  };

  //unfollow user
  static unfollow = async (req, res) => {
    if (req.body.userId !== req.params.id) {
      try {
        const user = await User.findById(req.params.id);
        const currentuser = await User.findById(req.body.userId);

        if (user.followers.includes(req.body.userId)) {
          await user.updateOne({ $pull: { followers: req.body.userId } });
          await currentuser.updateOne({ $pull: { following: req.params.id } });
          res.status(200).json({sucess: true,
            data: user,
            message:"user has been unfollowed"});
        } else {
          res.status(403).json({
            sucess: false,
            data: null,
            error: "you don`t unfollow this user",
          });
        }
      } catch (error) {
        return res.status(500).json({
          sucess: false,
          data: null,
          error: error.toString(),
        });
      }
    } else {
      return res.status(403).json({
        sucess: false,
        data: null,
        error: "you can`t unfollow yourself",
      });
    }
  };
}

export default usercontroller;
