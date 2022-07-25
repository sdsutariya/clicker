import Post from "../models/Post.js";
import User from "../models/User.js";

class postcontroller{

    //create a post
    static createpost = async(req,res)=>{
        const newpost = new Post(req.body)

        try {
            const savedpost = await newpost.save();
            return res.status(200).json(savedpost);
        } catch (error) {
            return res.status(500),json(error);
        }
    }

    //update a post
    static updatepost = async(req,res)=>{
        try {
            
            const post = await Post.findById(req.params.id);
    
            if(post.userId === req.body.userId){
                await Post.updateOne({$set:req.body});
                return res.status(200).json("The post has been updated");
            }else{
                return res.status(400).json("you can update only your post");
            }
        } catch (error) {
            return res.status(500).json(error);
        }

    }


    //delete a post
    static deletepost = async(req,res)=>{
        try {
            
            const post = await Post.findById(req.params.id);
    
            if(post.userId === req.body.userId){
                await Post.deleteOne();
                return res.status(200).json("The post has been deleted");
            }else{
                return res.status(400).json("you can delete only your post");
            }
        } catch (error) {
            return res.status(500).json(error);
        }

    }

    // like/dislike a post
    static likepost = async(req,res)=>{
        try {
            
            const post = await Post.findById(req.params.id);
            if(!post.likes.includes(req.body.userId)){
                await post.updateOne({$push: { likes: req.body.userId}});
                return res.status(200).json("The post has been liked")
            }else{
                await Post.updateOne({ $pull: {likes: req.body.userId}});
                return res.status(200).json("The post has been disliked");
            }
           
        } catch (error) {
            return res.status(500).json(error);
        }

    }

    //get a post
    static getpost = async(req,res)=>{
        try {
            const post = await Post.findById(req.params.id);
            return res.status(200).json(post);
        } catch (error) {
            return res.status(500).json(error);
        }
    }


    //get timeline posts
    static gettimelinepost = async(req,res)=>{
        try {
        
            const currentuser = await User.findById(req.body.userId);
            const userpost = await Post.find({userId:req.body.userId});
            const friendpost = await Promise.all(
                currentuser.followings.map((friendId)=>{
                    return Post.find({ userId : friendId});
                })
            );
            
            return res.status(200).json(userpost.concat(...friendpost));
        } catch (error) {
            return res.status(500).json(error);
        }
    }

}

export default postcontroller;