const express = require('express');
const router = express.Router();
const Profiles = require('../../models/profile/profile');
const User = require('../../models/user/user');
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const request = require('request');
const config = require('../../config.json')

//  /api/profiles/me
router.get('/me',auth, async (req, res) => {
  try {
    let profile = await Profiles.findOne({ user: req.user.id }).populate(
      'user',
      ['name', 'avatar']
    );
    if (!profile) {
      res.status(400);
    }
    return res.json(profile)
  } catch (err) {
    res.status(500).send("server error");
  }
});

//CREATE AND UPDATE THE PROFILES
//ENDPOINT : api/profiles/
//post request

router.post(
  '/',
  [
    auth,
    [
      check('company', 'company cannot be empty').not().isEmpty(),
      check('skills', 'skills cannot be empty').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    const {
      company,
      website,
      location,
      bio,
      status,
      githubuseraccount,
      skills,
      youtube,
      twitter,
      linkedin,
      instagram,
      facebook,
    } = req.body;
    const ProfileFields = {};
    ProfileFields.user = req.user.id;
    let usr = await User.findById({ _id: req.user.id })
    ProfileFields.userName = usr.name;
    ProfileFields.userGravatar = usr.avatar;
    if (company) ProfileFields.company = company;
    if (website) ProfileFields.website = website;
    if (location) ProfileFields.location = location;
    if (bio) ProfileFields.bio = bio;
    if (status) ProfileFields.status = status;
    if (githubuseraccount) ProfileFields.githubuseraccount = githubuseraccount;
    if (skills) {
      ProfileFields.skills = skills.split(',').map((skill) => skill.trim());
    }
    ProfileFields.social = {};
    if (youtube) ProfileFields.social.youtube = youtube;
    if (twitter) ProfileFields.social.twitter = twitter;
    if (linkedin) ProfileFields.social.linkedin = linkedin;
    if (instagram) ProfileFields.social.instagram = instagram;
    if (facebook) ProfileFields.social.facebook = facebook;
    try {
      let profile = await Profile.findOne({ user: req.user.id });
      if(profile) {
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: ProfileFields },
          { new: true }
        )
        return res.send(profile);
      }
      profile = new Profile(ProfileFields);
      await profile.save();
      return res.send(profile);
    } catch (err) {
      return res.send(err);
    }
  }
);

//GETTING ALL THE PROFILES
router.get('/getAllProfiles', async (req, res) => {
  try {
    let profiles = await Profiles.find();
    if (profiles) {
      return res.json(profiles);
    }
    return res.send('No Profiles Found');
  } catch (err) {
    res.send(err);
  }
});

//GETTING A SINGLE PROFILE (NOT NECESSARILY OF THE CURRENT USER ) == WE HAVE /api/profiles/me endpoint for the current user
//ENDPOINT:/api/profiles/:userId
router.get('/:userId', async (req, res) => {
  try {
    let profile = await Profiles.findOne({ user: req.params.userId }).populate('user',['name','avatar']);
    if (profile) {
      return res.send(profile);
    }
    return res.send('No Profile Associated with the current user');
  } catch (err) {
    res.send(err);
  }
});

//DELETING A PROFILE AND THE USER ASSOCIATED WITH IT
//ENDPOINT:/api/profiles/delete
router.delete('/delete',[auth], async (req, res) => {
  try {
    await Profiles.findOneAndDelete({ user: req.user.id });
    await User.findOneAndDelete({ _id: req.user.id });
    return res.json({ msg: 'The Profiles and The User deleted successfully' });
  } catch (err) {
    res.send(err);
  }
});

//ADDING THE EXPERIENCE TO A PROFILE
router.put(
  '/experience',
  [
    auth,
    [
      check('title', 'enter title').not().isEmpty(),
      check('company', 'enter company').not().isEmpty(),
      check('location', 'location is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    } = req.body;
    const exp = {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    };

    try {
      let profile = await Profiles.findOne({ user: req.user.id });
      if (!profile) {
        return res.json({
          msg: 'no profile found',
        });
      }
      console.log(profile);
      await profile.experience.unshift(exp);
      await profile.save();
      return res.send(profile);
    } catch (err) {
      res.json({
        msg: 'something went wrong',
      });
    }
  }
);

//DELETING THE EXPERIENCE FROM A PROFILE

router.delete('/experience/delete/:id', [auth], async (req, res) => {
  try {
    const profile = await Profiles.findOne({ user: req.user.id });
    if (!profile) {
      return res.json({
        msg: 'no profile associated',
      });
    }
    let index = profile.experience.map((exp) => exp._id).indexOf(req.params.id);
    if (index == -1) {
      return res.json({
        msg: 'no experience found',
      });
    }
    profile.experience.splice(index, 1);
    await profile.save();
    return res.send(profile);
  } catch (err) {
    res.json({ msg: 'no profile associated with the current user' });
  }
});

//ADDING THE EDUCATION PART TO THE PROFILE
router.put(
  '/education',
  [
    auth,
    [
      check('school', 'enter the school name').not().isEmpty(),
      check('degree', 'enter your degree').not().isEmpty(),
      check('fieldofstudy', 'enter your field of study').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty) {
      return res.status(400).json({ errors: errors.toArray() });
    }
    const {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
    } = req.body;
    const edu = {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
    };

    try {
      let profile = await Profiles.findOne({ user: req.user.id });
      profile.education.unshift(edu);
      await profile.save();
      return res.send(profile);
    } catch (err) {
      res.json('no profile associated with the current user');
    }
  }
);

//DELETING THE EDUCATION PART OF THE PROFILE
router.delete('/education/delete/:id', [auth], async (req, res) => {
  try {
    const profile = await Profiles.findOne({ user: req.user.id });
    if (!profile) {
      return res.json({
        msg: 'no profile associated',
      });
    }
    let index = profile.education.map((exp) => exp._id).indexOf(req.params.id);
    if (index == -1) {
      return res.json({
        msg: 'no education found',
      });
    }
    profile.education.splice(index, 1);
    await profile.save();
    return res.send(profile);
  } catch (err) {
    res.json({ msg: 'no profile associated with the current user' });
  }
});

//ADDING GITHUB REPOS USING THE GITHUB API

router.get('/github/:username',  (req, res) => {
  try {   
    const options = {
      uri: `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&client_id=${config.GITHUBCLIENTID}&client_secret=${config.GITHUBSECRET}`,
      method: 'GET',
      headers: { 'user-agent': 'node.js' },
    };

   request(options,(error, response, body)=> {
      if (error) console.log(error)
      if (response.statusCode !== 200) {
        res.send("no profiles found")
      }
      return res.json(JSON.parse(body))
    })
  } catch (err) {
    res.status(400).send("server error")
  }
});

module.exports = router;
