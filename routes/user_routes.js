// import express from 'express';
// import User from '../models/userModel';
// import { getToken, isAuth } from '../util';

const express = require('express')
const User = require('../models/user')
const RefreshToken = require('../models/refresh_token')
const { getToken, isAuth, removeToken } = require('../util')
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')
const { validate_login, validate_registration } = require("../validations");
require("dotenv").config

const router = express.Router();


router.put('/:id', isAuth, async (req, res) => {
  const userId = req.params.id;
  const user = await User.findById(userId);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.password = req.body.password || user.password;
    const updatedUser = await user.save();
    res.send({
      _id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: getToken(updatedUser)
    });
  } else {
    res.status(404).send({ msg: 'User Not Found' });
  }

});

router.post('/login', async (req, res) => {
  // Assign Email and Password to Varialbes
  const email = req.body.email;
  const password = req.body.password;
  // Check if User Exists
  const login_user = await User.findOne({ email });

  // If user doesnt exists
  if (!login_user) {
    return res.status(404).json({ emailnotfound: "Email not found" });
  }

  // Generate Access Toke and Refresh Token
  const name = login_user.name
  const user = { name: name }
  const accessToken = generateAccessToken(user)
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)

  console.log(refreshToken)

  // Check password
  bcrypt.compare(password, login_user.password).then(isMatch => {
    if (isMatch) {
      // Update user with refresh token
      RefreshToken.create({ refreshToken: refreshToken });
      // const updated_user = User.updateOne({ _id: req.body.id }, {
      //   name: login_user.name,
      //   email: login_user.email,
      //   isAdmin: login_user.isAdmin,
      //   refreshToken: refreshToken
      // })
      // console.log(updated_user)
      res.send({
        _id: login_user.id,
        name: login_user.name,
        email: login_user.email,
        isAdmin: login_user.isAdmin,
        accessToken: accessToken,
        refreshToken: refreshToken
      });

    }
    else {
      return res
        .status(400)
        .json({ passwordincorrect: "Password incorrect" });
    }
  });

});

const generateAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '48h' })

}

router.post('/token', async (req, res) => {
  const refreshToken = req.body
  // console.log({ user_routes: refreshToken })
  if (refreshToken === null) return res.sendStatus(401)

  // const tokens = await RefreshToken.find({ refreshToken: refreshToken });
  // if (!tokens) return res.sendStatus(403)
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403)
    const accessToken = generateAccessToken({ name: user.name })
    res.json({ accessToken: accessToken })
  })
})

router.post('/register', async (req, res) => {


  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    // refreshToken: refreshToken
  });

  // Generate Access Toke and Refresh Token
  const name = req.body.name
  const username = { name: name }
  const accessToken = generateAccessToken(username)
  const refreshToken = jwt.sign(username, process.env.REFRESH_TOKEN_SECRET)

  console.log(refreshToken)

  const user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(400).json({ email: "Email already exists" });
  }
  else {
    RefreshToken.create({ refreshToken: refreshToken });
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser.save().then(user => res.json({
          _id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          isAdmin: newUser.isAdmin,
          accessToken: accessToken,
          refreshToken: refreshToken
        }))
          .catch(err => console.log(err));
      });
    });
  }

})



// router.post("/logout", async (req, res) => {
//   console.log("logout")
//   removeToken(req)
//   res.status(200).json({ "token": "Removed Token" });
// });

router.delete('/logout', async (req, res) => {
  const tokens = await RefreshToken.find({ refreshToken: req.body.refreshToken });
  tokens.filter(token => token !== req.body.token)
  // if (user) {
  //   return res.status(400).json({ email: "Email already exists" });
  // }
  // refreshTokens = refreshTokens.filter(token => token !== req.body.token)
  res.sendStatus(204)
})


router.get("/createadmin", async (req, res) => {
  const admin = new User({
    name: 'Kurt',
    email: 'lavacquek@icloud.com',
    password: "admin",
    confirmed: true,
    isAdmin: true
  });
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(400).json({ email: "Email already exists" });
  }
  else {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(admin.password, salt, (err, hash) => {
        if (err) throw err;
        admin.password = hash;
        admin
          .save()
          .then(admin => res.json({
            _id: admin.id,
            name: admin.name,
            email: admin.email,
            isAdmin: admin.isAdmin,
            token: getToken(admin)
          }))
          .catch(err => console.log(err));
      });
    });
  }
});




router.get("/:id", async (req, res) => {
  console.log("userRoute")
  try {
    const user = await User.findOne({ _id: req.params.id })
    res.send(user);
  } catch (error) {
    res.send({ msg: error.message });
  }
});



// export default router;
module.exports = router;