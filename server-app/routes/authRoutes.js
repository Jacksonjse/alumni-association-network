const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/Use');

// REGISTER
router.post('/register', async (req,res) => {
  const { full_name, email, username, password } = req.body;

  if(!full_name || !email || !username || !password)
    return res.status(400).json({ msg:"All fields are required" });

  const emailExists = await User.findOne({ email });
  if(emailExists) return res.status(400).json({ msg:"Email already exists" });

  const userExists = await User.findOne({ username });
  if(userExists) return res.status(400).json({ msg:"Username already exists" });

  const hashedPass = await bcrypt.hash(password, 10);

  await User.create({ full_name, email, username, password: hashedPass });

  res.json({ msg:"Registration successful" });
});

// LOGIN
router.post('/login', async (req,res) => {
  const { loginid, password } = req.body;

  if(!loginid || !password)
    return res.status(400).json({ msg:"All fields are required" });

  const user = await User.findOne({
    $or:[{email:loginid},{username:loginid}]
  });

  if(!user) return res.status(400).json({ msg:"Invalid username/email" });

  const match = await bcrypt.compare(password, user.password);

  if(!match) return res.status(400).json({ msg:"Invalid password" });

  res.json({ msg:"Login successful" });
});

module.exports = router;
