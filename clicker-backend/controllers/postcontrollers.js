import Post from "../models/Post.js";
import User from "../models/User.js";

class postcontroller {
  //create a post
  static createpost = async (req, res) => {
    const newpost = new Post(req.body);

    try {
      const savedpost = await newpost.save();
      return res.status(200).json({
        success: true,
        data: savedpost,
        message: "post created successfuly",
      });
    } catch (error) {
      return (
        res.status(500),
        json({
          success: false,
          data: null,
          error: error.toString(),
        })
      );
    }
  };

  //update a post
  static updatepost = async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);

      if (post.userId === req.body.userId) {
        const data = await Post.updateOne({ $set: req.body });
        return res.status(200).json({
          success: true,
          data: data,
          message: "The post has been updated",
        });
      } else {
        return res.status(400).json({
          success: false,
          data: null,
          error: "you can update only your post",
        });
      }
    } catch (error) {
      return res.status(500).json({
        success: false,
        data: null,
        error: error.toString(),
      });
    }
  };

  //delete a post
  static deletepost = async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);

      if (post.userId === req.body.userId) {
        const data = await Post.deleteOne();
        return res.status(200).json({
            success: true,
            data: data,
            message: "The post has been deleted",
          });
      } else {
        return res.status(400).json({
            success: false,
            data: null,
            error: "you can delete only your post",
          });
      }
    } catch (error) {
      return res.status(500).json({
        success: false,
        data: null,
        error: error.toString(),
      });
    }
  };

  // like/dislike a post
  static likepost = async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      if (!post.likes.includes(req.body.userId)) {
        const data = await post.updateOne({ $push: { likes: req.body.userId } });
        return res.status(200).json({
            success: true,
            data: data,
            message: "The post has been liked",
          });
      } else {
        const data = await Post.updateOne({ $pull: { likes: req.body.userId } });
        return res.status(200).json({
            success: true,
            data: data,
            message: "The post has been disliked",
          });
      }
    } catch (error) {
      return res.status(500).json({
        success: false,
        data: null,
        error: error.toString(),
      });
    }
  };

  //get a post
  static getpost = async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      return res.status(200).json({
        success: true,
        data: post,
        message: "The post has been disliked",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        data: null,
        error: error.toString(),
      });
    }
  };

  //get timeline posts
  static gettimelinepost = async (req, res) => {
    try {
      const currentuser = await User.findById(req.headers.userid);
      const userpost = await Post.find({ userId: req.headers.userid });
      const friendpost = await Promise.all(
        currentuser.followings.map((friendId) => {
          return Post.find({ userId: friendId });
        })
      );

      return res.status(200).json({
        success: true,
        data: userpost.concat(...friendpost),
        message: "The get timeline post successfully",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        data: null,
        error: error.toString(),
      });
    }
  };
}

export default postcontroller;
