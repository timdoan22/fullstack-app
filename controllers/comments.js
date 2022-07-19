const Comment = require("../models/Comment");

module.exports = {
  createComment: async (req, res) => {
    try {
      await Comment.create({
        comment: req.body.comment,
        likes: 0,
        post: req.params.id,
        user: req.user.id,
        userName: req.user.userName
      });
      console.log('test')
      res.redirect("/bookmark/"+req.params.id);
    } catch (err) {
      console.log(err);
    }
  },
  likeComment: async (req, res) => {
    try {
      // Update the like counter by one
      await Comment.findOneAndUpdate(
        { _id: req.params.commentid },
        {
          $inc: { likes: 1 },
        }
      );
      console.log("Comment likes +1");
      // return the user to the same post page
      res.redirect("/bookmark/"+req.params.postid);
    } catch (err) {
      console.log(err);
    }
  },
}