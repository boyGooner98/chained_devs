const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const Profiles = require('../../models/profile/profile');
const Posts = require('../../models/post/post');
const User = require('../../models/user/user');
const { parseTwoDigitYear } = require('moment');
//  /api/posts

router.post(
  '/',
  [auth, [check('text', 'text cannot be empty').not().isEmpty()]],
  async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.send({ error: error.array() });
    }
    let u = await User.findOne({ _id: req.user.id });
    let post = {
      text: req.body.text,
      user: req.user.id,
      name: u.name,
      avatar: u.avatar,
    };
    let pos = new Posts(post);
    pos.save();
    return res.send(pos);
  }
);

//GETTING ALL THE POSTS
//ENDPOINT:api/posts/all

router.get('/all', async (req, res) => {
  const posts = await Posts.find().sort({ date: -1 });
  if (!posts) {
    return res.send('no posts found');
  }
  return res.json(posts);
});

//DELETING A SINGLE POST
router.delete('/delete/:id', [auth], async (req, res) => {
  const post = await Posts.findById(req.params.id);
  if (!post) {
    return res.json({ msg: 'no post found' });
  } else if (post.user.id != req.user.id) {
    return res.send('acess denied');
  }
  await Posts.findOneAndDelete({ _id: req.params.id });
  res.send('post removed');
});

//GETTING A SINGLE POST

router.get('/onePost/:id', async (req, res) => {
  const post = await Posts.findOne({ _id: req.params.id });
  if (!post) {
    return res.send('no post found');
  }
  return res.send(post);
});

//LIKE
router.put('/likes/:id', [auth], async (req, res) => {
  try {
    const post = await Posts.findById(req.params.id);
    if (
      post.likes.filter((item) => item.user.toString() === req.user.id).length >
      0
    ) {
      return res.status(400).send('cannot add more likes');
    }
    post.likes.unshift({
      user: req.user.id,
    });
    await post.save();
    return res.send(post.likes);
  } catch (err) {
    res.send(err);
  }
});

//UNLIKE
router.put('/unlikes/:id', [auth], async (req, res) => {
  try {
    const post = await Posts.findById({ _id: req.params.id });
    if (
      post.likes.filter((item) => item.user.toString() === req.user.id)
        .length === 0
    ) {
      return res.status(400).send('post not yet been liked');
    }
    const removeIndex = post.likes
      .map((item) => item.user.toString())
      .indexOf(req.user.id);
    post.likes.splice(removeIndex, 1);
    await post.save();
    res.status(200).send(post.likes);
  } catch (err) {
    res.send(err);
  }
});

//COMMENTS ROUTES

router.post(
  '/comments/:id',
  [auth, [check('text', 'text cannot be empty').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }
    const use = await User.findById(req.user.id);
    let post = await Posts.findById(req.params.id);
    console.log(post);
    const newComment = {
      user: req.user.id,
      text: req.body.text,
      name: use.name,
      avatar: use.avatar,
    };
    try {
      await post.comments.unshift(newComment);
      await post.save();
      res.send(post.comments);
    } catch (err) {
      res.send('not working');
    }
  }
);

//REMOVING A COMMENT WITH THE COMMENT ID
router.delete('/comments/remove/:id/:commentId', [auth], async (req, res) => {
  try {
    const post = await Posts.findById(req.params.id);
    const removeIndex = post.comments
      .map((item) => item._id)
      .indexOf(req.params.commentId);
    post.comments.splice(removeIndex, 1);
    await post.save();
    res.status(200).send(post);
  } catch (err) {
    res.send(err);
  }
});

module.exports = router;
